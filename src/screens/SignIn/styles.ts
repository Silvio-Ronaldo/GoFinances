import styled from 'styled-components/native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    width: 100%;
    height: 70%;
    background-color: ${({ theme }) => theme.colors.primary};
    justify-content: flex-end;
    align-items: center;
`;

export const Title = styled.Text`
    font-size: ${RFValue(30)}px;
    font-family: ${({ theme }) => theme.fonts.medium};
    color: ${({ theme }) => theme.colors.shape};

    margin-top: ${RFValue(45)}px;
    text-align: center;
`;

export const Description = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.shape};

    margin-top: ${RFValue(42)}px;
    margin-bottom: 67px;
    text-align: center;
`;

export const Footer = styled.View`
    width: 100%;
    height: 30%;
    background-color: ${({ theme }) => theme.colors.secondary};
`;

export const FooterWrapper = styled.View`
    justify-content: space-between;

    margin-top: ${RFPercentage(-4)}px;
    padding: 0 32px;
`;