import React from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

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
import Apple from '../../assets/apple.svg';

export function SignIn() {
    const { signInWithGoogle } = useAuth();

    async function handleSignInWithGoogle() {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível entrar na conta Google');
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
                    Faça seu login com {'\n'}
                    uma das contas abaixo
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
                        title='Entrar com a Apple'
                        svg={Apple}
                    />
                </FooterWrapper>
            </Footer>
        </Container>
    );
}