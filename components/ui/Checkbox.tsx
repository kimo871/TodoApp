import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const Checkbox = ({ 
  checked, 
  onPress, 
  size = 24, 
  checkedColor = '#0155B6', 
  uncheckedColor = '#D1D5DB',
  disabled = false,
  containerStyle,
  checkboxStyle,
  checkmarkStyle
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      className="justify-center items-center"
      style={containerStyle}
    >
      <View
        className="justify-center items-center"
        style={StyleSheet.compose(
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 2,
            borderColor: checked ? checkedColor : uncheckedColor,
            backgroundColor: checked ? checkedColor : 'transparent',
          },
          checkboxStyle
        )}
      >
        {checked && (
          <Text 
            className="text-white font-bold"
            style={StyleSheet.compose(
              { 
                fontSize: size * 0.6,
                includeFontPadding: false,
                textAlignVertical: 'center'
              },
              checkmarkStyle
            )}
          >
            ✓
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Checkbox;