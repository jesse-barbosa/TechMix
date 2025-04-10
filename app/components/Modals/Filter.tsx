import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { CircleX } from 'lucide-react-native';
import { useState, useEffect } from 'react';

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
}

interface FilterProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (category: string, location: string) => void;
  selectedCategory: string;
  selectedLocation: string;
  setSelectedCategory?: (category: string) => void;
  categories: Category[];
  locations: string[];
}

export default function Filter({ 
  visible, 
  onClose, 
  onSubmit, 
  selectedCategory,
  selectedLocation: initialSelectedLocation,
  categories, 
  locations 
}: FilterProps) {
    const [localSelectedCategory, setLocalSelectedCategory] = useState(selectedCategory);
    const [localSelectedLocation, setLocalSelectedLocation] = useState(initialSelectedLocation || '')

  // Update local state when prop changes
  useEffect(() => {
    setLocalSelectedCategory(selectedCategory);
    setLocalSelectedLocation(initialSelectedLocation || '');
  }, [selectedCategory, initialSelectedLocation]);

  const handleSubmit = () => {
    onSubmit(localSelectedCategory, localSelectedLocation);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <View className="flex-1 justify-center items-center mx-4">
        <View className="bg-neutral-600 p-6 rounded-lg w-full">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-3xl text-white font-semibold">Filtrar resultados</Text>
            <TouchableOpacity onPress={onClose}>
              <CircleX size={26} color="#FFF" />
            </TouchableOpacity>
          </View>
          <Text className="text-md text-neutral-200 text-center my-4">Defina os filtros e refaça a pesquisa</Text>
          <View className="mb-4">
            <Text className="text-neutral-200 text-xl mb-2">Categoria</Text>
            <Picker
              selectedValue={localSelectedCategory}
              onValueChange={(itemValue: string) => setLocalSelectedCategory(itemValue)}
              style={{
                color: "#FFF",
                backgroundColor: "#636363",
              }}
            >
              <Picker.Item label="Geral" value="" />
              {categories.map((category, index) => (
                <Picker.Item key={index} label={category.name} value={category.name} />
              ))}
            </Picker>
          </View>
          <View className="mb-4">
            <Text className="text-neutral-200 text-xl mb-2">Localização</Text>
            <Picker
              selectedValue={localSelectedLocation}
              onValueChange={(itemValue: string) => setLocalSelectedLocation(itemValue)}
              style={{
                color: "#FFF",
                backgroundColor: "#636363",
              }}
            >
              <Picker.Item label="Geral" value="" />
              {locations.map((location, index) => (
                <Picker.Item key={index} label={location} value={location} />
              ))}
            </Picker>
          </View>
          <TouchableOpacity onPress={handleSubmit} className="bg-yellow-500 p-3 mt-4 rounded">
            <Text className="text-center text-neutral-800 font-bold text-lg">Aplicar Filtros</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}