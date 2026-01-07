import Checkbox from 'components/ui/Checkbox';
import { useCallback, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, Modal, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useToast } from 'react-native-toast-notifications';
import { useTheme } from 'hooks/useTheme';
import React from 'react';

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
  const toast = useToast();
  const { isDark } = useTheme();
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
          toast.show('Task Deleted Successfully', { type: 'success' });
        },
      },
    ]);
  };

  return (
    <View
      className={`mt-4 rounded-2xl border p-4 shadow-lg ${
        isDark
          ? 'bg-[#1E293B] border-[#374151] shadow-gray-900'
          : 'bg-white border-[#D1D5DB] shadow-gray-200'
      } ${className}`}>
      
      <View className="mb-3 flex-row flex-wrap items-start justify-between">
        <View className="mr-4 flex-1">
          {/* Title */}
          <Text
            className={`font-poppins-semibold text-lg ${
              task?.completed 
                ? `line-through ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`
                : isDark ? 'text-white' : 'text-black'
            }`}>
            {task?.title || `Task ${index + 1}`}
          </Text>
          
          {/* Description */}
          {task?.description && (
            <Text
              className={`mt-1 line-clamp-1 font-poppins-regular ${
                task?.completed
                  ? isDark ? 'text-[#4B5563]' : 'text-[#D1D5DB]'
                  : isDark ? 'text-[#CBD5E1]' : 'text-[#6C757D]'
              }`}>
              {task?.description}
            </Text>
          )}
        </View>

        <View className="flex-row items-center">
          <TouchableOpacity
            ref={ellipsisRef}
            onPress={handleMenuPress}
            className={`rounded-full p-2 ${
              isDark ? 'active:bg-[#374151]/30' : 'active:bg-[#F3F4F6]'
            }`}>
            <FontAwesomeIcon 
              icon={faEllipsisV} 
              size={20} 
              color={isDark ? '#9CA3AF' : '#6B7280'} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className={`flex-row flex-wrap items-center justify-between border-t pt-3 ${
        isDark ? 'border-[#374151]' : 'border-[#F3F4F6]'
      }`}>
        <View className="w-full flex-row flex-wrap items-center">
          <Checkbox
            checked={task?.completed || false}
            onPress={toggleTaskCompletion}
            size={22}
            checkedColor={isDark ? '#60A5FA' : '#0155B6'}
            uncheckedColor={isDark ? '#6B7280' : '#9CA3AF'}
          />
          <Text
            onPress={toggleTaskCompletion}
            className={`ml-3 flex-1 font-poppins-medium ${
              isDark ? 'text-[#CBD5E1]' : 'text-[#6C757D]'
            }`}>
            {task?.completed ? 'Mark as incomplete' : 'Mark as complete'}
          </Text>
        </View>
        {task?.completed && (
          <Text className={`font-poppins-regular text-sm ${
            isDark ? 'text-[#4ADE80]' : 'text-[#22C55E]'
          }`}>
            Completed
          </Text>
        )}
      </View>

      {/* Menu Modal */}
      <Modal
        visible={showMenu}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}>
        <TouchableOpacity
          className={`flex-1 ${isDark ? 'bg-black/50' : 'bg-transparent'}`}
          activeOpacity={1}
          onPress={() => setShowMenu(false)}>
          <View
            className={`absolute min-w-[140px] overflow-hidden rounded-xl border shadow-xl ${
              isDark 
                ? 'bg-[#1E293B] border-[#374151] shadow-black/30'
                : 'bg-white border-[#E5E7EB] shadow-gray-900/15'
            }`}
            style={{
              top: menuPosition.top,
              left: menuPosition.left,
              maxWidth: screenWidth - 32,
              elevation: 8,
            }}>
            
            {/* Edit Option */}
            <TouchableOpacity 
              className={`px-4 py-3 ${
                isDark ? 'active:bg-[#374151]/20' : 'active:bg-[#F9FAFB]/80'
              }`}
              onPress={handleEdit}>
              <Text className={`font-poppins-medium ${
                isDark ? 'text-[#60A5FA]' : 'text-[#0155B6]'
              }`}>
                Edit
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className={`h-px ${
              isDark ? 'bg-[#374151]' : 'bg-[#F3F4F6]'
            }`} />

            {/* Delete Option */}
            <TouchableOpacity 
              className={`px-4 py-3 ${
                isDark ? 'active:bg-[#374151]/20' : 'active:bg-[#F9FAFB]/80'
              }`}
              onPress={handleDelete}>
              <Text className="font-poppins-medium text-[#EF4444]">
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}