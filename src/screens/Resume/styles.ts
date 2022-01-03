import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    flex: 1;
`;

export const Content = styled.ScrollView``;

export const MonthSelect = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-top: 24px;
`;

export const MonthSelectButton = styled(BorderlessButton)``;

export const MonthSelectIcon = styled(Feather)`
    font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
`;

export const ChartContainer = styled.View`
    width: 100%;
    align-items: center;
`;

export const LoadContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const EmptyContainer = styled.View`
    height: ${RFPercentage(50)}px;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const EmptyIcon = styled(Feather)`
    font-size: ${RFValue(64)}px;
    color: ${({ theme }) => theme.colors.success};
`;

export const EmptyText = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(20)}px;
    width: 80%;
    text-align: center;
    margin-top: 24px;
    color: ${({ theme }) => theme.colors.textAlternative};
`;