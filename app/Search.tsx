import { View, Text, ScrollView, TouchableOpacity, Image, Alert, TextInput, Modal } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Heart, MapPin, Search, History, X, ArchiveX, SlidersHorizontal, CircleX } from 'lucide-react-native';
import axios from 'axios';
import Menu from "@/app/components/Menu";
import ConfirmDeleteModal from "@/app/components/Modals/ConfirmDeleteModal";
import { API_URL } from '@/apiConfig';

export default function Home() {
  const navigation = useNavigation();
  const route = useRoute();
  const user = useSelector((state: RootState) => state.user);

  const { categoryId } = route.params || {};

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

  const searchTypes = {
    'product': ['Produtos'],
    'store': ['Lojas'],
  };

  const [stores, setStores] = useState<Store[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [visitedProducts, setVisitedProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
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
      getLocations();
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
    getVisitedProducts();
  }, [searchTerm]);

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
    if(searchTerm.length > 0) return

    try {
      const response = await axios.get(`${API_URL}/getVisitedProducts?userId=${user.id}`);
      if (Array.isArray(response.data.visitedProducts)) {
        setVisitedProducts(response.data.visitedProducts);
      } else {
        console.log('Formato inesperado:', response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar produtos visitados:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.post(`${API_URL}/deleteVisitedProducts?userId=${user.id}`);
      if (response.data.success) {
        setVisitedProducts([]);
        setIsDeleteModalVisible(false);
      } else {
        console.log('Erro inesperado:', response.data);
      }
    } catch (error) {
      console.error('Erro ao deletar histórico de produtos:', error);
    }
  }

  const getHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/getSearchHistory?userId=${user.id}&searchTerm=${searchTerm}`);
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
    if (searchTerm.trim() === '') return;
    try {
      const response = await axios.get(`${API_URL}/getLocations?search=${searchTerm}`);
      if (Array.isArray(response.data.locations)) {
        console.log('Definindo Localizações:', response.data.locations)
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

  const search = async () => {
    try {
      // Se temos um categoryId mas ainda não temos a selectedCategory definida
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
      
      // Usa o categoryId se existir, caso contrário usa selectedCategory
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
      
      const response = await axios.post(`${API_URL}/search?${params.toString()}`);
      
      if(searchType === 'store') {
        if (Array.isArray(response.data.stores)) {
          setStores(response.data.stores);
          setShowHistory(false);
        } else {
          Alert.alert('Erro ao buscar lojas', 'Formato de dados inesperado do servidor.');
          console.log('response:', response.data);
        }
      } else {
        if (Array.isArray(response.data.products)) {
          setProducts(response.data.products);
          setShowHistory(false);
        } else {
          Alert.alert('Erro ao buscar produtos', 'Formato de dados inesperado do servidor.');
          console.log('response:', response.data);
        }
      }
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
    }
  };

  const applyFilters = () => {
    setFilterVisible(false);
    search(); // Chama a função de pesquisa com os filtros selecionados
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
          <TouchableOpacity onPress={() => search()}>
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
      {searchTerm.length === 0 && visitedProducts.length > 0 && !categoryId ? (
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
      ) : products.length === 0 && visitedProducts.length === 0 ? (
          <View className="flex-1 flex justify-center items-center py-20 px-4">
            <View className="flex items-center bg-neutral-700 p-6 shadow-lg rounded-lg w-full">
              <ArchiveX size={42} color="#C0C0C0" />
              <Text className="text-neutral-300 text-2xl font-bold mt-2">Nenhum resultado encontrado</Text>
              <Text className="text-neutral-400 text-lg mt-2 text-center">Ajuste os filtros e confira o termo digitado.</Text>
            </View>
          </View>
        ) : stores.length > 0 ? (
          <ScrollView className="my-2" contentContainerStyle={{ padding: 20 }}>
          <View className="flex-row justify-between">
            <Text className="text-neutral-400 text-2xl font-bold"><Text className="text-yellow-500">{ stores.length }</Text> Resultados Encontrados</Text>
            <TouchableOpacity onPress={() => setFilterVisible(true)}>
              <SlidersHorizontal size={24} color="#C0C0C0" />
            </TouchableOpacity>
          </View>
          <View className="flex-row gap-2 py-4">
            {Object.entries(searchTypes).map(([key, value]) => (
              <TouchableOpacity
                key={key}
                className={`${searchType === key ? "bg-yellow-500" : "bg-neutral-700"} py-3 px-5 rounded-lg`}
                onPress={() => setSearchType(key as keyof typeof searchTypes)}>
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
                  onError={(e) => {
                    console.log('Image load error:', e.nativeEvent.error);
                  }}
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
        </ScrollView>
        ) : (
        <ScrollView className="my-2" contentContainerStyle={{ padding: 20 }}>
          <View className="flex-row justify-between">
            <Text className="text-neutral-400 text-2xl font-bold"><Text className="text-yellow-500">{ products.length }</Text> Resultados Encontrados</Text>
            <TouchableOpacity onPress={() => setFilterVisible(true)}>
              <SlidersHorizontal size={24} color="#C0C0C0" />
            </TouchableOpacity>
          </View>
          <View className="flex-row gap-2 py-4">
            {Object.entries(searchTypes).map(([key, value]) => (
              <TouchableOpacity
                key={key}
                className={`${searchType === key ? "bg-yellow-500" : "bg-neutral-700"} py-3 px-5 rounded-lg`}
                onPress={() => setSearchType(key as keyof typeof searchTypes)}>
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
        </ScrollView>
      )}
      <Menu />
      <Modal
        animationType="fade"
        transparent={true}
        visible={filterVisible}
        onRequestClose={() => {
          setFilterVisible(!filterVisible);
        }}
      >
        <View className="flex-1 justify-center items-center mx-4">
          <View className="bg-neutral-600 p-6 rounded-lg w-full">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-3xl text-white font-semibold">Filtrar resultados</Text>
              <TouchableOpacity onPress={() => setFilterVisible(false)}>
                <CircleX size={26} color="#FFF" />
              </TouchableOpacity>
            </View>
            <View className="mb-4">
              <Text className="text-neutral-200 text-xl mb-2">Categoria</Text>
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue: string) => setSelectedCategory(itemValue)}
                style={{
                  color: "#FFF",
                  backgroundColor: "#636363",
                }}
              >
                <Picker.Item label="Geral" value="" />
                {categories.map((category, index) => (
                  <Picker.Item key={index} label={category.name} value={category.name} />
                ))}
              </Picker>
            </View>
            <View className="mb-4">
              <Text className="text-neutral-200 text-xl mb-2">Localização</Text>
              <Picker
                selectedValue={selectedLocation}
                onValueChange={(itemValue: string) => setSelectedLocation(itemValue)}
                style={{
                  color: "#FFF",
                  backgroundColor: "#636363",
                }}
              >
                <Picker.Item label="Geral" value="" />
                {locations.map((location, index) => (
                  <Picker.Item key={index} label={location} value={location} />
                ))}
              </Picker>
            </View>
            <TouchableOpacity onPress={applyFilters} className="bg-yellow-500 p-3 mt-4 ">
              <Text className="text-center text-neutral-800 font-bold text-lg">Aplicar Filtros</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ConfirmDeleteModal 
        visible={isDeleteModalVisible} 
        onClose={() => setIsDeleteModalVisible(false)} 
        onSubmit={handleDeleteConfirm} 
      />
    </View>
  );
}