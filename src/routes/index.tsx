import React from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { useAuth } from '../hooks/auth';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
    const { user, isUserLoaded } = useAuth();

    const theme = useTheme();

    if (!isUserLoaded) {
        return (
            <ActivityIndicator 
                size="large" 
                color={theme.colors.primary} 
            />
        );
    }

    return (
        <NavigationContainer>
            {user.id ? (
                <AppRoutes />
            ): (
                <AuthRoutes />
            )}
        </NavigationContainer>
    );
}