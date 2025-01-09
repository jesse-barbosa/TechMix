import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import "../global.css";

export default function Login() {
  const navigation = useNavigation();

  const login = () => {
    // Lógica para fazer login
    
  }

  return (
    <View className="flex-1 justify-between items-center bg-neutral-800">
      {/* Header */}
      <View className="w-full p-5">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()} className="bg-yellow-400 rounded-full p-2">
            <ChevronLeft size={24} color="#262525" />
          </TouchableOpacity>
          <Text className="text-white text-4xl font-bold ml-4">Entrar</Text>
        </View>
        <Text className="w-full text-neutral-400 text-md mt-4 text-center">Por favor entre com sua conta existente</Text>
      </View>
      {/* Main */}
      <View className="w-full p-5">
        {/* Input */}
        <View className="mb-3">
          <Text className="text-white text-lg mb-1">Email</Text>
          <View className="flex-row items-center rounded-md px-3 w-full bg-neutral-700">
            <Mail size={20} color="#C0C0C0"/>
            <TextInput 
              className="w-full text-neutral-300 py-4 ml-2"
              placeholder="exemplo@gmail.com"
              placeholderTextColor="#C0C0C0"
            />
          </View>
        </View>
        {/* Input */}
        <View className="mb-3">
          <Text className="text-white text-lg mb-1">Senha</Text>
          <View className="flex-row items-center rounded-md px-3 w-full bg-neutral-700">
            <Lock size={20} color="#C0C0C0"/>
            <TextInput 
              className="w-full text-neutral-300 py-4 ml-2"
              placeholder="****"
              placeholderTextColor="#C0C0C0"
              secureTextEntry
            />
          </View>
        </View>

      </View>
      {/* Footer */}
      <View className="w-full p-5">
        <TouchableOpacity className="w-full bg-yellow-400 p-4" onPress={login}>
          <Text className="text-neutral-800 text-lg font-extrabold text-center">Entrar</Text>
        </TouchableOpacity>
        <Text className="text-white text-md text-center mt-3">Não tem uma conta?
          <TouchableOpacity>
            <Text className="font-bold text-yellow-400"> Registre-se</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
}
