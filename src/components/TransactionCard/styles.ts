import styled from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from "react-native-gesture-handler";

interface TypeProps {
    type: 'up' | 'down';
}

export const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.shape};

    padding: 17px 24px;
    border-radius: 5px;
    margin-bottom: 16px;
    position: relative;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;

export const Amount = styled.Text<TypeProps>`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(20)}px;

    color: ${({ theme, type }) => 
        type === 'up' ? theme.colors.success : theme.colors.attention};
    
    margin-top: 2px;
`;
 
export const Footer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-top: 19px;
`;

export const Category = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;

    color: ${({ theme }) => theme.colors.textAlternative};
`;

export const CategoryName = styled.Text`
    font-size: ${RFValue(14)}px;

    color: ${({ theme }) => theme.colors.textAlternative};

    margin-left: 17px;
`;

export const Date = styled.Text`
    font-size: ${RFValue(14)}px;
    
    color: ${({ theme }) => theme.colors.textAlternative};
`;