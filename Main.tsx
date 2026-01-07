import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from 'components/shared/Header';
import { View, Text, TouchableOpacity } from 'react-native';
import { faList } from '@fortawesome/free-solid-svg-icons';
import TaskList from 'components/tasks/TaskList';
import { useTheme } from 'hooks/useTheme';
import { themeColors } from 'config/colors';
import { useState } from 'react';
import React from 'react';

const StatusFilters = ['All', 'Active', 'Completed'] as const;

export default function () {
  const { theme, toggleTheme, isDark } = useTheme();
  const [gridView, setGridView] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Completed'>('All');
  return (
    <SafeAreaView
      className={`my-0 flex-1 py-0`}
      style={{
        backgroundColor: themeColors[theme as keyof typeof themeColors]?.background,
      }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <Header theme={theme} toggleTheme={toggleTheme} setSearchQuery={setSearchQuery} />
      <View className="flex-1 px-4  py-6 ">
        <View className="flex flex-row justify-between">
          <View>
            <Text
              style={{ fontSize: 18 }}
              className={`font-poppins-bold text-2xl text-${themeColors[theme]?.textPrimary}`}>
              Today's Tasks
            </Text>
            <Text
              className={`font-poppins-regular text-base text-gray-600 text-[${themeColors[theme]?.gray600}]`}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </Text>
          </View>
          {/* Grid/ListView Toggle */}
          <View>
            <View>
              <TouchableOpacity
                className="rounded-xl border-2 border-neutral-300  p-3"
                onPress={() => {
                  setGridView((gridView) => !gridView);
                }}>
                <FontAwesomeIcon icon={faList} color={themeColors[theme]?.textPrimary} size={18} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Filter Tabs */}
        <View
          className={`mt-4 flex-row justify-around rounded-xl p-1 ${
            isDark ? 'border border-[#374151] bg-[#1F2937]' : 'border border-gray-200 bg-gray-100'
          }`}>
          {StatusFilters.map((status, i) => (
            <TouchableOpacity
              key={i}
              style={{ paddingVertical: 5 }}
              className={`flex-1 items-center rounded-lg ${
                statusFilter === status ? (isDark ? 'bg-[#374151]' : 'bg-white') : ''
              }`}
              onPress={() => setStatusFilter(status)}>
              <Text
                className={`font-poppins-regular ${
                  statusFilter === status
                    ? isDark
                      ? 'text-[#60A5FA]'
                      : 'text-[#0155B6]'
                    : isDark
                      ? 'text-[#9CA3AF]'
                      : 'text-[#6B7280]'
                }`}>
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Listing Tasks */}
        <TaskList status={statusFilter} searchQuery={searchQuery} gridView={gridView} />
      </View>
    </SafeAreaView>
  );
}
