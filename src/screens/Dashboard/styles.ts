import styled from 'styled-components/native';
import { ComponentType } from 'react';
import { FlatList } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFPercentage(42)}px;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;

    background-color: ${({ theme }) => theme.colors.primary};
`;

export const UserWrapper = styled.View`
    width: 100%;
    padding: 0 24px;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-top: ${getStatusBarHeight() + RFValue(28)}px;
`;

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Photo = styled.Image`
    width: ${RFValue(55)}px;
    height: ${RFValue(55)}px;
    border-radius: 10px;
`;

export const User = styled.View`
    margin-left: 17px;
`;

export const UserGreeting = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
`;

export const UserName = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.bold};
`;

export const LogoutButton = styled(BorderlessButton)``;

export const Icon = styled(Feather)`
    font-size: ${RFValue(24)}px;
    color: ${({ theme }) => theme.colors.secondary};
`;

export const HighlightCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingLeft: 24 }
})`
    width: 100%;

    position: absolute;
    margin-top: ${RFPercentage(25)}px;
`;

export const Transactions = styled.View`
    flex: 1;

    padding: 0 24px;
    margin-top: ${RFPercentage(20)}px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;

    margin-bottom: 16px;
`;

export const TransactionsList = styled(FlatList).attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: { marginBottom: getBottomSpace() }
})`` as ComponentType as new <DataListProps>() => FlatList<DataListProps>;

export const LoadContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const EmptyContainer = styled.View`
    margin-top: 100px;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const EmptyIcon = styled(Feather)`
    font-size: ${RFValue(64)}px;
    color: ${({ theme }) => theme.colors.textAlternative};
`;

export const EmptyText = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(20)}px;
    width: 80%;
    text-align: center;
    margin-top: 24px;
    color: ${({ theme }) => theme.colors.textAlternative};
`;