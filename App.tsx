import { StatusBar } from 'expo-status-bar';

import './global.css';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from 'components/shared/Header';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
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

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
  });
  // if fonts are not loaded yet will show splash screen until loaded (will do it later)
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <BottomSheetModalProvider>
          <SafeAreaView className="my-0 flex-1 bg-[#f9f9f9]   py-0">
            <StatusBar backgroundColor="#0155B6" barStyle="light-content" />
            <Header />
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
                      onPress={() => {}}>
                      <FontAwesomeIcon icon={faList} color={'black'} size={18} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <TaskList />
            </View>
          </SafeAreaView>
        </BottomSheetModalProvider>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}
