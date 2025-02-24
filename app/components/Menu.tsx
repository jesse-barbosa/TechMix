import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Home, Search, Bookmark, User2 } from 'lucide-react-native';

const Menu = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const isActive = (routeName: string) => {
    return route.name === routeName;
  }

  return (
    <View className="component flex-row w-full justify-between p-5">
      <TouchableOpacity onPress={() => (navigation as any).navigate('Home')}>
        <Home size={32} color={isActive('Home') ? '#fff' : '#C0C0C0'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => (navigation as any).navigate('Search')}>
        <Search size={32} color={isActive('Search') ? '#fff' : '#C0C0C0'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => (navigation as any).navigate('Favs')}>
        <Bookmark size={32} color={isActive('Favs') ? '#fff' : '#C0C0C0'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => (navigation as any).navigate('User')}>
        <User2 size={32} color={isActive('User') ? '#fff' : '#C0C0C0'} />
      </TouchableOpacity>
    </View>
  );
};

export default Menu;
