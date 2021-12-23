import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RectButton } from 'react-native-gesture-handler';

interface CategoryProps {
    isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Category = styled.View<CategoryProps>`
    width: 47%;
    height: ${RFValue(150)}px;
    margin: 5px;

    border: 1px solid ${({ theme }) => theme.colors.secondary};
    border-radius: 5px;

    ${({ isActive }) => isActive && css`
        background-color: ${({ theme }) => theme.colors.secondaryDark};
        border: none;
    `}
`;

export const CategoryButton = styled(RectButton)`
    flex: 1;
    align-items: center;
    justify-content: center;

    padding: ${RFValue(15)}px;
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    margin-bottom: 15px;
`;

export const Name = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;

export const Separator = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.text};
    display: none;
`;

export const Footer = styled.View`
    width: 100%;
    padding: 24px;
`;