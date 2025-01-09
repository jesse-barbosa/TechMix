import { View, Text } from 'react-native';
import "../global.css";

export default function Home() {
  
  return (
    <View className="flex-1 justify-between items-center bg-neutral-800">
      {/* Main */}
      <Text className="text-white text-4xl font-bold ml-4">Olá [Nome de Usuário]</Text>
    </View>
  );
}
