import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

interface ContainerProps {
    type: 'up' | 'down';
    isActive: boolean;
}

interface IconProps {
    type: 'up' | 'down';
}

export const Container = styled.View<ContainerProps>`
    width: 48%;

    border: 1px solid ${({ theme }) => theme.colors.textAlternative};
    border-radius: 5px;

    ${({ isActive, type }) => isActive && type === 'up' && css`
        background-color: ${({ theme }) => theme.colors.successDark};
        border: none;
    `};

    ${({ isActive, type }) => isActive && type === 'down' && css`
        background-color: ${({ theme }) => theme.colors.attentionDark};
        border: none;
    `};
`;

export const Button = styled(RectButton)`
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 16px 36px;
`;

export const Icon = styled(Feather)<IconProps>`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;

    color: ${({ type, theme }) => type === 'up'
                                ? theme.colors.success 
                                : theme.colors.attention};
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;