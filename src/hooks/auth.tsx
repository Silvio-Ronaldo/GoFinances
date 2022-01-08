import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

type User = {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

type AuthContextData = {
    user: User;
    signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthorizationResponse {
    params: {
        access_token: string;
    };
    type: string;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User);

    const userCollectionKey = '@gofinances:user';

    async function signInWithGoogle() {
        try {
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
        
            const { type, params } = await AuthSession.startAsync(
                { authUrl }
            ) as AuthorizationResponse;

            if (type === 'success') {
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
                const userInfo = await response.json();
                console.log(userInfo);

                const userLoggedIn = {
                    id: userInfo.id,
                    email: userInfo.email,
                    name: userInfo.given_name,
                    avatar: userInfo.picture,
                }

                setUser(userLoggedIn);
                await AsyncStorage.setItem(userCollectionKey, JSON.stringify(userLoggedIn));
            }
        } catch (error) {
            throw new Error(error as string);
        }
    }

    useEffect(() => {
        async function loadUserStorageData() {
            const userStoraged = await AsyncStorage.getItem(userCollectionKey);

            if (userStoraged) {
                const userLoggedIn = JSON.parse(userStoraged) as User;
                setUser(userLoggedIn);
            }
        }

        loadUserStorageData();
    }, []);

    return (
        <AuthContext.Provider value={{ 
            user, 
            signInWithGoogle 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}