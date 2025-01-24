import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ShoppingCart, Heart, MapPin } from 'lucide-react-native';
import "@/global.css";
import Menu from "@/app/components/Menu";
import Header from "@/app/components/Header";

export default function Home() {
  const user = useSelector((state: RootState) => state.user);

  const products = [
    {
      name: "Headset Razer Mano War 7.1 Wireless",
      price: "R$ 100",
      store: "Tech Store",
      location: "123 Tech Lane",
      image: require('@/back-end/public/images/products/Headset_Razer_Mano_War_7.1_Wireless.png')
    },
    {
      name: "Headset Razer Mano War 7.1 Wireless",
      price: "R$ 100",
      store: "Tech Store",
      location: "123 Tech Lane",
      image: require('@/back-end/public/images/products/Headset_Razer_Mano_War_7.1_Wireless.png')
    },
    {
      name: "Headset Razer Mano War 7.1 Wireless",
      price: "R$ 100",
      store: "Tech Store",
      location: "123 Tech Lane",
      image: require('@/back-end/public/images/products/Headset_Razer_Mano_War_7.1_Wireless.png')
    },
  ];

  return (
    <View className="flex-1 bg-neutral-800">
      <Header />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text className="text-neutral-400 text-3xl font-bold mb-4">Visto Recentemente</Text>
        
        {/* Horizontal ScrollView for products */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
          {products.map((product, index) => (
            <View key={index} className="flex-row bg-neutral-700 rounded-lg mr-4">
              <View className="mr-4">
                <Image source={product.image} className="rounded-lg rounded-r-none h-full" />
              </View>
              <View className="flex-1 flex flex-col justify-between py-2">
                <View>
                  <Text className="text-white text-lg font-bold max-w-[200px]">
                    {product.name.length > 20 ? product.name.substring(0, 20) + '...' : product.name}
                  </Text>
                  <Text className="text-neutral-200 text-2xl">{product.price}</Text>
                </View>

                <View>
                  <Text className="text-neutral-400 mt-6">{product.store}</Text>
                  <View className="flex-row items-center">
                    <MapPin size={16} color="white" />
                    <Text className="text-neutral-400 pl-1">{product.location}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity className="flex items-end justify-end p-2 rounded-lg mt-2">
                <Heart size={24} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity className="bg-blue-500 p-4 rounded-lg mb-4">
          <Text className="text-white text-center text-lg">Explore Now</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-center bg-green-500 p-4 rounded-lg mb-4">
          <ShoppingCart size={24} color="white" />
          <Text className="text-white text-center text-lg ml-2">View Cart</Text>
        </TouchableOpacity>

        <View className="bg-neutral-700 p-6 rounded-lg mb-4">
          <Text className="text-white text-xl font-semibold">Featured Product</Text>
          <Text className="text-neutral-400 mt-2">Check out our latest tech gadgets!</Text>
        </View>

        <View className="bg-neutral-700 p-6 rounded-lg mb-4">
          <Text className="text-white text-xl font-semibold">Latest News</Text>
          <Text className="text-neutral-400 mt-2">Stay updated with the latest tech news.</Text>
        </View>
      </ScrollView>
      <Menu />
    </View>
  );
}
