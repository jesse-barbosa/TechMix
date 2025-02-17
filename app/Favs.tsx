import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Heart, MapPin, ArchiveX } from 'lucide-react-native';
import axios from 'axios';
import "@/global.css";
import Header from "@/app/components/Header";
import Menu from "@/app/components/Menu";
import { API_URL } from '@/apiConfig';

export default function Home() {
  const user = useSelector((state: RootState) => state.user);

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
  }

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getSavedProducts();
  }, []); // Run only once when the component mounts

  const getImageUrl = (imageURL: string) => {
    const cleanedPath = imageURL.replace(/^\/?(storage\/)?/, '');
    const cleanedApiUrl = API_URL.replace(/\/api\/?$/, '');
    const url = `${cleanedApiUrl}/storage/${cleanedPath}`;
    return url;
  };

  const handleFavoriteToggle = async (productId: number) => {
    try {
      const response = await axios.post(`${API_URL}/toggleFavorite?productId=${productId}&userId=${user.id}`);
      console.log(response.data.message);
      getSavedProducts(); // Refresh the list after toggling favorite
    } catch (error) {
      console.log('Erro ao favoritar:', error);
    }
  };

  const getSavedProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/getSavedProducts?userId=${user.id}`);
      if (Array.isArray(response.data.products)) {
        setProducts(response.data.products);
        console.log('Consulta realizada com sucesso:', JSON.stringify(response.data.products, null, 2));
      } else {
        Alert.alert('Erro ao realizar consulta', 'Formato de dados inesperado do servidor.');
        console.log(response.data);
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

  return (
    <View className="flex-1 bg-neutral-800">
      <Header />
      {
        products.length === 0 ? (
          <View className="flex-1 flex justify-center items-center py-20 px-4">
            <View className="flex items-center bg-neutral-700 p-6 shadow-lg rounded-lg w-full">
              <ArchiveX size={42} color="#C0C0C0" />
              <Text className="text-neutral-400 text-2xl font-bold mt-2">Nenhum produto salvo</Text>
            </View>
          </View>
        ) : (
          <ScrollView contentContainerStyle={{ padding: 20 }}>
            <Text className="text-neutral-400 text-2xl font-bold mb-4"><Text className="text-yellow-500">{ products.length }</Text> Produtos Salvos</Text>
            <ScrollView showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
              {products.map((product, index) => (
                <View key={index} className="flex-row bg-neutral-700 rounded-lg my-2 h-36">
                  <View className="mr-4">
                    <Image
                      source={{ uri: getImageUrl(product.imageURL) }}
                      className="rounded-lg rounded-r-none h-full w-28"
                      onError={(e) => {
                        console.log('Image load error:', e.nativeEvent.error);
                        (e.currentTarget as any).setNativeProps({
                          source: [{ uri: "https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg" }]
                        });
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
                    <Heart size={24} color="yellow" fill={'yellow'} className="text-yellow-500" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </ScrollView>
        )}
      <Menu />
    </View>
  );
}
