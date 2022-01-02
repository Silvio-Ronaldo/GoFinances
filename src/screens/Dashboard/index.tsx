import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardData } from '../../components/TransactionCard';

import { 
    Container, 
    Header, 
    UserWrapper,
    UserInfo, 
    Photo, 
    User, 
    UserGreeting, 
    UserName,
    LogoutButton,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionsList,
    LoadContainer,
} from './styles';

export interface DataListProps extends TransactionCardData {
    id: string;
}

interface HighlightCardProps {
    total: string;
    lastTransactionDate: string;
}

interface HighlightCardData {
    entries: HighlightCardProps;
    cost: HighlightCardProps;
    sum: HighlightCardProps;
}

export function Dashboard() {
    const [transactionsData, setTransactionsData] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightCardData>({} as HighlightCardData);
    const [isLoading, setIsLoading] = useState(true);

    const theme = useTheme();

    const formatAmount = useCallback((amount) => {
        let amountTotalFormatted = amount.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
        amountTotalFormatted = amountTotalFormatted.replace('R$', 'R$ ');

        return amountTotalFormatted;
    }, []);

    const getLastTransactionDate = useCallback((
        collection: DataListProps[], 
        type: 'up' | 'down',
    ) => {
        const lastTransactionTime = new Date(Math.max.apply(
            Math,
            collection
            .filter((transaction) => transaction.type === type)
            .map((transaction) => new Date(transaction.date).getTime())
        ));

        return `${lastTransactionTime.getDate()} de ${lastTransactionTime.toLocaleString('pt-BR', { month: 'long' })}`;
    }, []);

    const getIntervalBetweenFirstAndLastTransactions = useCallback(
        (collection: DataListProps[]) => {
            const dates = collection.map(
                transaction => new Date(transaction.date).getTime()
            );

            const firstTransaction = new Date(Math.min.apply(Math, dates));
            const lastTransaction = new Date(Math.max.apply(Math, dates));

            const firstTransactionYear = firstTransaction.getFullYear();
            const lastTransactionYear = lastTransaction.getFullYear();

            const firstTransactionFormatted = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: 'short',
            }).format(firstTransaction);

            const lastTransactionFormatted = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: 'short',
            }).format(lastTransaction);

            return firstTransactionYear === lastTransactionYear 
                ? `${firstTransactionFormatted} ~ ${lastTransactionFormatted}`
                : `${firstTransactionFormatted} de ${firstTransactionYear} ~ ${lastTransactionFormatted} de ${lastTransactionYear}`;
    }, [])

    const loadTransactions = useCallback(async () => {
        const collectionKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(collectionKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let costTotal = 0;

        const lastIncomeDate = getLastTransactionDate(transactions, 'up');
        const lastIncome = `Última entrada dia ${lastIncomeDate}`;
        const lastOutcomeDate = getLastTransactionDate(transactions, 'down');
        const lastOutcome = `Última saída dia ${lastOutcomeDate}`;
        const intervalBetweenTransactions = getIntervalBetweenFirstAndLastTransactions(transactions);

        const transactionsFormatted: DataListProps[] = transactions
            .map((transaction: DataListProps) => {
                if (transaction.type === 'up') {
                    entriesTotal += Number(transaction.amount);
                } else {
                    costTotal += Number(transaction.amount);
                }

                const amount = formatAmount(transaction.amount);
                
                const date = Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                }).format(new Date(transaction.date));

                return {
                    id: transaction.id,
                    name: transaction.name,
                    amount,
                    category: transaction.category,
                    type: transaction.type,
                    date,
                }
            });
        setTransactionsData(transactionsFormatted);

        const sumTotal = entriesTotal - costTotal;
        const entriesTotalFormatted = formatAmount(entriesTotal);
        const costTotalFormatted = formatAmount(costTotal);
        const sumTotalFormatted = formatAmount(sumTotal);

        setHighlightData({
            entries: {
                total: entriesTotalFormatted,
                lastTransactionDate: lastIncome,
            },
            cost: {
                total: costTotalFormatted,
                lastTransactionDate: lastOutcome,
            },
            sum: {
                total: sumTotalFormatted,
                lastTransactionDate: intervalBetweenTransactions,
            },
        });
        setIsLoading(false);
    }, []);

    useEffect(() => {
        loadTransactions();
    }, []);

    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, []));

    return (
        <Container>
            { isLoading ? (
                <LoadContainer>
                    <ActivityIndicator 
                        color={theme.colors.primary} 
                        size="large" 
                    />
                </LoadContainer>
            ) : (
                <>
                    <Header>
                        <UserWrapper>
                            <UserInfo>
                                <Photo source={{ uri: 'https://github.com/Silvio-Ronaldo.png' }} />

                                <User>
                                    <UserGreeting>Olá,</UserGreeting>
                                    <UserName>Silvio</UserName>
                                </User>
                            </UserInfo>

                            <LogoutButton onPress={() => {}}>
                                <Icon name="power" />
                            </LogoutButton>
                        </UserWrapper>
                    </Header>

                    <HighlightCards>
                        <HighlightCard 
                            type="up"
                            title="Entradas"
                            amount={highlightData.entries.total}
                            lastTransaction={highlightData.entries.lastTransactionDate}
                        />
                        <HighlightCard 
                            type="down"
                            title="Saídas"
                            amount={highlightData.cost.total}
                            lastTransaction={highlightData.cost.lastTransactionDate}
                        />
                        <HighlightCard 
                            type="total"
                            title="Total"
                            amount={highlightData.sum.total}
                            lastTransaction={highlightData.sum.lastTransactionDate}
                        />
                    </HighlightCards>

                    <Transactions>
                        <Title>Listagem</Title>

                        <TransactionsList 
                            data={transactionsData}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => 
                                <TransactionCard data={item} />}
                        />
                    </Transactions>
                </>)
            }
        </Container>
    );
}