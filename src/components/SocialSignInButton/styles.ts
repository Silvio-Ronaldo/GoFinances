import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Button = styled(RectButton)`
    height: ${RFValue(56)}px;
    background-color: ${({ theme }) => theme.colors.shape};

    border-radius: 5px;
    flex-direction: row;
    align-items: center;

    margin-bottom: 16px;
`;

export const LogoContainer = styled.View`
    height: 100%;
    padding: ${RFValue(16)}px;
    justify-content: center;
    align-items: center;
    
    border-color: ${({ theme }) => theme.colors.background};
    border-right-width: 1px;
`;

export const ButtonText = styled.Text`
    flex: 1;
    text-align: center;
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;
`;