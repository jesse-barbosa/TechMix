import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { ChevronLeft } from 'lucide-react-native'
import axios from 'axios';
import { setUser } from '../slices/userSlice';
import { API_URL } from '@/apiConfig';

export default function ViewProfile() {
  const user = useSelector((state: RootState) => state.user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  async function handleSave() {
    try {
      const response = await axios.post(`${API_URL}/updateProfile`, { id: user.id, name, email });
      dispatch(setUser(response.data));
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
    } catch (error) {
    // console.log('Erro:', error)
    Alert.alert('Erro', 'Não foi possível atualizar os dados.');
    }
  }

  return (
    <View className="flex-1 flex justify-between bg-neutral-800">
        <View className="flex flex-row items-center mb-6 px-2 py-6">
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <ChevronLeft size={32} color="#C0C0C0" />
            </TouchableOpacity>
            <Text className="text-white text-3xl font-bold ms-3">Minha Conta</Text>
        </View>
            <View className="px-6">
                <Text className="text-neutral-400 text-lg mb-2">Nome</Text>
                <TextInput
                    className="bg-neutral-700 text-white p-4 rounded-xl mb-4"
                    value={name}
                    onChangeText={setName}
                />

                <Text className="text-neutral-400 text-lg mb-2">E-mail</Text>
                <TextInput
                    className="bg-neutral-700 text-white p-4 rounded-xl mb-6"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <View className="p-6">
                <TouchableOpacity onPress={handleSave} className="bg-yellow-500 p-4 rounded-xl mb-4">
                    <Text className="text-neutral-900 text-center font-bold text-lg">Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => (navigation as any).navigate('Login')} className="bg-red-600 p-4 rounded-xl">
                    <Text className="text-white text-center font-bold text-lg">Sair da Conta</Text>
                </TouchableOpacity>
            </View>
    </View>
  );
}
