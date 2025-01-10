import { View, Text } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import "../global.css";

// Definindo o tipo dos parâmetros
type HomeParams = {
  user: {
    name: string;
    email: string;
  };
  token: string;
};

type HomeScreenRouteProp = RouteProp<{ Home: HomeParams }, 'Home'>;

export default function Home() {
  const route = useRoute<HomeScreenRouteProp>();
  const { user, token } = route.params;

  return (
    <View className="flex-1 justify-center items-center bg-neutral-800">
      <Text className="text-white text-2xl font-bold">Bem-vindo, {user.name}!</Text>
      <Text className="text-neutral-400 text-md mt-4">Seu email: {user.email}</Text>
    </View>
  );
}
