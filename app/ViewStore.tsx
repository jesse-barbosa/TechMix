import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import { Heart, MapPin, ChevronLeft, Frown, Star } from 'lucide-react-native';
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

  const [store, setStore] = useState<Store | null>(null);

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

  const getStoreData = async () => {
    try {
      const response = await axios.get(`${API_URL}/getStoreData?userId=${user.id}&storeId=${storeId}`);
      if (response.data.store) {
        setStore(response.data.store);
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
      <ScrollView contentContainerStyle={{ padding: 10 }}>
      {store && (
        <View className="mb-6">
            <View className="flex-row items-center justify-between px-3 py-4">
              <TouchableOpacity className="h-30 w-30" onPress={() => navigation.goBack()}>
                  <ChevronLeft size={32} color="white" />
              </TouchableOpacity>

              <Text className="text-neutral-200 font-semibold text-3xl">{store.name}</Text>

              <TouchableOpacity className="flex items-end">
                {/* {storea.saved ? (
                  <Heart size={24} color="yellow" fill={'yellow'} />
                ) : ( */}
                  <Heart size={24} color="white" />
                {/* )} */}
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
            <Text className="text-white text-3xl text-center">{store.name}</Text>

            <Text className="text-neutral-400 text-lg text-center py-8">{store.description ? store.description : 'Sem descrição disponível'}</Text>
            
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
        )}

        <Text className="text-neutral-300 font-semibold text-3xl ms-2">Produtos</Text>

      </ScrollView>
    </View>
  );
}
