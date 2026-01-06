import BottomSheetModal from 'components/shared/BottomSheetModal';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

interface TaskModalProps {
  sheetRef?: any;
  onClose?: () => void;
  onSubmit?: (task: { title: string; description: string }) => void;
  mode: 'create' | 'edit';
  initialData?: {
    title: string;
    description: string;
  };
}

const TaskModal = ({ 
  sheetRef, 
  onClose, 
  onSubmit, 
  mode = 'create', 
  initialData 
}: TaskModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [mode, initialData]);

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit?.({ title, description });
      setTitle('');
      setDescription('');
      onClose?.();
    }
  };

  const modalTitle = mode === 'create' ? 'Create New Task' : 'Edit Task';
  const buttonText = mode === 'create' ? 'Create Task' : 'Save Changes';

  return (
    <BottomSheetModal ref={sheetRef} onClose={onClose}>
      <Text className="mb-6 text-center font-poppins-bold text-xl">{modalTitle}</Text>

      <View className="gap-4">
        <View>
          <TextInput
            className="w-full rounded-lg border border-neutral-200 bg-[#f3f5f9] p-3 font-poppins-regular text-black"
            placeholder="Add Task Title..."
            placeholderTextColor="gray"
            value={title}
            onChangeText={setTitle}
            autoFocus={mode === 'create'}
          />
        </View>

        <View>
          <TextInput
            className="w-full rounded-lg border border-neutral-200 bg-[#f3f5f9] p-3 font-poppins-regular text-black"
            placeholder="Add Task Description..."
            placeholderTextColor="gray"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />
        </View>

        <View className="mt-6 space-y-3">
          <TouchableOpacity
            onPress={handleSubmit}
            className="flex w-full items-center rounded-xl bg-[#0155B6] p-3">
            <Text className="text-center font-poppins-semibold text-white">
              {buttonText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheetModal>
  );
};

export default TaskModal;