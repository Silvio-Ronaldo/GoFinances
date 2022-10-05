import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as AuthSession from 'expo-auth-session';

const { GOOGLE_CLIENT_ID } = process.env;
const { GITHUB_CLIENT_ID } = process.env;
const { GITHUB_CLIENT_SECRET } = process.env;

type User = {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

type AuthContextData = {
    user: User;
    isUserLoaded: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithGithub: () => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
    children: ReactNode;
}

interface IGoogleAuthorizationResponse {
    params: {
        access_token: string;
    };
    type: string;
}

interface IGithubAuthorizationResponse {
    params: {
      code?: string;
      error?: string;
    };
    type?: string;
};

interface IGithubAccessTokenResponse {
    access_token: string;
}

interface IGithubUserResponse {
    avatar_url: string;
    email: string;
    id: number;
    name: string;
}

type Email = {
    email: string;
    primary: boolean;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User);
    const [isUserLoaded, setIsUserLoaded] = useState(false);

    const userCollectionKey = '@gofinances:user';

    async function signInWithGoogle() {
        try {
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');
            const PROMPT = ['select_account'];
            const GOOGLE_REDIRECT_URI = AuthSession.makeRedirectUri({ useProxy: true });

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&prompt=${PROMPT}`;
        
            const { type, params } = await AuthSession.startAsync(
                { authUrl }
            ) as IGoogleAuthorizationResponse;

            if (type === 'success') {
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
                const userInfo = await response.json();

                const userLoggedIn = {
                    id: userInfo.id,
                    email: userInfo.email,
                    name: userInfo.name,
                    avatar: userInfo.picture,
                }

                setUser(userLoggedIn);
                await AsyncStorage.setItem(userCollectionKey, JSON.stringify(userLoggedIn));
            }
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async function signInWithGithub() {
        try {
            const SCOPE = 'user:email';

            const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=${SCOPE}`;
            const tokenUrl = 'https://github.com/login/oauth/access_token';
            const userApiUrl = 'https://api.github.com/user';
            const emailApiUrl = 'https://api.github.com/user/emails';
            
            // Pegando o código de autorização
            const authResponse = await AuthSession.startAsync({
                authUrl,
            }) as IGithubAuthorizationResponse;

            if (
                authResponse.type === 'success' &&
                authResponse.params.error !== 'access_denied'
            ) {
                const code = authResponse.params.code;

                // Pegando o token de acesso
                const { data } = await axios.post<IGithubAccessTokenResponse>(
                    tokenUrl, 
                    null, 
                    {
                        params: {
                            client_id: GITHUB_CLIENT_ID,
                            client_secret: GITHUB_CLIENT_SECRET,
                            code,
                        },
                        headers: {
                            Accept: 'application/json',
                        },
                    }
                );

                // Pegando os dados do usuário
                const userResponse = await axios.get<IGithubUserResponse>(
                    userApiUrl,
                    {
                        headers: {
                            authorization: `Bearer ${data.access_token}`,
                        },
                    },
                );
                
                const emailResponse = await axios.get(
                    emailApiUrl,
                    {
                        headers: {
                            authorization: `Bearer ${data.access_token}`,
                        },
                    },
                );

                const emails = emailResponse.data;
                const { email } = emails.filter((e: Email) => e.primary)[0];                

                const { id, name, avatar_url } = userResponse.data;

                const userLoggedIn = {
                    id: String(id),
                    name,
                    email,
                    avatar: avatar_url,
                };

                setUser(userLoggedIn);
                await AsyncStorage.setItem(userCollectionKey, JSON.stringify(userLoggedIn));
            }
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async function signOut() {
        setUser({} as User);
        await AsyncStorage.removeItem(userCollectionKey);
    }

    useEffect(() => {
        async function loadUserStorageData() {
            const userStoraged = await AsyncStorage.getItem(userCollectionKey);

            if (userStoraged) {
                const userLoggedIn = JSON.parse(userStoraged) as User;
                setUser(userLoggedIn);
            }

            setIsUserLoaded(true);
        }

        loadUserStorageData();
    }, []);

    return (
        <AuthContext.Provider value={{ 
            user, 
            isUserLoaded,
            signInWithGoogle,
            signInWithGithub,
            signOut,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}