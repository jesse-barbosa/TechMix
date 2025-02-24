import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import axios from 'axios';
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/userSlice';
import { ChevronLeft, User, Mail, Lock, Eye, EyeOff } from 'lucide-react-native'
import { API_URL } from '../apiConfig';

export default function Register() {
  const navigation = useNavigation()
  const dispatch = useDispatch();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)

  const register = async () => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });
  
      const { user, token } = response.data;
  
      // Atualiza o estado do Redux
      dispatch(setUser(user));

      // Navega para a tela inicial
      (navigation as any).navigate('Home');
    } catch (error: any) {
      if (error.response) {
        const message = error.response.data.message || 'Erro desconhecido no servidor';
        Alert.alert('Erro no registro', message);
      } else if (error.request) {
        Alert.alert('Erro de conexão', 'Não foi possível conectar ao servidor. Verifique sua internet.');
      } else {
        Alert.alert('Erro inesperado', error.message || 'Algo deu errado.');
      }
      console.error('Erro durante o registro:', error);
    }
  };
  

  return (
    <View className="flex-1 justify-between items-center bg-neutral-800">
      {/* Header */}
      <View className="w-full p-5">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()} className="bg-customYellow rounded-full p-2">
            <ChevronLeft size={24} color="#262525" />
          </TouchableOpacity>
          <Text className="text-white text-4xl font-bold ml-4">Registrar</Text>
        </View>
        <Text className="w-full text-neutral-400 text-md mt-4 text-center">Por favor, crie sua conta</Text>
      </View>

      {/* Main */}
      <View className="w-full p-5">
        {/* Input - Nome */}
        <View className="mb-3">
          <Text className="text-white text-lg mb-1">Nome</Text>
          <View className="flex-row items-center rounded-md px-3 w-full bg-neutral-700">
            <User size={20} color="#C0C0C0"/>
            <TextInput 
              className="w-full text-neutral-300 py-4 ml-2"
              placeholder="Seu Nome"
              placeholderTextColor="#C0C0C0"
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        {/* Input - Email */}
        <View className="mb-3">
          <Text className="text-white text-lg mb-1">Email</Text>
          <View className="flex-row items-center rounded-md px-3 w-full bg-neutral-700">
            <Mail size={20} color="#C0C0C0"/>
            <TextInput 
              className="w-full text-neutral-300 py-4 ml-2"
              placeholder="exemplo@gmail.com"
              placeholderTextColor="#C0C0C0"
              value={email}
              onChangeText={setEmail}
              keyboardType='email-address'
            />
          </View>
        </View>

        {/* Input - Senha */}
        <View className="mb-3">
          <Text className="text-white text-lg mb-1">Senha</Text>
            <View className="flex-row items-center rounded-md px-3 w-full bg-neutral-700">
              <Lock size={20} color="#C0C0C0"/>
              <TextInput 
                className="flex-1 text-neutral-300 py-4 ml-2"
                placeholder="********"
                placeholderTextColor="#C0C0C0"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => (setShowPassword(!showPassword))}>
                { showPassword ? <Eye size={20} color={'#C0C0C0'} /> : <EyeOff size={20} color={'#C0C0C0'} /> }
              </TouchableOpacity>
            </View>
          <Text className="text-neutral-400 text-sm mt-1">Tamanho mínimo de 8 caracteres</Text>
        </View>
      </View>

      {/* Footer */}
      <View className="w-full p-5">
        <TouchableOpacity className="w-full bg-customYellow p-4" onPress={register}>
          <Text className="text-neutral-800 text-lg font-extrabold text-center">Registrar</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 12 }}>
          <Text className="text-white text-md">Já tem uma conta? </Text>
          <TouchableOpacity onPress={() => (navigation as any).navigate('Login')}>
            <Text className="font-bold text-customYellow">Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}