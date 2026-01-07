import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


// Theme Provider
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemTheme = useColorScheme(); // for knowing if phone on dark mode or not
  const [theme, setTheme] = useState<Theme>(systemTheme === 'dark' ? 'dark' : 'light');

  useEffect(() => {
    loadTheme();
  }, []);

  // getting theme from user storage for persistence
  const loadTheme = async () => {
    try {
      const saved = await AsyncStorage.getItem('@theme');
      if (saved === 'light' || saved === 'dark') {
        setTheme(saved);
      } else {
        setTheme(systemTheme || 'light');
      }
    } catch {
      setTheme(systemTheme || 'light');
    }
  };

  const saveTheme = async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem('@theme', newTheme);
    } catch (error) {
      console.log('Failed to save theme');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveTheme(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === 'dark',
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// theme hook
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used in ThemeProvider');
  return context;
}

