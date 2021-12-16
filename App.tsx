import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { 
  useFonts, 
  Poppins_400Regular, 
  Poppins_500Medium, 
  Poppins_700Bold 
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

import theme from './src/global/styles/theme';

import { Dashboard } from './src/screens/Dashboard';
import { Register } from './src/screens/Register';
import { Categories } from './src/screens/Categories';

export default function App() {
  const [ fontsLoaded ] = useFonts({
    Poppins_400Regular, 
    Poppins_500Medium, 
    Poppins_700Bold 
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar 
        translucent 
        backgroundColor={theme.colors.primary} 
        barStyle="light-content" 
      />
      <Register />
    </ThemeProvider>
  )
}
