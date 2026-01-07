import React, {
  forwardRef,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import {
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { themeColors } from 'config/colors';
import { useTheme } from 'hooks/useTheme';

interface Props {
  children: React.ReactNode;
  onClose?: () => void;
}

const AppBottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ children, onClose }, ref) => {
    const {isDark, theme} = useTheme();
    const snapPoints = useMemo(() => ['60%', '100%'], []);
    const sheetRef = useRef<BottomSheetModal>(null);

    // expose internal ref
    useEffect(() => {
      if (typeof ref === 'function') ref(sheetRef.current);
      else if (ref) ref.current = sheetRef.current;
    }, [ref]);

    useEffect(() => {
      const show = Keyboard.addListener('keyboardDidShow', () => {
        sheetRef.current?.snapToIndex(1);
      });

      const hide = Keyboard.addListener('keyboardDidHide', () => {
        sheetRef.current?.snapToIndex(0);
      });

      return () => {
        show.remove();
        hide.remove();
      };
    }, []);

    const styles = useMemo(() => StyleSheet.create({
      background: {
        backgroundColor: themeColors[theme as keyof typeof themeColors]?.background,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      indicator: {
        backgroundColor: '#e0e0e0',
        width: 40,
        height: 5,
      },
      backdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      content: {
        padding: 24,
        paddingBottom: 80,
      },
    }), [theme]);

    return (
      <BottomSheetModal
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        enablePanDownToClose
        onClose={onClose}
        backgroundStyle={styles.background}
        handleIndicatorStyle={styles.indicator}
        backdropComponent={({ style }) => (
          <TouchableOpacity
            style={[style, styles.backdrop]}
            activeOpacity={1}
            onPress={onClose}
          />
        )}
      >
        <BottomSheetScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

export default AppBottomSheet;
