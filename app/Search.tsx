import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, TextInput, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Heart, MapPin, Search, History, X, ArchiveX, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react-native';
import axios from 'axios';
import Menu from "@/app/components/Menu";
import Filter from "@/app/components/Modals/Filter";
import ConfirmDeleteModal from "@/app/components/Modals/ConfirmDeleteModal";
import { API_URL } from '@/apiConfig';
import { PaginationControls } from '@/app/components/paginationControls';

export default function Home() {
  const navigation = useNavigation();
  const route = useRoute();
  const user = useSelector((state: RootState) => state.user);
  
  const { searchTerm: initialSearchTerm, categoryId } = route.params || {};

  type Store = {
    id: number;
    imageURL: string;
    name: string;
    description: string;
    city: string;
  }

  type Product = {
    id: number;
    name: string;
    price: string;
    store: {
      name: string;
      city: string;
    };
    location: string;
    imageURL: string;
    saved: boolean;
  }

  type Category = {
    id: number;
    name: string;
    description: string;
    icon: string;
  }

  type PaginationInfo = {
    currentPage: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  }

  const searchTypes = {
    'product': ['Produtos'],
    'store': ['Lojas'],
  };

  const [stores, setStores] = useState<Store[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [visitedProducts, setVisitedProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm || '');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<keyof typeof searchTypes>('product');
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState(['']);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [searchHistory, setSearchHistory] = useState<{ id: number, searchMessage: string }[]>([]);
  const [initialSearchDone, setInitialSearchDone] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    currentPage: 1,
    perPage: 15,
    totalItems: 0,
    totalPages: 1
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.trim() !== '') {
      getLocations();
    }
    
    if (debouncedSearchTerm.length === 0) {
      getVisitedProducts();
    }
  }, [debouncedSearchTerm]);

  const handleStoreClick = async (storeId: number) => {
    (navigation as any).navigate('ViewStore', { storeId });
  }

  const handleProductClick = async (productId: number) => {
    try {
      const response = await axios.post(`${API_URL}/setVisitedProduct?userId=${user.id}&productId=${productId}`);
      if (response.data.success) {
        (navigation as any).navigate('ViewProduct', { productId });
      } else {
        console.log('Erro inesperado:', response.data);
      }
    } catch (error) {
      console.error('Erro ao adicionar produto visitado:', error);
    }

    (navigation as any).navigate('ViewProduct', { productId });
  };

  useEffect(() => {
    const initialize = async () => {
      await getCategories();
      getHistory();
  
      if (categoryId && !initialSearchDone) {
        const categoryIdNum = Number(categoryId);
        setSelectedCategoryId(categoryIdNum);
        
        const category = categories.find(cat => cat.id === categoryIdNum);
        if (category) {
          setSelectedCategory(category.name);
          await search();
          setInitialSearchDone(true);
        }
      }
    };
  
    initialize();
  }, [categoryId, categories]);

  useEffect(() => {
    if (initialSearchDone) {
      setCurrentPage(1);
      search();
    }
  }, [searchType]);

  useEffect(() => {
    // Only fetch data when currentPage changes and we've already done an initial search
    if (initialSearchDone) {
      if (searchTerm.length === 0 && !categoryId) {
        getVisitedProducts();
      } else {
        search();
      }
    }
  }, [currentPage]);  

  useEffect(() => {
    if (initialSearchTerm) {
      setCurrentPage(1);
      search();
    }
  }, [initialSearchTerm]);

  const getImageUrl = (imageURL: string, type: string) => {
    if (!imageURL) {
      if (type === 'product') {
        return require('@/assets/images/products/default_product.png');
      } else {
        return require('@/assets/images/stores/default_store.png');
      }
    } else {
      const cleanedPath = imageURL.replace(/^\/?(storage\/)?/, '');
      const cleanedApiUrl = API_URL.replace(/\/api\/?$/, '');
      const url = `${cleanedApiUrl}/storage/${cleanedPath}`;
      return { uri: url };
    }
  };

  const handleFavoriteToggle = async (productId: number) => {
    try {
      const response = await axios.post(`${API_URL}/toggleFavorite?productId=${productId}&userId=${user.id}`);
      search();
    } catch (error) {
      console.log('Erro ao favoritar:', error);
    }
  };

  const getVisitedProducts = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(`${API_URL}/getVisitedProducts?userId=${user.id}`);
      if (Array.isArray(response.data.visitedProducts)) {
        setVisitedProducts(response.data.visitedProducts);
      } else {
        console.log('Formato inesperado:', response.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao buscar produtos visitados:', error);
      setIsLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.post(`${API_URL}/deleteVisitedProducts?userId=${user.id}`);
      if (response.data.success) {
        setVisitedProducts([]);
        setIsDeleteModalVisible(false);
        setPaginationInfo({
          currentPage: 1,
          perPage: 15,
          totalItems: 0,
          totalPages: 1
        });
      } else {
        console.log('Erro inesperado:', response.data);
      }
    } catch (error) {
      console.error('Erro ao deletar histórico de produtos:', error);
    }
  }

  const getHistory = async () => {
    try {
      // Use debouncedSearchTerm instead of searchTerm for stability
      const response = await axios.get(`${API_URL}/getSearchHistory?userId=${user.id}&searchTerm=${debouncedSearchTerm}`);
      if (Array.isArray(response.data.searchHistory)) {
        setSearchHistory(response.data.searchHistory);
      } else {
        console.log('Formato inesperado:', response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
    }
  };

  const deleteSearchHistory = async (id: number) => {
    try {
      const response = await axios.post(`${API_URL}/deleteSearchHistory?id=${id}`);
      getHistory() // Refresh History
    } catch (error) {
      console.log('Erro ao excluir:', error)
    }
  }

  const getCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/getAllCategories`);
      if (Array.isArray(response.data.categories)) {
        setCategories(response.data.categories);
      } else {
        Alert.alert('Erro ao buscar categorias', 'Formato de dados inesperado do servidor.');
        console.log('Dados recebidos: ', response.data);
      }
    } catch (error: any) {
      if (error.response) {
        const message = error.response.data.message || 'Erro desconhecido no servidor';
        Alert.alert('Erro ao realizar consulta', message);
      } else if (error.request) {
        Alert.alert('Erro de conexão', 'Não foi possível conectar ao servidor. Verifique sua internet.');
      } else {
        Alert.alert('Erro inesperado', error.message || 'Algo deu errado.');
      }
      console.error('Erro durante a busca:', error);
    }
  };

  const getLocations = async () => {
    try {
      const response = await axios.get(`${API_URL}/getLocations?search=${debouncedSearchTerm}`);
      if (Array.isArray(response.data.locations)) {
        setLocations(response.data.locations);
      } else {
        Alert.alert('Erro ao buscar localizações', 'Formato de dados inesperado do servidor.');
      }
    } catch (error: any) {
      if (error.response) {
        const message = error.response.data.message || 'Erro desconhecido no servidor';
        Alert.alert('Erro ao buscar localizações', message);
        console.error('Erro ao buscar localizações', message);
      } else if (error.request) {
        Alert.alert('Erro de conexão', 'Não foi possível conectar ao servidor. Verifique sua internet.');
      } else {
        Alert.alert('Erro inesperado', error.message || 'Algo deu errado.');
      }
      console.error('Erro durante a busca:', error);
    }
  };

  const search = async (pageToUse?: number) => {
    try {
      setIsLoading(true);
      if (categoryId && !selectedCategory && categories.length > 0) {
        const category = categories.find(cat => cat.id === Number(categoryId));
        if (category) {
          setSelectedCategory(category.name);
        }
      }
  
      const params = new URLSearchParams();
      params.append('search', searchTerm);
      params.append('userId', user.id.toString());
      params.append('searchType', searchType);
      // Use o parâmetro pageToUse se fornecido, caso contrário use currentPage
      params.append('page', pageToUse ? pageToUse.toString() : currentPage.toString());
      params.append('perPage', '15');
      
      if (categoryId && categories.length > 0) {
        const category = categories.find(cat => cat.id === Number(categoryId));
        if (category) {
          params.append('category', category.name);
        }
      } else if (selectedCategory) {
        params.append('category', selectedCategory);
      }
      
      if (selectedLocation) {
        params.append('location', selectedLocation);
      }
      
      console.log("Searching with page:", pageToUse || currentPage);
      
      const response = await axios.post(`${API_URL}/search?${params.toString()}`);
      
      if (searchType === 'store') {
        if (Array.isArray(response.data.stores)) {
          setStores(response.data.stores);
          setShowHistory(false);
          if (response.data.pagination) {
            setPaginationInfo(response.data.pagination);
          }
        } else {
          Alert.alert('Erro ao buscar lojas', 'Formato de dados inesperado do servidor.');
          console.log('response:', response.data);
        }
      } else {
        if (Array.isArray(response.data.products)) {
          setProducts(response.data.products);
          setShowHistory(false);
          if (response.data.pagination) {
            setPaginationInfo(response.data.pagination);
          }
        } else {
          Alert.alert('Erro ao buscar produtos', 'Formato de dados inesperado do servidor.');
          console.log('response:', response.data);
        }
      }
      
      setIsLoading(false);
    } catch (error: any) {
      if (error.response) {
        const message = error.response.data.message || 'Erro desconhecido no servidor';
        Alert.alert('Erro ao realizar pesquisa', message);
      } else if (error.request) {
        Alert.alert('Erro de conexão', 'Não foi possível conectar ao servidor. Verifique sua internet.');
      } else {
        Alert.alert('Erro inesperado', error.message || 'Algo deu errado.');
      }
      console.error('Erro durante a busca:', error);
      setIsLoading(false);
    }
  };

  const applyFilters = (category: string, location: string) => {
    setSelectedCategory(category);
    setSelectedLocation(location);
    setCurrentPage(1);
    setFilterVisible(false);
    search();
  };

  const renderPaginationInfo = () => {
    if (paginationInfo.totalItems === 0) return null;
    
    const startItem = ((currentPage - 1) * paginationInfo.perPage) + 1;
    const endItem = Math.min(currentPage * paginationInfo.perPage, paginationInfo.totalItems);
    
    return (
      <Text className="text-neutral-400 text-center mb-2">
        Mostrando {startItem}-{endItem} de {paginationInfo.totalItems} resultados
      </Text>
    );
  };

  return (
    <View className="flex-1 bg-neutral-800">
      <View className="mt-6 mx-4">
        <View className="bg-neutral-700 w-full flex-row justify-between items-center py-1 px-3 rounded-xl">
          <TextInput 
            placeholder="Buscar Produto ou Loja..." 
            className="text-neutral-200 text-lg" 
            style={{ width: '90%' }}
            placeholderTextColor="#A3A3A3"
            value={searchTerm}
            onChangeText={(text) => {
              setSearchTerm(text);
              getHistory()
            }}
            onFocus={() => setShowHistory(true)}
            onBlur={() => setTimeout(() => setShowHistory(false), 200)}
          />
          <TouchableOpacity onPress={() => {
            setCurrentPage(1);
            search();
          }}>
            <Search size={26} color="#C0C0C0" />
          </TouchableOpacity>
        </View>
        {showHistory && searchHistory.length > 0 && (
          <View className="absolute bg-neutral-700 top-14 w-full mt-2 rounded-lg p-2 shadow-lg z-10">
            {searchHistory.map((item, index) => (
              <TouchableOpacity key={index} 
              className="flex-row justify-between items-center"
              onPress={() => {
                setSearchTerm(item.searchMessage);
                setCurrentPage(1)
                search()
                setShowHistory(false);
              }}>
                <View className="flex-row items-center gap-1">
                  <TouchableOpacity
                    className="hover:bg-neutral-600">
                    <History size={26} color="#C0C0C0" />
                  </TouchableOpacity>
                  <Text className="text-neutral-300 text-lg p-2">{item.searchMessage}</Text>
                </View>
                <TouchableOpacity onPress={() => deleteSearchHistory(item.id)}>
                  <X size={26} color="#C0C0C0" className="ms-auto" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {isLoading && (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#F59E0B" />
          <Text className="text-neutral-300 mt-4">Carregando...</Text>
        </View>
      )}

      {!isLoading && searchTerm.length === 0 && visitedProducts.length > 0 && !categoryId ? (
        <ScrollView showsHorizontalScrollIndicator={true} style={{ padding: 20, marginBottom: 20 }}>
          <View className="flex flex-row justify-between">
            <Text className="text-neutral-400 text-2xl font-bold mb-4">Visto Recentemente</Text>
            <TouchableOpacity onPress={() => setIsDeleteModalVisible(true)}>
              <X size={26} color="#C0C0C0" className="ms-auto" />
            </TouchableOpacity>
          </View>
          {visitedProducts.map((product, index) => (
            <TouchableOpacity key={index} onPress={() => handleProductClick(product.id)} className="flex-row bg-neutral-700 rounded-lg my-2 h-36">
              <View className="mr-4">
                <Image
                  source={getImageUrl(product.imageURL, 'product')}
                  className="rounded-lg rounded-r-none h-full w-28"
                />
              </View>
              <View className="flex-1 flex flex-col justify-between py-2">
                <View>
                  <Text className="text-white text-lg font-bold max-w-[200px]">
                    {product.name.length > 20 ? product.name.substring(0, 20) + '...' : product.name}
                  </Text>
                  <Text className="text-neutral-200 text-2xl">R$ {product.price}</Text>
                </View>
                <View>
                  <Text className="text-neutral-400 mt-6">{product.store.name}</Text>
                  <View className="flex-row items-center">
                    <MapPin size={16} color="white" />
                    <Text className="text-neutral-400 pl-1">{product.store.city}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={() => handleFavoriteToggle(product.id)} className="flex items-end justify-end p-2 rounded-lg mt-2">
                {product.saved ? (
                  <Heart size={24} color="yellow" fill={'yellow'} className="text-yellow-500" />
                ) : (
                  <Heart size={24} color="white" />
                )}
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
          
          {renderPaginationInfo()}
          <PaginationControls 
            paginationInfo={paginationInfo}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            searchTerm={searchTerm}
            categoryId={categoryId}
            getVisitedProducts={getVisitedProducts}
            search={search}
          />
        </ScrollView>
      ) : !isLoading && products.length === 0 && stores.length === 0 && visitedProducts.length === 0 ? (
          <View className="flex-1 flex justify-center items-center py-20 px-4">
            <View className="flex items-center bg-neutral-700 p-6 shadow-lg rounded-lg w-full">
              <ArchiveX size={42} color="#C0C0C0" />
              <Text className="text-neutral-300 text-2xl font-bold mt-2">Nenhum resultado encontrado</Text>
              <Text className="text-neutral-400 text-lg mt-2 text-center">Ajuste os filtros e confira o termo digitado.</Text>
            </View>
          </View>
        ) : !isLoading && searchType === 'store' ? (
          <ScrollView className="my-2" contentContainerStyle={{ padding: 20 }}>
          <View className="flex-row justify-between">
            <Text className="text-neutral-400 text-2xl font-bold">
              <Text className="text-yellow-500">{ stores.length }</Text> Resultados 
              {paginationInfo.totalItems > 0 && <Text> de {paginationInfo.totalItems}</Text>}
            </Text>
            <TouchableOpacity onPress={() => setFilterVisible(true)}>
              {selectedCategory || selectedLocation ? (
                <View className="p-1 bg-yellow-500 rounded">
                  <SlidersHorizontal size={24} color="#4A5568" />
                </View>
              ) : (
                <View className="p-1">
                  <SlidersHorizontal size={24} color="#C0C0C0" />
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View className="flex-row gap-2 py-4">
            {Object.entries(searchTypes).map(([key, value]) => (
              <TouchableOpacity
                key={key}
                className={`${searchType === key ? "bg-yellow-500" : "bg-neutral-700"} py-3 px-5 rounded-lg`}
                onPress={() => {
                  setSearchType(key as keyof typeof searchTypes);
                  setCurrentPage(1);
                }}>
                <Text className={`${searchType === key ? "text-neutral-700" : "text-neutral-200"} text-xl font-bold`}>{value}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {stores.length === 0 && (
            <View className="flex-1 flex justify-center items-center py-20">
              <View className="flex items-center bg-neutral-700 p-6 shadow-lg rounded-lg w-full">
                <ArchiveX size={42} color="#C0C0C0" />
                <Text className="text-neutral-300 text-2xl font-bold mt-2">Nenhum resultado encontrado</Text>
                <Text className="text-neutral-400 text-lg mt-2 text-center">Ajuste os filtros e confira o termo digitado.</Text>
              </View>
            </View>
          )}
          <ScrollView showsHorizontalScrollIndicator={true} style={{ marginBottom: 20 }}>
          {stores.map((store, index) => (
            <TouchableOpacity key={index} onPress={() => handleStoreClick(store.id)} className="flex flex-row bg-neutral-700 rounded-lg mb-2 h-36">
              <View className="mr-2">
                <Image
                  source={getImageUrl(store.imageURL, 'store')}
                  className="rounded-lg rounded-r-none h-full w-32"
                />
              </View>
              <View className="flex flex-col items-start justify-between py-4 px-2">
                <Text className="text-white text-2xl font-bold">{store.name}</Text>
                {store.description ? (
                  <View className="w-10/12">
                    <Text 
                      className="text-neutral-400 text-md" 
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {(store.description && store.description.length > 86) 
                        ? store.description.substring(0, 86) + '...'
                        : (store.description)}
                    </Text>
                  </View>
                ) : (
                  <Text className="text-neutral-400 text-md">Sem descrição.</Text>
                )}
                <View className="flex-row items-center mt-1">
                  <MapPin size={16} color="white" />
                  <Text className="text-neutral-400 pl-1">{store.city}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          </ScrollView>
          
          {renderPaginationInfo()}
          <PaginationControls 
            paginationInfo={paginationInfo}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            searchTerm={searchTerm}
            categoryId={categoryId}
            getVisitedProducts={getVisitedProducts}
            search={search}
          />
        </ScrollView>
        ) : !isLoading && (
        <ScrollView className="my-2" contentContainerStyle={{ padding: 20 }}>
          <View className="flex-row justify-between">
            <Text className="text-neutral-400 text-2xl font-bold">
              <Text className="text-yellow-500">{ products.length }</Text> Resultados
              {paginationInfo.totalItems > 0 && <Text> de {paginationInfo.totalItems}</Text>}
            </Text>
            <TouchableOpacity onPress={() => setFilterVisible(true)}>
            {selectedCategory || selectedLocation ? (
                <View className="p-1 bg-yellow-500 rounded">
                  <SlidersHorizontal size={24} color="#4A5568" />
                </View>
              ) : (
                <View className="p-1">
                  <SlidersHorizontal size={24} color="#C0C0C0" />
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View className="flex-row gap-2 py-4">
            {Object.entries(searchTypes).map(([key, value]) => (
              <TouchableOpacity
                key={key}
                className={`${searchType === key ? "bg-yellow-500" : "bg-neutral-700"} py-3 px-5 rounded-lg`}
                onPress={() => {
                  setSearchType(key as keyof typeof searchTypes);
                  setCurrentPage(1);
                }}>
                <Text className={`${searchType === key ? "text-neutral-700" : "text-neutral-200"} text-xl font-bold`}>{value}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {products.length === 0 && (
            <View className="flex-1 flex justify-center items-center py-20">
              <View className="flex items-center bg-neutral-700 p-6 shadow-lg rounded-lg w-full">
                <ArchiveX size={42} color="#C0C0C0" />
                <Text className="text-neutral-300 text-2xl font-bold mt-2">Nenhum resultado encontrado</Text>
                <Text className="text-neutral-400 text-lg mt-2 text-center">Ajuste os filtros e confira o termo digitado.</Text>
              </View>
            </View>
          )}
          <ScrollView showsHorizontalScrollIndicator={true} style={{ marginBottom: 20 }}>
            {products.map((product, index) => (
              <TouchableOpacity key={index} onPress={() => handleProductClick(product.id)} className="flex-row bg-neutral-700 rounded-lg my-2 h-36">
                <View className="mr-4">
                  <Image
                    source={getImageUrl(product.imageURL, 'product')}
                    className="rounded-lg rounded-r-none h-full w-28"
                    onError={(e) => {
                      console.log('Image load error:', e.nativeEvent.error);
                    }}
                  />
                </View>
                <View className="flex-1 flex flex-col justify-between py-2">
                  <View>
                    <Text className="text-white text-lg font-bold max-w-[200px]">
                      {product.name.length > 20 ? product.name.substring(0, 20) + '...' : product.name}
                    </Text>
                    <Text className="text-neutral-200 text-2xl">R$ {product.price}</Text>
                  </View>
                  <View>
                    <Text className="text-neutral-400 mt-6">{product.store.name}</Text>
                    <View className="flex-row items-center">
                      <MapPin size={16} color="white" />
                      <Text className="text-neutral-400 pl-1">{product.store.city}</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity onPress={() => handleFavoriteToggle(product.id)} className="flex items-end justify-end p-2 rounded-lg mt-2">
                  {product.saved ? (
                    <Heart size={24} color="yellow" fill={'yellow'} className="text-yellow-500" />
                  ) : (
                    <Heart size={24} color="white" />
                  )}
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {renderPaginationInfo()}
          <PaginationControls 
            paginationInfo={paginationInfo}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            searchTerm={searchTerm}
            categoryId={categoryId}
            getVisitedProducts={getVisitedProducts}
            search={search}
          />
          </ScrollView>
          )}

          <Menu />
          <Filter 
            visible={filterVisible} 
            onClose={() => setFilterVisible(false)} 
            onSubmit={applyFilters}
            selectedCategory={selectedCategory}
            selectedLocation={selectedLocation}
            categories={categories}
            locations={locations}
          />
          <ConfirmDeleteModal 
            visible={isDeleteModalVisible} 
            onClose={() => setIsDeleteModalVisible(false)} 
            onSubmit={handleDeleteConfirm} 
          />
          </View>
  );
}