import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ChevronRight, Heart, User, Settings, HelpCircle } from 'lucide-react-native';
import "@/global.css";
import Menu from "@/app/components/Menu";

export default function Home() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <View className="flex-1 bg-neutral-800">
      <ScrollView>
        <View className="flex-col flex items-center justify-center text-center">
          <View className="absolute top-1 bg-yellow-500 h-32 p-3 w-full"></View>
            <Image 
              source={user.imageURL ? { uri: user.imageURL } : require('@/assets/images/users/default_icon.png')}
              className="rounded-lg rounded-r-none w-48 h-48"
            />
        <View className="text-center py-6">
          <Text className="text-white text-2xl font-bold">{ user.name }</Text>
          <Text className="text-neutral-400 text-lg">{user.email}</Text>
        </View>

      </View>

      <View className="px-4 mt-8">
        <TouchableOpacity className="w-full bg-neutral-700 px-6 py-8 rounded-xl shadow-lg mt-2 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Heart size={26} color="#e5e5e5" />
            <Text className="text-neutral-200 text-2xl font-semibold ml-3">Meus Favoritos</Text>
          </View>
          <ChevronRight size={24} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity className="w-full bg-neutral-700 px-6 py-8 rounded-xl shadow-lg mt-4 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <User size={26} color="#e5e5e5" />
          <Text className="text-neutral-200 text-2xl font-semibold ml-3">Minha Conta</Text>
        </View>
        <ChevronRight size={24} color="#FFF" />
      </TouchableOpacity>

      <TouchableOpacity className="w-full bg-neutral-700 px-6 py-8 rounded-xl shadow-lg mt-4 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Settings size={26} color="#e5e5e5" />
          <Text className="text-neutral-200 text-2xl font-semibold ml-3">Configurações</Text>
        </View>
        <ChevronRight size={24} color="#FFF" />
      </TouchableOpacity>

      <TouchableOpacity className="w-full bg-neutral-700 px-6 py-8 rounded-xl shadow-lg mt-4 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <HelpCircle size={26} color="#e5e5e5" />
          <Text className="text-neutral-200 text-2xl font-semibold ml-3">Ajuda</Text>
        </View>
        <ChevronRight size={24} color="#FFF" />
      </TouchableOpacity>

      </View>

      </ScrollView>
      <Menu />
    </View>
  );
}
