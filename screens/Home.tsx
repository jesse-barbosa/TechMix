import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Heart, MapPin } from 'lucide-react-native';
import { CircleHelp, Monitor, Laptop, Cpu, Keyboard, HardDrive, Printer, Wifi, Smartphone, Gamepad, Headphones } from 'lucide-react-native';
import axios from 'axios';
import Menu from "@/screens/components/Menu";
import Header from "@/screens/components/Header";
import { API_URL } from '@/apiConfig';

export default function Home() {
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.user);
  const { width } = Dimensions.get('window');
  const carouselRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const defaultIcon = <CircleHelp size={22} color="gray" />;

  const iconMapping: { [key: string]: React.ElementType } = {
    'hard-drive': HardDrive,
    monitor: Monitor,
    laptop: Laptop,
    cpu: Cpu,
    keyboard: Keyboard,
    printer: Printer,
    wifi: Wifi,
    smartphone: Smartphone,
    gamepad: Gamepad,
    headphones: Headphones
  };  

  type Banner = {
    id: number;
    imageURL: string;
  }

  type Product = {
    id: number;
    name: string;
    price: string;
    store: {
      name: string;
      city: string;
    };
    imageURL: string;
    saved: boolean;
  }

  type Store = {
    id: number;
    name: string;
    imageURL: string;
    city: string;
  }

  type Categorie = {
    id: number;
    name: string;
    icon: string;
    description: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [officialProducts, setOfficialProducts] = useState<Product[]>([]);
  const [favsProducts, setFavsProducts] = useState<Product[]>([]);
  const [visitedProducts, setVisitedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [autoScroll, setAutoScroll] = useState(true);

  const staticBanners: Banner[] = [
    {
      id: 1,
      imageURL: require("@/assets/images/banners/banner1.png"),
    },
    {
      id: 2,
      imageURL: require("@/assets/images/banners/banner2.png"),
    },
    {
      id: 3,
      imageURL: require("@/assets/images/banners/banner3.png"),
    }
  ];

  const handleProductClick = (productId: number) => {
    (navigation as any).navigate('ViewProduct', { productId });
  };

  const handleStoreClick = (storeId: number) => {
    (navigation as any).navigate('ViewStore', { storeId });
  };

  const getImageUrl = (imageURL: string | number | undefined, type: string) => {
    if (!imageURL) {
      if (type === 'product') {
        return require('@/assets/images/products/default_product.png');
      } else if (type === 'banner') {
        return require('@/assets/images/banners/banner1.png');
      } else {
        return require('@/assets/images/stores/default_store.png');
      }
    }
    
    if (typeof imageURL !== 'string') {
      return imageURL;
    }
    
    const cleanedPath = imageURL.replace(/^\/?(storage\/)?/, '');
    const cleanedApiUrl = API_URL.replace(/\/api\/?$/, '');
    const url = `${cleanedApiUrl}/storage/${cleanedPath}`;
    return { uri: url };
  };  

  const getVisitedProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/getVisitedProducts?userId=${user.id}`);

      if (Array.isArray(response.data.visitedProducts)) {
        setVisitedProducts(response.data.visitedProducts);
      } else {
        console.error('Expected an array of products, but received:', response.data);
        Alert.alert('Erro ao buscar Produtos', 'Formato de dados inesperado do servidor.');
      }

    } catch (error: any) {
      if (error.response) {
        const message = error.response.data.message || 'Erro desconhecido no servidor';
        Alert.alert('Erro ao buscar Produtos', message);
      } else if (error.request) {
        Alert.alert('Erro de conexão', 'Não foi possível conectar ao servidor. Verifique sua internet.');
      } else {
        Alert.alert('Erro inesperado', error.message || 'Algo deu errado.');
      }
      console.error('Erro durante a busca de produtos:', error);
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/getProducts?userId=${user.id}`);

      if (Array.isArray(response.data.products)) {
        setProducts(response.data.products);
      } else {
        console.error('Expected an array of products, but received:', response.data);
        Alert.alert('Erro ao buscar Produtos', 'Formato de dados inesperado do servidor.');
      }

    } catch (error: any) {
      if (error.response) {
        const message = error.response.data.message || 'Erro desconhecido no servidor';
        Alert.alert('Erro ao buscar Produtos', message);
      } else if (error.request) {
        Alert.alert('Erro de conexão', 'Não foi possível conectar ao servidor. Verifique sua internet.');
      } else {
        Alert.alert('Erro inesperado', error.message || 'Algo deu errado.');
      }
      console.error('Erro durante a busca de produtos:', error);
    }
  };

  const getOfficialProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/getOfficialProducts?userId=${user.id}`);

      if (Array.isArray(response.data.products)) {
        setOfficialProducts(response.data.products);
      } else {
        console.error('Expected an array of products, but received:', response.data);
        Alert.alert('Erro ao buscar Produtos', 'Formato de dados inesperado do servidor.');
      }

    } catch (error: any) {
      if (error.response) {
        const message = error.response.data.message || 'Erro desconhecido no servidor';
        Alert.alert('Erro ao buscar Produtos', message);
      } else if (error.request) {
        Alert.alert('Erro de conexão', 'Não foi possível conectar ao servidor. Verifique sua internet.');
      } else {
        Alert.alert('Erro inesperado', error.message || 'Algo deu errado.');
      }
      console.error('Erro durante a busca de produtos:', error);
    }
  };

  const getFavsProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/getSavedProducts?userId=${user.id}`);

      if (Array.isArray(response.data.products)) {
        setFavsProducts(response.data.products);
      } else {
        console.error('Expected an array of products, but received:', response.data);
        Alert.alert('Erro ao buscar Produtos', 'Formato de dados inesperado do servidor.');
      }

    } catch (error: any) {
      if (error.response) {
        const message = error.response.data.message || 'Erro desconhecido no servidor';
        Alert.alert('Erro ao buscar Produtos', message);
      } else if (error.request) {
        Alert.alert('Erro de conexão', 'Não foi possível conectar ao servidor. Verifique sua internet.');
      } else {
        Alert.alert('Erro inesperado', error.message || 'Algo deu errado.');
      }
      console.error('Erro durante a busca de produtos:', error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/getCategories`);

      if (Array.isArray(response.data.categories)) {
        setCategories(response.data.categories);
      } else {
        console.error('Expected an array of categories, but received:', response.data);
        Alert.alert('Erro ao buscar Categorias', 'Formato de dados inesperado do servidor.');
      }

    } catch (error: any) {
      if (error.response) {
        const message = error.response.data.message || 'Erro desconhecido no servidor';
        Alert.alert('Erro ao buscar Categorias', message);
      } else if (error.request) {
        Alert.alert('Erro de conexão', 'Não foi possível conectar ao servidor. Verifique sua internet.');
      } else {
        Alert.alert('Erro inesperado', error.message || 'Algo deu errado.');
      }
      console.error('Erro durante a busca de categorias:', error);
    }
  };

  const getStores = async () => {
    try {
      const response = await axios.get(`${API_URL}/getStores?userId=${user.id}`);

      if (Array.isArray(response.data.stores)) {
        setStores(response.data.stores);
      } else {
        console.error('Expected an array of stores, but received:', response.data);
        Alert.alert('Erro ao buscar Lojas', 'Formato de dados inesperado do servidor.');
      }

    } catch (error: any) {
      if (error.response) {
        const message = error.response.data.message || 'Erro desconhecido no servidor';
        Alert.alert('Erro ao buscar Lojas', message);
      } else if (error.request) {
        Alert.alert('Erro de conexão', 'Não foi possível conectar ao servidor. Verifique sua internet.');
      } else {
        Alert.alert('Erro inesperado', error.message || 'Algo deu errado.');
      }
      console.error('Erro durante a busca de lojas:', error);
    }
  };

  useEffect(() => {
    getVisitedProducts();
    getProducts();
    getOfficialProducts();
    getFavsProducts();
    getCategories();
    getStores();
    setBanners(staticBanners)
  }, [user]);

  // Auto-rolagem para o carrossel
  useEffect(() => {
    if (autoScroll && banners.length > 1) {
      const intervalId = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [autoScroll, banners.length]);

  // Atualiza a posição do carrossel quando o activeIndex muda
  useEffect(() => {
    carouselRef.current?.scrollTo({
      x: width * activeIndex,
      animated: true,
    });
  }, [activeIndex, width]);

  // Atualiza o activeIndex ao terminar o scroll manualmente
  const handleMomentumScrollEnd = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    setActiveIndex(newIndex);
  };

  const handleFavoriteToggle = async (productId: number) => {
    try {
      const response = await axios.post(`${API_URL}/toggleFavorite?productId=${productId}&userId=${user.id}`);
      getProducts(); // Refresh results to update saved status
    } catch (error) {
      console.log('Erro ao favoritar:', error);
    }
  };

  return (
    <View className="flex-1 bg-neutral-800">
      <Header />
      <ScrollView>
        {/* Carrossel de Banners */}
        <View className="mb-2">
          <ScrollView
            ref={carouselRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleMomentumScrollEnd}
            onTouchStart={() => setAutoScroll(false)}
            onTouchEnd={() => setAutoScroll(true)}
          >
            {banners.map((banner) => (
              <TouchableOpacity key={banner.id} style={{ width }}>
                <View className="relative overflow-hidden">
                  <Image 
                    source={getImageUrl(banner.imageURL, 'banner')} 
                    style={{ width: width, height: 180 }}
                    onError={(e) => console.log("Image Load Error:", e.nativeEvent.error)}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          {/* Indicadores do carrossel */}
          <View className="flex-row justify-center mt-2">
            {banners.map((_, index) => (
              <View
                key={index}
                className={`h-2 w-2 rounded-full mx-1 ${
                  index === activeIndex ? 'bg-yellow-500' : 'bg-neutral-500'
                }`}
              />
            ))}
          </View>
        </View>
        <View className="px-2">
          {visitedProducts.length > 0 ? (
            <View>
              <Text className="text-neutral-400 text-2xl font-bold mb-4">Visto Recentemente</Text>
              {/* Horizontal ScrollView for visited products */}
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {visitedProducts.map((product, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() => handleProductClick(product.id)} className="flex-row bg-neutral-700 h-40 rounded-lg mr-4">
                      <View className="mr-4">
                        <Image 
                          source={getImageUrl(product.imageURL, 'product')}
                          className="rounded-lg rounded-r-none h-full w-28"
                          onError={(e) => {
                            console.log('Erro ao carregar a imagem:', e.nativeEvent.error);
                            // Atualiza a imagem para fallback diretamente no onError
                            e.preventDefault();
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
                  );
                })}
              </ScrollView>
            </View>
          ) : (
            <View>
              <Text className="text-neutral-400 text-2xl font-bold mb-4">Produtos Em Alta</Text>
              {/* Horizontal ScrollView for products */}
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {products.map((product, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() => handleProductClick(product.id)} className="flex-row bg-neutral-700 h-40 rounded-lg mr-4">
                      <View className="mr-4">
                        <Image 
                          source={getImageUrl(product.imageURL, 'product')}
                          className="rounded-lg rounded-r-none h-full w-28"
                          onError={(e) => {
                            console.log('Erro ao carregar a imagem:', e.nativeEvent.error);
                            // Atualiza a imagem para fallback diretamente no onError
                            e.preventDefault();
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
                  );
                })}
              </ScrollView>
            </View>
          )}
          <Text className="text-neutral-400 text-2xl font-bold my-4">Categorias</Text>
          <View className="flex-row flex-wrap justify-between">
            {categories.map((categorie, index) => {
              const IconComponent = iconMapping[categorie.icon.toLowerCase() as keyof typeof iconMapping]; // Normalizando a chave

              return (
                <TouchableOpacity 
                key={categorie.id} 
                className="flex flex-row w-[48%] bg-neutral-700 rounded-lg p-4 mb-4"
                onPress={() => navigation.navigate('Search', { categoryId: categorie.id })}
                >
                  {IconComponent ? React.createElement(IconComponent, { size: 22, color: "white" }) : defaultIcon}
                  <Text className="text-white text-lg font-bold ml-2">{categorie.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text className="text-neutral-400 text-2xl font-bold mb-4">Lojas perto de você</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {stores.map((store, index) => (
              <TouchableOpacity onPress={() => handleStoreClick(store.id)} key={index} className="flex items-center bg-neutral-700 rounded-lg mr-4 p-4 w-48 h-56">
                <Image 
                  source={ getImageUrl(store.imageURL, 'store') }
                  className="rounded-full h-32 w-32"
                  onError={(e) => {
                    console.log('Erro ao carregar imagem de loja:', e.nativeEvent.error);
                    // Atualiza a imagem para fallback diretamente no onError
                    e.preventDefault();
                  }}
                />
                <Text className="text-white text-lg font-bold mb-2 text-center">{store.name}</Text>
                <View className="flex flex-row w-full items-center justify-center mb-2 text-center">
                  <MapPin size={16} color="white" />
                  <Text className="text-neutral-400 pl-1">{store.city}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {favsProducts.length > 0 && (
            <View>
              <Text className="text-neutral-400 text-2xl font-bold my-4">Seus Favoritos</Text>
              {/* Horizontal ScrollView for products */}
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {favsProducts.map((product, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() => handleProductClick(product.id)} className="flex-row bg-neutral-700 h-40 rounded-lg mr-4">
                      <View className="mr-4">
                        <Image 
                          source={getImageUrl(product.imageURL, 'product')}
                          className="rounded-lg rounded-r-none h-full w-28"
                          onError={(e) => {
                            console.log('Erro ao carregar a imagem:', e.nativeEvent.error);
                            // Atualiza a imagem para fallback diretamente no onError
                            e.preventDefault();
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
                        <Heart size={24} color="yellow" fill={'yellow'} className="text-yellow-500" />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}
          <View className="mb-8">
            <Text className="text-neutral-400 text-2xl font-bold my-4">Oficiais da TechMix</Text>
            {/* Horizontal ScrollView for products */}
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {officialProducts.map((product, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => handleProductClick(product.id)} className="flex-row bg-neutral-700 h-40 rounded-lg mr-4">
                    <View className="mr-4">
                      <Image 
                        source={getImageUrl(product.imageURL, 'product')}
                        className="rounded-lg rounded-r-none h-full w-28"
                        onError={(e) => {
                          console.log('Erro ao carregar a imagem:', e.nativeEvent.error);
                          // Atualiza a imagem para fallback diretamente no onError
                          e.preventDefault();
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
                      <Heart size={24} color="yellow" fill={'yellow'} className="text-yellow-500" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <Menu />
    </View>
  );
}