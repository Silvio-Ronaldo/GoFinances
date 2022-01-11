import React, { useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import { SocialSignInButton } from '../../components/SocialSignInButton';

import { useAuth } from '../../hooks/auth';

import { 
    Container,
    Header,
    Title,
    Description,
    Footer,
    FooterWrapper,
} from './styles';

import Logo from '../../assets/logo.svg';
import Google from '../../assets/google.svg';
import Github from '../../assets/github.svg';

export function SignIn() {
    const [isLoading, setIsLoading] = useState(false);

    const theme = useTheme();
    const { signInWithGoogle, signInWithGithub } = useAuth();

    async function handleSignInWithGoogle() {
        try {
            setIsLoading(true);
            return await signInWithGoogle();
        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível entrar na conta Google');
            setIsLoading(false);
        }
    }

    async function handleSignInWithGithub() {
        try {
            setIsLoading(true);
            return await signInWithGithub();
        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível entrar na conta do Github');
            setIsLoading(false);
        }
    }

    return (
        <Container>
            <Header>
                <Logo width={RFValue(120)} height={RFValue(68)} />

                <Title>
                    Controle suas {'\n'}
                    finanças de forma {'\n'}
                    muito simples
                </Title>

                <Description>
                    Faça seu login com uma {'\n'}
                    das contas abaixo
                </Description>
            </Header>

            <Footer>
                <FooterWrapper>
                    <SocialSignInButton 
                        title='Entrar com o Google' 
                        svg={Google} 
                        onPress={handleSignInWithGoogle}
                    />

                    <SocialSignInButton 
                        title='Entrar com o Github' 
                        svg={Github} 
                        onPress={handleSignInWithGithub}
                    />
                </FooterWrapper>

                { isLoading && (
                    <ActivityIndicator 
                        color={theme.colors.shape} 
                        style={{ marginTop: 18 }}
                    />
                )}
            </Footer>
        </Container>
    );
}