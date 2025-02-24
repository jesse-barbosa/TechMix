import React from 'react';
import { View, TextInput, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Search } from 'lucide-react-native';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View className="component flex-row w-full justify-between items-center p-4">
      <Image 
        source={require('@/assets/images/icon.png')} 
        style={{ height: 35, width: 53 }} 
        className="mr-2" 
      />
      <View className="bg-neutral-800 flex-row justify-between items-center px-3 rounded-lg">
        <TextInput 
          placeholder="Buscar Produto ou Loja..." 
          className="text-white" 
          style={{ width: '75%' }}
          placeholderTextColor="#D1D5DB"
        />
        <TouchableOpacity onPress={() => (navigation as any).navigate('Search')}>
          <Search size={26} color="#C0C0C0" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
