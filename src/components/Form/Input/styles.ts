import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

type ContainerProps = {
    active?: boolean;
}

export const Container = styled(TextInput)<ContainerProps>`
    width: 100%;
    padding: 18px;

    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.text};

    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: 5px;

    margin-bottom: 8px;

    ${({ theme, active }) => active && css`
        border: 3px solid ${theme.colors.attention};
    `}
`;