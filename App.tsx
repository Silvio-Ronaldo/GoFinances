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
import { NavigationContainer } from '@react-navigation/native';

import theme from './src/global/styles/theme';

import { AuthProvider } from './src/hooks/auth';

import { AppRoutes } from './src/routes/app.routes';

import { SignIn } from './src/screens/SignIn';

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
      <NavigationContainer>
        <StatusBar 
          translucent 
          backgroundColor={theme.colors.primary} 
          barStyle="light-content" 
        />

        <AuthProvider>
          <SignIn />
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  )
}
