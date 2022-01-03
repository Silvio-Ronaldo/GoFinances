import React, { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useFocusEffect } from '@react-navigation/native';

import { Header } from '../../components/Header';
import { HistoryCard } from '../../components/HistoryCard';

import { categories } from '../../utils/categories';

import { 
    Container, 
    Content, 
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    Month,
    ChartContainer,
    LoadContainer,
    EmptyContainer,
    EmptyIcon,
    EmptyText,
} from './styles';

interface TransactionData {
    type: 'up' | 'down';
    amount: string;
    category: string;
    date: string;
}

interface ResumeCardData {
    key: string;
    name: string;
    total: number;
    totalFormatted: string;
    percent: string;
    color: string;
}

export function Resume() {
    const [totalByCategories, setTotalByCategories] = useState<ResumeCardData[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);

    const theme = useTheme();

    const handleSelectedMonth = useCallback((action: 'next' | 'prev') => {
        if (action === 'prev') {
            setSelectedDate(subMonths(selectedDate, 1));
        } else {
            setSelectedDate(addMonths(selectedDate, 1));
        }
    }, [selectedDate]);

    const loadCategoriesCost = useCallback(async () => {
        setIsLoading(true);
        const collectionKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(collectionKey);
        const transactions = response ? JSON.parse(response) : [];

        const outcomes = transactions
            .filter((transaction: TransactionData) => 
                transaction.type === 'down' &&
                new Date(transaction.date).getMonth() === selectedDate.getMonth() &&
                new Date(transaction.date).getFullYear() === selectedDate.getFullYear()
            );

        const totalOutcomes = outcomes.reduce(
            (accumulator: number, outcome: TransactionData) => {
                return accumulator + Number(outcome.amount);
        }, 0);

        const totalByCategory: ResumeCardData[] = [];

        categories.forEach(category => {
            let categorySum = 0;

            outcomes.forEach((outcome: TransactionData) => {
                if (outcome.category === category.key) {
                    categorySum += Number(outcome.amount);
                }
            });

            if (categorySum > 0) {
                let totalFormatted = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                });
                totalFormatted = totalFormatted.replace('R$', 'R$ ');

                const percent = `${((categorySum / totalOutcomes) * 100).toFixed(0)}%`;

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    total: categorySum,
                    totalFormatted,
                    percent,
                    color: category.color,
                });
            }
        });
        setTotalByCategories(totalByCategory);
        setIsLoading(false);
    }, [selectedDate]);

    useFocusEffect(useCallback(() => {
        loadCategoriesCost();
    }, [selectedDate]));

    return (
        <Container>
            <Header title='Custos por categoria' />

            { isLoading ? (
                <LoadContainer>
                    <ActivityIndicator 
                        size="large" 
                        color={theme.colors.primary} 
                    />
                </LoadContainer>
            ) : (
                <Content
                    contentContainerStyle={{ 
                        paddingHorizontal: 24,
                        paddingBottom: useBottomTabBarHeight() + 58,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <MonthSelect>
                        <MonthSelectButton onPress={() => handleSelectedMonth('prev')}>
                            <MonthSelectIcon name="chevron-left" />
                        </MonthSelectButton>

                        <Month>
                            {format(selectedDate, 'MMMM, yyyy', {
                                locale: ptBR,
                            })}
                        </Month>

                        <MonthSelectButton onPress={() => handleSelectedMonth('next')}>
                            <MonthSelectIcon name="chevron-right" />
                        </MonthSelectButton>
                    </MonthSelect>

                    { totalByCategories.length === 0 ? (
                        <EmptyContainer>
                            <EmptyIcon name="check-circle" />
                            <EmptyText>
                                Parabéns! Não há custos para {''}
                                {format(selectedDate, "MMMM 'de' yyyy", {
                                    locale: ptBR,
                                })}.
                            </EmptyText>
                        </EmptyContainer>
                    ) : (
                        <>
                            <ChartContainer>
                                <VictoryPie
                                    data={totalByCategories}
                                    x={(datum) => datum.percent}
                                    y={(datum) => datum.total}
                                    colorScale={totalByCategories.map(category => category.color)}
                                    style={{
                                        labels: {
                                            fontSize: RFValue(18),
                                            fontWeight: 'bold',
                                            fill: theme.colors.shape,
                                        }
                                    }}
                                    labelRadius={75}
                                />
                            </ChartContainer>

                            { totalByCategories.map(item => (
                                <HistoryCard 
                                    key={item.key}
                                    title={item.name}
                                    amount={item.totalFormatted} 
                                    color={item.color}
                                />
                            ))}
                        </>
                    )}
                </Content>
            )}
        </Container>
    );
}