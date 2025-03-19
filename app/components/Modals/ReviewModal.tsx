import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';
import { Star } from 'lucide-react-native';
import { useState } from 'react';

interface ReviewModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (stars: number, message: string) => void;
}

export default function ReviewModal({ visible, onClose, onSubmit }: ReviewModalProps) {
  const [stars, setStars] = useState(0);
  const [message, setMessage] = useState('');

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/60 px-4">
        <View className="bg-neutral-700 py-6 px-4 rounded-lg w-full">
          <Text className="text-white text-2xl font-bold">Escrever Avaliação</Text>

          {/* Star Rating */}
          <View className="flex-row justify-center py-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <TouchableOpacity key={i} onPress={() => setStars(i + 1)}>
                <Star size={32} color={i < stars ? "#FACC15" : "#A3A3A3"} fill={i < stars ? "#FACC15" : "transparent"} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Message Input */}
          <TextInput
            className="bg-neutral-600 text-white rounded-lg p-4 h-24"
            placeholder="Escreva sua avaliação..."
            placeholderTextColor="#A3A3A3"
            multiline
            value={message}
            onChangeText={setMessage}
          />

          {/* Buttons */}
          <View className="flex-row justify-between mt-4">
            <TouchableOpacity className="bg-neutral-500 rounded-lg p-3 flex-1 mr-2" onPress={onClose}>
              <Text className="text-white text-center font-bold">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="bg-customYellow rounded-lg p-3 flex-1 ml-2" 
              onPress={() => {
                onSubmit(stars, message);
                setStars(0);
                setMessage('');
                onClose();
              }}
              disabled={stars === 0 || message.trim() === ''}
            >
              <Text className="text-neutral-800 text-center font-bold">Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
