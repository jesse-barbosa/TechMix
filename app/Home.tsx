import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Heart, MapPin } from 'lucide-react-native';
import { CircleHelp, Monitor, Laptop, Cpu, Keyboard, HardDrive, Printer, Wifi, Smartphone, Gamepad } from 'lucide-react-native';
import axios from 'axios';
import Menu from "@/app/components/Menu";
import Header from "@/app/components/Header";
import { API_URL } from '@/apiConfig';

export default function Home() {
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.user);

  const defaultIcon = <CircleHelp size={22} color="gray" />;

  const iconMapping: { [key: string]: React.ElementType } = {
    'hard-drive': HardDrive, // Nome adaptado por conta do caractére hífen
    monitor: Monitor,
    laptop: Laptop,
    cpu: Cpu,
    keyboard: Keyboard,
    printer: Printer,
    wifi: Wifi,
    smartphone: Smartphone,
    gamepad: Gamepad,
  };  

  // Defining type for Products
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

  // Defining type for Stores
  type Store = {
    id: number;
    name: string;
    imageURL: string;
    city: string;
  }

  // Defining type for Categories
  type Categorie = {
    id: number;
    name: string;
    icon: string;
    description: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [stores, setStores] = useState<Store[]>([]);

  const handleProductClick = (productId: number) => {
    (navigation as any).navigate('ViewProduct', { productId });
  };

  const getImageUrl = (imageURL: string, type: string) => {
    if (!imageURL) {
      if (type === 'product') {
        return require('@/assets/images/products/default_product.png');
      } else {
        return require('@/assets/images/stores/default_store.png');
      }
    } else {
      // Remover '/storage/' do começo, se existir
      const cleanedPath = imageURL.replace(/^\/?(storage\/)?/, '');
      
      // Remover '/api' do final da API_URL
      const cleanedApiUrl = API_URL.replace(/\/api\/?$/, '');
      
      const url = `${cleanedApiUrl}/storage/${cleanedPath}`;
      
      return { uri: url }; // Retornar um objeto com a chave uri
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
    getProducts();
    getCategories();
    getStores();
  }, [user]);

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
      <ScrollView contentContainerStyle={{ padding: 10, flex: 1 }}>

        <Text className="text-neutral-400 text-2xl font-bold mb-4">Visto Recentemente</Text>
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
                      console.log('Image load error:', e.nativeEvent.error);
                    }}
                  />
                </View>
                <View className="flex-1 flex flex-col justify-between py-2">
                  <View>
                    <Text className="text-white text-lg font-bold max-w-[200px]">
                      {product.name.length > 20 ? product.name.substring(0, 20) + '...' : product.name}
                    </Text>
                    <Text className="text-neutral-200 text-2xl">{product.price}</Text>
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

        <Text className="text-neutral-400 text-2xl font-bold mb-4">Categorias</Text>
        <View className="flex-row flex-wrap justify-between">
        {categories.map((categorie, index) => {
          const IconComponent = iconMapping[categorie.icon.toLowerCase() as keyof typeof iconMapping]; // Normalizando a chave

          return (
            <TouchableOpacity key={categorie.id} className="flex flex-row w-[48%] bg-neutral-700 rounded-lg p-4 mb-4">
              {IconComponent ? React.createElement(IconComponent, { size: 22, color: "white" }) : defaultIcon}
              <Text className="text-white text-lg font-bold ml-2">{categorie.name}</Text>
            </TouchableOpacity>
          );
        })}
        </View>

        <Text className="text-neutral-400 text-2xl font-bold mb-4">Lojas perto de você</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
          {stores.map((store, index) => (
            <View key={index} className="flex items-center bg-neutral-700 rounded-lg mr-4 p-4 w-48 h-56">
              <Image 
                source={ getImageUrl(store.imageURL, 'store') }
                className="rounded-full h-32 w-32"
                onError={(e) => {
                  console.log('Image load error:', e.nativeEvent.error);
                }}
                />

              <Text className="text-white text-lg font-bold mb-2 text-center">{store.name}</Text>
              <View className="flex flex-row w-full items-center justify-center mb-2 text-center">
                <MapPin size={16} color="white" />
                <Text className="text-neutral-400 pl-1">{store.city}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
      <Menu />
    </View>
  );
}
