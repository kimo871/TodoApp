import React, { forwardRef, useMemo } from 'react';
import {
  BottomSheetModal as GorhomBottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { TouchableOpacity, StyleSheet } from 'react-native';

interface BottomSheetModalProps {
  children: React.ReactNode;
  snapPoints?: (string | number)[];
  onClose?: () => void;
  enablePanDownToClose?: boolean;
}

const BottomSheetModal = forwardRef<any, BottomSheetModalProps>(
  ({ children, snapPoints = ['80%', '90%'], onClose, enablePanDownToClose = true }, ref) => {
    const defaultSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    const handleBackdropPress = () => {
      onClose?.();
    };

    return (
      <GorhomBottomSheetModal
        ref={ref}
        index={0}
        snapPoints={defaultSnapPoints}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.indicator}
        enablePanDownToClose={enablePanDownToClose}
        onClose={onClose}
        backdropComponent={({ style }) => (
          <TouchableOpacity
            style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}
            activeOpacity={1}
            onPress={handleBackdropPress}
          />
        )}>
        <BottomSheetView className="p-6 pb-20">{children}</BottomSheetView>
      </GorhomBottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  indicator: {
    backgroundColor: '#e0e0e0',
    width: 40,
    height: 5,
  },
});

export default BottomSheetModal;