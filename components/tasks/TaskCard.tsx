import Checkbox from 'components/ui/Checkbox';
import { useCallback, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, Modal, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

interface TaskCardProps {
  task: {
    title: string;
    description: string;
    completed?: boolean;
  };
  index: number;
  setTasks: any;
  onEdit: (task: any, index: number) => void;
  className?: string;
}

export default function TaskCard({ task, index, setTasks, onEdit, className }: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const ellipsisRef = useRef<TouchableOpacity>(null);
  const { width: screenWidth } = Dimensions.get('window');

  const toggleTaskCompletion = useCallback(() => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      if (updatedTasks[index]) {
        updatedTasks[index] = {
          ...updatedTasks[index],
          completed: !(updatedTasks[index]?.completed || false),
        };
      }
      return updatedTasks;
    });
  }, [index, setTasks]);

  const handleMenuPress = () => {
    ellipsisRef.current?.measureInWindow((x, y, width, height) => {
      const menuTop = y + height + 8;
      const menuLeft = Math.min(x - 100, screenWidth - 160);
      setMenuPosition({ top: menuTop, left: menuLeft });
      setShowMenu(true);
    });
  };

  const handleEdit = () => {
    setShowMenu(false);
    onEdit(task, index);
  };

  const handleDelete = () => {
    setShowMenu(false);
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setTasks((prevTasks) => {
            return prevTasks.filter((_, i) => i !== index);
          });
        },
      },
    ]);
  };

  return (
    <View
      className={`mt-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-lg shadow-gray-200 ${className}`}>
      <View className="mb-3 flex-row flex-wrap items-start justify-between">
        <View className="mr-4 flex-1">
          <Text
            className={`font-poppins-semibold text-lg ${task?.completed ? 'text-gray-400 line-through' : 'text-black'}`}>
            {task?.title || `Task ${index + 1}`}
          </Text>
          {task?.description && (
            <Text
              className={`mt-1 line-clamp-1 font-poppins-regular ${task?.completed ? 'text-gray-300' : 'text-gray-600'}`}>
              {task?.description}
            </Text>
          )}
        </View>

        <View className="flex-row items-center">
          <TouchableOpacity
            ref={ellipsisRef}
            onPress={handleMenuPress}
            className="rounded-full p-2 active:bg-gray-100">
            <FontAwesomeIcon icon={faEllipsisV} size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row flex-wrap items-center justify-between border-t border-gray-100 pt-3">
        <View className="w-full flex-row flex-wrap items-center">
          <Checkbox
            checked={task?.completed || false}
            onPress={toggleTaskCompletion}
            size={22}
            checkedColor="#0155B6"
            uncheckedColor="#9CA3AF"
          />
          <Text
            onPress={toggleTaskCompletion}
            className="ml-3 flex-1 font-poppins-medium text-gray-700">
            {task?.completed ? 'Mark as incomplete' : 'Mark as complete'}
          </Text>
        </View>
        {task?.completed && (
          <Text className="font-poppins-regular text-sm text-green-600 ">Completed</Text>
        )}
      </View>

      {/* Menu Modal */}
      <Modal
        visible={showMenu}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}>
        <TouchableOpacity
          className="flex-1 bg-transparent"
          activeOpacity={1}
          onPress={() => setShowMenu(false)}>
          <View
            className="absolute min-w-[140px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl"
            style={{
              top: menuPosition.top,
              left: menuPosition.left,
              maxWidth: screenWidth - 32,
              elevation: 8,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
            }}>
            <TouchableOpacity className="px-4 py-3 active:bg-gray-50" onPress={handleEdit}>
              <Text className="font-poppins-medium text-blue-600">Edit</Text>
            </TouchableOpacity>

            <View className="h-px bg-gray-100" />

            <TouchableOpacity className="px-4 py-3 active:bg-gray-50" onPress={handleDelete}>
              <Text className="font-poppins-medium text-red-600">Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
