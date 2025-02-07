import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Heart, MapPin } from 'lucide-react-native';
import axios from 'axios';
import "@/global.css";
import Menu from "@/app/components/Menu";
import Header from "@/app/components/Header";
import { API_URL } from '@/apiConfig';

export default function Home() {
  const user = useSelector((state: RootState) => state.user);

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

  const getImageUrl = (imageURL: string) => {
    console.log('Original imageURL:', imageURL); // Debug log

    if (!imageURL) {
      console.log('imageURL is empty or undefined');
      return 'https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg'; // Placeholder image
    }
    if (imageURL.startsWith('http://') || imageURL.startsWith('https://')) {
      console.log('Using full URL:', imageURL);
      return imageURL;
    }

    // Remove '/storage/' from the beginning if it exists
    const cleanedPath = imageURL.replace(/^\/?(storage\/)?/, '');
    const url = `${API_URL}/storage/${cleanedPath}`;
    console.log('Generated image URL:', url); // Debug log
    return url;
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/getProducts`);

        if (Array.isArray(response.data.products)) {
          setProducts(response.data.products);
          console.log('Produtos buscados com sucesso:', JSON.stringify(response.data.products, null, 2));
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

    getProducts();
  }, [user]);

  return (
    <View className="flex-1 bg-neutral-800">
      <Header />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text className="text-neutral-400 text-3xl font-bold mb-4">Visto Recentemente</Text>

        {/* Horizontal ScrollView for products */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
          {products.map((product, index) => {
            console.log('Rendering product:', JSON.stringify(product, null, 2)); // Debug log
            return (
              <View key={index} className="flex-row bg-neutral-700 rounded-lg mr-4">
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
