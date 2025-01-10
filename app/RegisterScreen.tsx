import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import axios from 'axios';
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ChevronLeft, User, Mail, Lock, Eye, EyeOff } from 'lucide-react-native'
import API_URL from '../apiConfig';
import "../global.css";

export default function Register() {
  const navigation = useNavigation()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)

  const register = async () => {
    try {
      const response = await axios.post(`http://${API_URL}/api/register`, {
        name,
        email,
        password,
      });
  
      const { user, token } = response.data;
  
      console.log('Registro bem-sucedido:', user);
  
      // Navegar para a tela Home com os dados do usuário
      (navigation as any).navigate('Home', { user, token });
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
          <TouchableOpacity onPress={() => navigation.goBack()} className="bg-yellow-400 rounded-full p-2">
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
              placeholder="****"
              placeholderTextColor="#C0C0C0"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => (setShowPassword(!showPassword))}>
              { showPassword ? <Eye size={20} color={'#C0C0C0'} /> : <EyeOff size={20} color={'#C0C0C0'} /> }
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View className="w-full p-5">
        <TouchableOpacity className="w-full bg-yellow-400 p-4" onPress={register}>
          <Text className="text-neutral-800 text-lg font-extrabold text-center">Registrar</Text>
        </TouchableOpacity>
        <Text className="text-white text-md text-center mt-3">Já tem uma conta?
          <TouchableOpacity onPress={() => (navigation as any).navigate('Login')}>
            <Text className="font-bold text-yellow-400"> Entrar</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
}