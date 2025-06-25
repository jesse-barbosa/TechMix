import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Search } from 'lucide-react-native';

const Header = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Navigate to Search page with searchTerm (if any)
    (navigation as any).navigate('Search', { searchTerm });
  };

  return (
    <View className="component flex-row w-full justify-between items-center p-4">
      <Image
        source={require('@/assets/images/icon.png')}
        style={{ height: 35, width: 53 }}
      />
      <View className="flex-row justify-center items-center rounded-lg text-center">
        <TextInput
          placeholder="Buscar Produto ou Loja..."
          className="text-white text-center w-10/12"
          placeholderTextColor="#D1D5DB"
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Search size={24} color="#C0C0C0" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;