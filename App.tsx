import { StatusBar } from 'expo-status-bar';

import './global.css';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from 'components/shared/Header';
import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import TaskList from 'components/tasks/TaskList';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useState } from 'react';

const StatusFilters = ['All', 'Active', 'Completed'] as const;

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
  });
  const [gridView, setGridView] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Completed'>('All');
  // if fonts are not loaded yet will show splash screen until loaded (will do it later)
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView className="my-0 flex-1 bg-[#f9f9f9]   py-0">
          <StatusBar backgroundColor="#0155B6" barStyle="light-content" />
          <Header setSearchQuery={setSearchQuery} />
          <View className="flex-1 px-4  py-6 ">
            <View className="flex flex-row justify-between">
              <View>
                <Text className="font-poppins-bold text-2xl">Today's Tasks</Text>
                <Text className="font-poppins-regular text-base text-gray-600">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}
                </Text>
              </View>
              <View>
                <View>
                  <TouchableOpacity
                    className="rounded-xl border-2 border-neutral-300  p-3"
                    onPress={() => {
                      setGridView((gridView) => !gridView);
                    }}>
                    <FontAwesomeIcon icon={faList} color={'black'} size={18} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View className="mt-4 flex-row justify-around rounded-xl bg-gray-100 p-1">
              {StatusFilters.map((status,i) => (
                <TouchableOpacity
                  key={i}
                  className={`flex-1 items-center rounded-lg py-2 ${statusFilter === status ? 'bg-white ' : ''}`}
                  onPress={() => setStatusFilter(status)}>
                  <Text
                    className={`font-poppins-regular ${statusFilter === status ? 'text-[#0155B6]' : 'text-gray-500'}`}>
                    {status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TaskList status={statusFilter} searchQuery={searchQuery} gridView={gridView} />
          </View>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
