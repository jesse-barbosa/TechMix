import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ChevronLeft, Send, Flag } from 'lucide-react-native';
import axios from 'axios';
import { API_URL } from '@/apiConfig';

export default function Home() {
  const route = useRoute();
  const { chatId } = route.params as { chatId: number };
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.user);

  type Store = {
    id: number;
    name: string;
    imageURL: string;
  };

  type Message = {
    id: number;
    senderId: number;
    senderType: string;
    message: string;
    created_at: string;
  };

  const [store, setStore] = useState<Store>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

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

  const getStoreData = async () => {
    try {
      const response = await axios.get(`${API_URL}/getStoreData?userId=${user.id}`);
      if (response.data.storeData) {
        setStore(response.data.storeData);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados da loja.');
      console.error(error);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${API_URL}/getMessages?chatId=${chatId}`);
      setMessages(res.data.messages);
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const res = await axios.post(`${API_URL}/sendMessage`, {
        chatId,
        userId: user.id,
        message: newMessage,
      });

      setMessages([...messages, res.data.message]);
      setNewMessage('');

      // Scroll para o final
      scrollViewRef.current?.scrollToEnd({ animated: true });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      Alert.alert('Erro', 'Não foi possível enviar a mensagem.');
    }
  };

  useEffect(() => {
    getStoreData();
    fetchMessages();
  }, []);

  return (
    <View className="flex-1 bg-neutral-800">
      <View className="flex flex-row items-center justify-between px-2 py-1">
        <View className="flex flex-row items-center">
          <ChevronLeft size={32} color="#C0C0C0" onPress={() => (navigation as any).goBack()} />
          <Image source={getImageUrl(store?.imageURL, 'store')} className="rounded-full h-14 w-14 ms-2" />
          <Text className="text-neutral-400 text-3xl font-bold mx-3">{store?.name}</Text>
        </View>
        <Flag size={24} color="#C0C0C0" />
      </View>

      {/* Mensagens */}
      <ScrollView
        className="px-3 mb-2"
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg, index) => {
          const isUser = msg.senderType === 'user';
          return (
            <View
              key={index}
              className={`my-2 p-3 rounded-lg max-w-[80%] ${isUser ? 'bg-yellow-500 self-end' : 'bg-neutral-700 self-start'}`}
            >
              <Text className={`text-base ${isUser ? 'text-black' : 'text-white'}`}>{msg.message}</Text>
              <Text className={`text-xs mt-1 ${isUser ? 'text-neutral-800' : 'text-neutral-400'}`}>
                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      {/* Campo de envio */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
        className="flex flex-row items-center justify-between px-2 py-2"
      >
        <View className="bg-neutral-700 flex-row items-center p-3 rounded-lg flex-1 mr-2">
          <TextInput
            placeholder="Digite uma mensagem..."
            placeholderTextColor="#D1D5DB"
            value={newMessage}
            onChangeText={setNewMessage}
            className="text-white flex-1"
            multiline
          />
        </View>
        <TouchableOpacity onPress={sendMessage} className="p-3 bg-yellow-500 rounded-lg">
          <Send size={24} color="#262626" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
