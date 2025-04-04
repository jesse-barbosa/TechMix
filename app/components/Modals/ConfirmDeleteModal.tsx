import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

interface ConfirmDeleteModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ visible, onClose, onSubmit }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/60 px-4">
        <View className="bg-neutral-700 py-6 px-4 rounded-lg w-full">
          <Text className="text-white text-2xl font-bold mb-4">Confirmar Exclusão</Text>
          <Text className="text-neutral-300 mb-6">Tem certeza de que deseja excluir seu histórico?</Text>
          <View className="flex-row justify-between">
            <TouchableOpacity className="bg-neutral-500 rounded-lg p-3 flex-1 mr-2" onPress={onClose}>
              <Text className="text-white text-center font-bold">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-customYellow rounded-lg p-3 flex-1 ml-2" onPress={onSubmit}>
              <Text className="text-neutral-800 text-center font-bold">Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmDeleteModal;