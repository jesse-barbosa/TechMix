import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import { ChevronLeft, Flag, MapPin, Star, ArchiveX, Heart } from 'lucide-react-native';
import axios from 'axios';
import { API_URL } from '@/apiConfig';

export default function ViewProduct() {
  const user = useSelector((state: RootState) => state.user);
  const route = useRoute();
  const navigation = useNavigation();
  const { storeId } = route.params as { storeId: number };

  type Store = {
    id: number;
    name: string;
    imageURL: string;
    description: string;
    city: string;
    saved: boolean;
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

  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const handleProductClick = (productId: number) => {
    (navigation as any).navigate('ViewProduct', { productId });
  };

  const getImageUrl = (imageURL: string, type: string) => {
    if (!imageURL) {
      if (type === 'product') {
        return require('@/assets/images/products/default_product.png');
      } else if(type === 'user') {
        return require('@/assets/images/users/default_icon.png');
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
      getStoreData(); // Refresh search results to update saved status
    } catch (error) {
      console.log('Erro ao favoritar:', error);
    }
  };

  const getStoreData = async () => {
    try {
      const response = await axios.get(`${API_URL}/getStoreData?userId=${user.id}&storeId=${storeId}`);
      if (response.data.store) {
        setStore(response.data.store);
        setProducts(response.data.products);
      } else {
        Alert.alert('Erro ao buscar Loja', 'Formato de dados inesperado do servidor.');
      }
    } catch (error: any) {
      if (error.response) {
        const message = error.response.data.message || 'Erro desconhecido no servidor';
        Alert.alert('Erro ao buscar Loja', message);
      } else if (error.request) {
        Alert.alert('Erro de conexão', 'Não foi possível conectar ao servidor. Verifique sua internet.');
      } else {
        Alert.alert('Erro inesperado', error.message || 'Algo deu errado.');
      }
    }
  };

  useEffect(() => {
    getStoreData();
  }, [user]);

  return (
    <View className="flex-1 bg-neutral-800">
      <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}>
      {store && (
        <View>
            <View className="flex-row items-center justify-between px-3 py-4 mb-3">
              <TouchableOpacity className="h-30 w-30" onPress={() => navigation.goBack()}>
                  <ChevronLeft size={32} color="white" />
              </TouchableOpacity>

              <Text className="text-neutral-200 font-semibold text-3xl">{store.name}</Text>

              <TouchableOpacity className="flex items-end">
                  <Flag size={24} color="white" />
              </TouchableOpacity>
            </View>

          <View className="flex justify-center items-center">
            <Image 
              source={getImageUrl(store.imageURL, 'store')}
              className="rounded-full h-64 w-64"
              onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
              />
          </View>

            <View className="p-4">
            <Text className="text-white text-3xl text-center mb-3">{store.name}</Text>

            <Text className="text-neutral-400 text-lg text-center">{store.description ? store.description : 'Sem descrição disponível'}</Text>
            
            <View className="py-6">
              <View className="flex-row items-center">
                  <MapPin size={16} color="white" />
                  <Text className="text-neutral-300 text-lg pl-3">{store.city}</Text>
              </View>
              <View className="flex-row items-center">
                  <Star size={16} color="white" />
                  <Text className="text-neutral-300 text-lg pl-3">4.7 Estrelas</Text>
              </View>
            </View>
            </View>
        </View>
        )}

        <Text className="text-neutral-300 font-semibold text-3xl ms-2 mb-4">Produtos</Text>
        {products.length === 0 ?
          <View className="flex-1 flex justify-center items-center py-20 px-4">
            <View className="flex items-center bg-neutral-700 p-6 shadow-lg rounded-lg w-full">
              <ArchiveX size={42} color="#C0C0C0" />
              <Text className="text-neutral-400 text-2xl font-bold mt-2">Nenhum produto disponível! :(</Text>
            </View>
          </View>
        :
          products.map((product, index) => (
            <TouchableOpacity onPress={() => handleProductClick(product.id)} key={index} className="flex-row bg-neutral-700 rounded-lg my-2 h-36">
              <View className="mr-4">
              <Image 
                source={getImageUrl(product.imageURL, 'product')}
                className="rounded-lg rounded-r-none h-full w-32"
                onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
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
                <Heart size={24} color="yellow" fill={'yellow'} className="text-yellow-500" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
}
