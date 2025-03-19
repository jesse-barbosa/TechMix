import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import ReviewModal from '@/app/components/Modals/ReviewModal';
import { Heart, MapPin, ChevronLeft, PencilOff, Star, PencilLine, CheckCheck, Trash2 } from 'lucide-react-native';
import axios from 'axios';
import { API_URL } from '@/apiConfig';

export default function ViewProduct() {
  const user = useSelector((state: RootState) => state.user);
  const route = useRoute();
  const navigation = useNavigation();
  const { productId } = route.params as { productId: number };
  const [isModalVisible, setIsModalVisible] = useState(false);

  type Product = {
    id: number;
    name: string;
    description: string;
    price: string;
    store: {
      name: string;
      city: string;
    };
    imageURL: string;
    saved: boolean;
  }

  type Review = {
    id: number;
    stars: number;
    user: {
      id: number;
      name: string;
      imageURL: string;
    }
    message: string;
    created_at: string;
  }

  const [product, setProduct] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

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

  const getProductData = async () => {
    try {
      const response = await axios.get(`${API_URL}/getProductData?userId=${user.id}&productId=${productId}`);
      if (Array.isArray(response.data.product)) {
        setProduct(response.data.product);
        if (Array.isArray(response.data.reviews)) {
          setReviews(response.data.reviews);
        } else {
          Alert.alert('Erro ao buscar Avaliações', 'Formato de dados inesperado do servidor.');
        }
      } else {
        Alert.alert('Erro ao buscar Produtos', 'Formato de dados inesperado do servidor.');
      }
    } catch (error: any) {
      if (error.response) {
        const message = error.response.data.message || 'Erro desconhecido no servidor';
        Alert.alert('Erro ao buscar Produto', message);
      } else if (error.request) {
        Alert.alert('Erro de conexão', 'Não foi possível conectar ao servidor. Verifique sua internet.');
      } else {
        Alert.alert('Erro inesperado', error.message || 'Algo deu errado.');
      }
    }
  };

  useEffect(() => {
    getProductData();
  }, [user]);

  const handleFavoriteToggle = async (productId: number) => {
    try {
      const response = await axios.post(`${API_URL}/toggleFavorite?productId=${productId}&userId=${user.id}`);
      getProductData();
    } catch (error) {
      console.log('Erro ao favoritar:', error);
    }
  };

  const handleSubmitReview = async (stars: number, message: string) => {
    try {
      await axios.post(`${API_URL}/addReview`, {
        userId: user.id,
        productId: productId,
        stars,
        message,
      });
      getProductData();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível enviar a avaliação.");
      console.log('error: ',error)
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    try {
      const response = await axios.post(`${API_URL}/deleteReview?reviewId=${reviewId}`);
      getProductData();
    } catch (error) {
      console.log('Error deleting review:', error);
      Alert.alert("Erro", "Não foi possível excluir a avaliação.");
    }
  };  

  return (
    <View className="flex-1 bg-neutral-800">
      <ScrollView>
        {product.map((item, index) => (
          <View key={index} className="mb-6">
            <View className="flex-row items-center justify-between px-3 py-4">
              <TouchableOpacity className="h-30 w-30" onPress={() => navigation.goBack()}>
                <ChevronLeft size={32} color="white" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleFavoriteToggle(item.id)} className="flex items-end">
                {item.saved ? (
                  <Heart size={24} color="yellow" fill={'yellow'} />
                ) : (
                  <Heart size={24} color="white" />
                )}
              </TouchableOpacity>
              </View>
            <Image 
              source={getImageUrl(item.imageURL, 'product')}
              className="rounded-t-lg h-96 w-full"
              onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
            />
            <View className="p-4">
              <View className="gap-1">
                <Text className="text-white text-3xl">{item.name}</Text>
                <Text className="text-neutral-200 text-3xl font-extrabold mb-2">R$ {item.price}</Text>
                <View className="flex-row items-center">
                  <MapPin size={16} color="white" />
                  <Text className="text-neutral-400 pl-1">{item.store.city}</Text>
                </View>
              </View>

              <Text className="text-neutral-200 text-2xl font-bold mt-6 mb-4">Descrição</Text>
              <Text className="text-neutral-400">{item.description}</Text>

            </View>
          </View>
        ))}

        <Text className="text-neutral-400 text-3xl font-bold mb-4 ms-2">Avaliações</Text>
          {reviews.length > 0 ? (
            <ScrollView className="p-3 mb-4">
              {reviews.map((review, index) => (
                <TouchableOpacity key={index} className="flex flex-row w-full items-center bg-neutral-700 rounded-lg p-4 mb-2">
                  <Image 
                    source={getImageUrl(review.user.imageURL, 'user')}
                    className="rounded-full h-16 w-16"
                    onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
                  />
                  <View className="flex flex-col w-full ml-2">
                    <View className="flex flex-row items-center">
                      <Text className="text-white text-lg font-bold">{review.user.name}</Text>
                      <Text className="text-neutral-400 text-md ms-4">
                        {new Date(review.created_at).toLocaleDateString("en-GB")}
                      </Text>
                    </View>
                    <View className="flex flex-row items-center my-1">
                      {Array.from({ length: review.stars }).map((_, i) => (
                        <Star key={`filled-${i}`} size={20} color="#FACC15" fill="#FACC15" />
                      ))}
                      {Array.from({ length: 5 - review.stars }).map((_, i) => (
                        <Star key={`empty-${i}`} size={20} color="#A3A3A3" />
                      ))}
                    </View>
                    <Text className="text-neutral-400 flex-1 max-w-[260] text-sm">{review.message}</Text>

                  </View>
                  {review.user.id === user.id && ( // Render the trash icon if the review is from the logged-in user
                      <TouchableOpacity 
                        className="absolute right-4"
                        onPress={() => handleDeleteReview(review.id)} // Define the delete function
                      >
                        <Trash2 size={24} color="#ff5147" />
                      </TouchableOpacity>
                    )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <View className="flex w-full p-4 items-center justify-center">
              <View className="w-full bg-neutral-700 rounded-lg p-6 shadow-lg flex items-center">
                <PencilOff size={32} color="white" />
                <Text className="text-neutral-200 text-lg font-bold mt-2">Nenhuma avaliação encontrada.</Text>
              </View>
            </View>
          )}
        {reviews.some(review => review.user.id === user.id) ? (// Verify if user already reviewed product
            <TouchableOpacity 
              className="flex flex-row justify-center gap-2 bg-customYellow rounded-lg p-4 m-4 items-center opacity-70"
              disabled
            >
              <CheckCheck size={22} color="#262626" />
              <Text className="text-neutral-800 text-lg font-extrabold">Você Já Avaliou Este Produto</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              className="flex flex-row justify-center gap-2 bg-customYellow rounded-lg p-4 m-4 items-center"
              onPress={() => setIsModalVisible(true)}
            >
              <PencilLine size={22} color="#262626" />
              <Text className="text-neutral-800 text-lg font-extrabold">Escrever Avaliação</Text>
            </TouchableOpacity>
          )}
      </ScrollView>
      <ReviewModal 
        visible={isModalVisible} 
        onClose={() => setIsModalVisible(false)} 
        onSubmit={handleSubmitReview} 
      />
    </View>
  );
}
