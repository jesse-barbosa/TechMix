import { View, Text, ScrollView, TouchableOpacity, Image, Alert, TextInput, Modal } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Heart, MapPin, Search, ArchiveX, SlidersHorizontal, CircleX } from 'lucide-react-native';
import axios from 'axios';
import Menu from "@/app/components/Menu";
import { API_URL } from '@/apiConfig';

export default function Home() {
  const navigation = useNavigation();
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

  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<keyof typeof searchTypes>('product');
  const [filterVisible, setFilterVisible] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState(['']);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleProductClick = (productId: number) => {
    (navigation as any).navigate('ViewProduct', { productId });
  };

  useEffect(() => {
    getCategories();
    search();
  }, [searchTerm, selectedCategory, selectedLocation]);

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

  const getCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/getAllCategories`);
      if (Array.isArray(response.data.categories)){
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


  const search = async () => {
    try {
      const response = await axios.get(`${API_URL}/searchProducts?search=${searchTerm}&userId=${user.id}`);
      if (Array.isArray(response.data.products)) {
        setProducts(response.data.products);
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
        <View className="bg-neutral-700 w-full flex-row justify-between items-center py-1 px-3 rounded-xl">
          <TextInput 
            placeholder="Buscar Produto ou Loja..." 
            className="text-neutral-200 text-lg" 
            style={{ width: '90%' }}
            placeholderTextColor="#A3A3A3"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <TouchableOpacity onPress={() => search()}>
            <Search size={26} color="#C0C0C0" />
          </TouchableOpacity>
        </View>
      </View>
      {
        products.length === 0 ? (
          <View className="flex-1 flex justify-center items-center py-20 px-4">
            <View className="flex items-center bg-neutral-700 p-6 shadow-lg rounded-lg w-full">
              <ArchiveX size={42} color="#C0C0C0" />
              <Text className="text-neutral-400 text-2xl font-bold mt-2">Nada encontrado! :(</Text>
            </View>
          </View>
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
                  borderRadius: 10,
                }}
              >
                <Picker.Item label="Geral" value="" />
                {locations.map((location, index) => (
                  <Picker.Item key={index} label={location} value={location} />
                ))}
              </Picker>
            </View>
            <TouchableOpacity onPress={() => setFilterVisible(false)} className="bg-yellow-500 p-3 mt-4 ">
              <Text className="text-center text-neutral-800 font-bold text-lg">Aplicar Filtros</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
