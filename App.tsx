
import './global.css';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { ToastProvider } from 'react-native-toast-notifications';
import { toastConfig } from 'config/toastConfig';
import { ThemeProvider} from 'hooks/useTheme';
import Main from 'Main';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
  });
  // if fonts are not loaded yet will show splash screen until loaded (will do it later)

  {/* List of wrappers here across the entire app */}
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ThemeProvider>
          <ToastProvider {...toastConfig}>
            <Main />
          </ToastProvider>
        </ThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
