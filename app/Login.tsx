import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native'
import axios from 'axios';
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/userSlice';
import { ChevronLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react-native'
import { API_URL } from '../apiConfig';

export default function Login() {
  const navigation = useNavigation()
  const dispatch = useDispatch();

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const [ showPassword, setShowPassword ] = useState(false)

  const login = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
  
      const { user, token } = response.data;

      // Atualiza o estado do Redux
      dispatch(setUser(user));
  
      // Navega para a tela Inicial
      (navigation as any).navigate('Home');
    } catch (error: any) {
      if (error.response) {
        const message = error.response.data.message || 'Erro desconhecido no servidor';
        Alert.alert('Erro no login', message);
      } else if (error.request) {
        Alert.alert('Erro de conexão', 'Não foi possível conectar ao servidor. Verifique sua internet.');
      } else {
        Alert.alert('Erro inesperado', error.message || 'Algo deu errado.');
      }
      console.error('Erro durante o login:', error);
    }
  };
  
  
  return (
    <View className="flex-1 justify-between items-center bg-neutral-800">
      {/* Header */}
      <View className="w-full p-5 mt-2">
        <View className="flex-row items-center">
          <TouchableOpacity className="">
            <Image 
              source={require('@/assets/images/icon.png')} 
              style={{ height: 35, width: 53 }} 
            />
          </TouchableOpacity>
          <Text className="text-white text-4xl font-bold ml-4">Entrar</Text>
        </View>
        <Text className="w-full text-neutral-400 text-md mt-4 text-center">Inicie sessão com sua conta existente</Text>
      </View>
      {/* Main */}
      <View className="w-full p-5">
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
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? <Eye size={20} color="#C0C0C0" /> : <EyeOff size={20} color="#C0C0C0" /> }
            </TouchableOpacity>
          </View>
        </View>

      </View>
      {/* Footer */}
      <View className="w-full p-5">
        <TouchableOpacity className="bg-customYellow w-full p-4" onPress={login}>
          <Text className="text-neutral-800 text-lg font-extrabold text-center">Entrar</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 12 }}>
          <Text className="text-white text-md">Não tem uma conta? </Text>
          <TouchableOpacity onPress={() => (navigation as any).navigate('Register')}>
            <Text 
              className="font-bold text-customYellow" 
            >
              Registre-se
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
