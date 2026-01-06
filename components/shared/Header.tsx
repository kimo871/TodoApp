import React from 'react';
import { View, Text, Image, Pressable, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMoon} from '@fortawesome/free-solid-svg-icons';
import LOGO from '../../assets/logo.png';
export default function Header() {
  return (
    <View className=" rounded-b-3xl bg-[#0155B6] px-4  py-6 ">
      <View className="flex flex-row justify-between">
        <View className="flex flex-row items-center gap-3 flex-1 ">
          <Image className="size-12 " source={LOGO} resizeMode="cover" />
          <View className="">
            <Text className="font-poppins-semibold text-xl text-white">QuickNote</Text>
          </View>
        </View>
        <View className="flex flex-row items-center ">
          <Pressable
            className="rounded-full border border-gray-200 bg-gray-100 p-2"
            onPress={() => {}}>
            <FontAwesomeIcon icon={faMoon} size={15} color={'black'} />
          </Pressable>
        </View>
      </View>
      <View className="flex flex-row justify-between items-center">
        <View className='flex-1'>
          <TextInput
            className="font-poppins-regular mt-4 w-full rounded-lg bg-[#01489b] p-3 text-white"
            placeholder="Search Tasks..."
            placeholderTextColor="white"
          />
        </View>
      </View>
    </View>
  );
}
