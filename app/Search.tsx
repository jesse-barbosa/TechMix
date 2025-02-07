import { View, Text, ScrollView, TouchableOpacity, Image, Alert, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Heart, MapPin, Search } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import "@/global.css";
import Menu from "@/app/components/Menu";
import { API_URL } from '@/apiConfig';

export default function Home() {
  const user = useSelector((state: RootState) => state.user);
  const navigation = useNavigation();

  // Defining type for Products
  type Product = {
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
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = debounce(() => {
    search();
  }, 500); // Wait 500ms before triggering
  
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      debouncedSearch();
    } else {
      setProducts([]); // Clear results when search is empty
    }
  }, [searchTerm]);

  const getImageUrl = (imageURL: string) => {
    // Ensure we remove '/storage/' from the start if it exists
    const cleanedPath = imageURL.replace(/^\/?(storage\/)?/, '');
  
    // Remove '/api' from the end of the API_URL safely
    const cleanedApiUrl = API_URL.replace(/\/api\/?$/, '');
  
    const url = `${cleanedApiUrl}/storage/${cleanedPath}`;
    console.log('Generated image URL:', url); // Debugging
    return url;
  };  

  const search = async () => {
    try {
      const response = await axios.get(`${API_URL}/searchProducts?search=${searchTerm}`);

      if (Array.isArray(response.data.products)) {
        setProducts(response.data.products);
        console.log('Pesquisa realizada com sucesso:', JSON.stringify(response.data.products, null, 2));
      } else {
        Alert.alert('Erro ao realizar pesquisa', 'Formato de dados inesperado do servidor.');
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

  return (
    <View className="flex-1 bg-neutral-800">
      <View className="mt-6 mx-4">
        <View className="bg-neutral-900 w-full flex-row justify-between items-center py-2 px-3 rounded-lg">
          <TextInput 
            placeholder="Buscar Produto ou Loja..." 
            className="text-white text-lg" 
            style={{ width: '90%' }}
            placeholderTextColor="#D1D5DB"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <TouchableOpacity onPress={() => search()}>
            <Search size={26} color="#C0C0C0" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text className="text-neutral-400 text-2xl font-bold mb-4"><Text className="text-yellow-500">6</Text> Resultados Encontrados</Text>

        {/* Horizontal ScrollView for products */}
        <ScrollView showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
          {products.map((product, index) => {
            return (
              <View key={index} className="flex-row bg-neutral-700 rounded-lg my-2 h-36">
                <View className="mr-4">
                  <Image
                    source={{ uri: getImageUrl(product.imageURL) }}
                    className="rounded-lg rounded-r-none h-full w-28"
                    onError={(e) => {
                      console.log('Image load error:', e.nativeEvent.error);
                      // Set a placeholder image when the original fails to load
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
              <TouchableOpacity className="flex items-end justify-end p-2 rounded-lg mt-2">
                <Heart size={24} color="white" />
              </TouchableOpacity>
            </View>
          );
        })}
        </ScrollView>
      </ScrollView>
      <Menu />
    </View>
  );
}
