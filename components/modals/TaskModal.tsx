import BottomSheetModal from 'components/shared/BottomSheetModal';
import { useTheme } from 'hooks/useTheme';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

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
  initialData,
}: TaskModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const toast = useToast();
  const { isDark } = useTheme();

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
      toast.show(`Task ${mode === 'create' ? 'Created' : 'Updated'} Successfully`, {
        type: 'success',
      });
    }
  };

  const modalTitle = mode === 'create' ? 'Create New Task' : 'Edit Task';
  const buttonText = mode === 'create' ? 'Create Task' : 'Save Changes';

  return (
    <BottomSheetModal ref={sheetRef} onClose={onClose}>
      <Text
        className={`mb-6 text-center font-poppins-bold text-xl ${
          isDark ? 'text-white' : 'text-black'
        }`}>
        {modalTitle}
      </Text>

      <View className="gap-4">
        <View>
          <TextInput
            className={`w-full rounded-lg border p-3 font-poppins-regular ${
              isDark
                ? 'border-[#475569] bg-[#334155] text-white'
                : 'border-[#DEE2E6] bg-[#f3f5f9] text-black'
            }`}
            placeholder="Add Task Title..."
            placeholderTextColor={isDark ? '#94A3B8' : '#6C757D'}
            value={title}
            onChangeText={setTitle}
            autoFocus={mode === 'create'}
          />
        </View>

        <View>
           <TextInput
            className={`w-full rounded-lg border p-3 font-poppins-regular ${
              isDark 
                ? 'border-[#475569] bg-[#334155] text-white' 
                : 'border-[#DEE2E6] bg-[#f3f5f9] text-black'
            }`}
            placeholder="Add Task Description..."
            placeholderTextColor={isDark ? '#94A3B8' : '#6C757D'}
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
            <Text className="text-center font-poppins-semibold text-white">{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheetModal>
  );
};

export default TaskModal;
