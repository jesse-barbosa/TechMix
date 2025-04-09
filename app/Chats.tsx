import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ChevronRight, MessageCircleX } from 'lucide-react-native';
import axios from 'axios';
import Menu from "@/app/components/Menu";
import Header from "@/app/components/Header";
import { API_URL } from '@/apiConfig';

export default function Home() {
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.user);

  type Chat = {
    id: number;
    store: {
      name: string;
      imageURL: string;
    };
    lastMessage: string;
    lastSender: 'user' | 'store';
  }

  const [chats, setChats] = useState<Chat[]>([]);

  const handleChatClick = (chatId: number) => {
    (navigation as any).navigate('ViewChat', { chatId });
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

  const getChats = async () => {
    try {
      const response = await axios.get(`${API_URL}/getChats?userId=${user.id}`);

      if (Array.isArray(response.data.chats)) {
        setChats(response.data.chats);
      } else {
        console.error('Expected an array of chats, but received:', response.data);
        Alert.alert('Erro ao buscar conversas', 'Formato de dados inesperado do servidor.');
      }

    } catch (error: any) {
      if (error.response) {
        const message = error.response.data.message || 'Erro desconhecido no servidor';
        Alert.alert('Erro ao buscar conversas', message);
      } else if (error.request) {
        Alert.alert('Erro de conexão', 'Não foi possível conectar ao servidor. Verifique sua internet.');
      } else {
        Alert.alert('Erro inesperado', error.message || 'Algo deu errado.');
      }
      console.error('Erro durante a busca de conversas:', error);
    }
  };

  useEffect(() => {
    getChats();
  }, [user]);

  return (
    <View className="flex-1 bg-neutral-800">
      <Header />
      {chats.length === 0 ? (
          <View className="flex-1 flex justify-center items-center py-20 px-4">
          <View className="flex items-center bg-neutral-700 p-6 shadow-lg rounded-lg w-full">
            <MessageCircleX size={42} color="#C0C0C0" />
            <Text className="text-neutral-400 text-2xl font-bold mt-2">Nenhuma conversa criada</Text>
          </View>
        </View>
        ) : (
          <ScrollView className="px-3">
            <Text className="text-neutral-400 text-3xl font-bold my-4">Suas Conversas</Text>
            {chats.map((chat, index) => (
              <TouchableOpacity onPress={() => handleChatClick(chat.id)} key={index} className="flex flex-row items-center justify-between bg-neutral-700 rounded-lg my-1 py-4 px-3 w-full h-32">
                <Image 
                  source={ getImageUrl(chat.store.imageURL, 'store') }
                  className="rounded-full h-20 w-20"
                  onError={(e) => {
                    console.log('Erro ao carregar imagem de loja:', e.nativeEvent.error);
                    // Atualiza a imagem para fallback diretamente no onError
                    e.preventDefault();
                  }}
                />
                <View className="flex flex-col w-9/12 items-start justify-start ps-3 text-start">
                  <Text className="text-white text-xl font-bold mb-2 text-start">{chat.store.name}</Text>
                  <Text 
                    className="text-neutral-400 text-md font-normal text-start"
                    numberOfLines={2}>
                      {chat.lastSender && <Text className="text-neutral-200 font-semibold">{chat.lastSender === 'user' ? 'Você: ' : 'Loja: '}</Text> }
                      {chat.lastMessage}
                  </Text>
                </View>
                <ChevronRight size={24} color="#C0C0C0" />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      <Menu />
    </View>
  );
}