import React, { useState, useCallback } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { useAuth } from '../../hooks/auth';

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
    EmptyContainer,
    EmptyIcon,
    EmptyText,
    RemoveButton,
    RemoveIcon,
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
    const [highlightData, setHighlightData] = useState<HighlightCardData>({
        entries: {
            total: 'R$ 0,00',
            lastTransactionDate: 'Nenhuma entrada',
        },
        cost: {
            total: 'R$ 0,00',
            lastTransactionDate: 'Nenhuma saída',
        },
        sum: {
            total: 'R$ 0,00',
            lastTransactionDate: 'Não há transações'
        }
    } as HighlightCardData);
    const [isLoading, setIsLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(true);

    const theme = useTheme();
    const { user, signOut } = useAuth();

    function formatAmount(amount: number) {
        let amountTotalFormatted = amount.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
        amountTotalFormatted = amountTotalFormatted.replace('R$', 'R$ ');

        return amountTotalFormatted;
    };

    function getLastTransactionDate(
        collection: DataListProps[], 
        type: 'up' | 'down',
    ) {
        const lastTransactionTime = new Date(Math.max.apply(
            Math,
            collection
            .filter((transaction) => transaction.type === type)
            .map((transaction) => new Date(transaction.date).getTime())
        ));

        if (!lastTransactionTime.getDate()) {
            return undefined;
        }

        return `${lastTransactionTime.getDate()} de ${lastTransactionTime.toLocaleString('pt-BR', { month: 'long' })}`;
    };

    function getIntervalBetweenFirstAndLastTransactions(
        collection: DataListProps[]
    ) {
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
    };

    async function loadTransactions() {
        const collectionKey = `@gofinances:transactions_user:${user.id}`;
        const response = await AsyncStorage.getItem(collectionKey);

        if (response) {
            try {
                setIsEmpty(false);
                const transactions = JSON.parse(response);

                let entriesTotal = 0;
                let costTotal = 0;

                const lastIncomeDate = getLastTransactionDate(transactions, 'up');
                const lastIncome = lastIncomeDate 
                    ? `Última entrada dia ${lastIncomeDate}`
                    : 'Não há entradas';
                const lastOutcomeDate = getLastTransactionDate(transactions, 'down');
                const lastOutcome = lastOutcomeDate 
                    ? `Última saída dia ${lastOutcomeDate}` 
                    : 'Não há saídas';
                const intervalBetweenTransactions = getIntervalBetweenFirstAndLastTransactions(transactions);

                const transactionsFormatted: DataListProps[] = transactions
                    .map((transaction: DataListProps) => {
                        if (transaction.type === 'up') {
                            entriesTotal += Number(transaction.amount);
                        } else {
                            costTotal += Number(transaction.amount);
                        }

                        const amountFormatted = Number(transaction.amount);
                        const amount = formatAmount(amountFormatted);
                        
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
            } catch (error) {
                console.log(error);
                Alert.alert('Não foi possível carregar as transações');
            }
        }
        setIsLoading(false);
    };

    async function handleConfirmRemoveTransaction(id: string) {
        setIsLoading(true);
        const collectionKey = `@gofinances:transactions_user:${user.id}`;

        const response = await AsyncStorage.getItem(collectionKey);
        const transactions = response ? JSON.parse(response) : [];

        const transactionsFiltered = transactions.filter(
            (transaction: DataListProps) => transaction.id !== id
        );

        if (transactionsFiltered.length === 0) {
            setTransactionsData([] as DataListProps[]);
            await AsyncStorage.removeItem(collectionKey);
            setIsEmpty(true);
            setHighlightData({
                entries: {
                    total: 'R$ 0,00',
                    lastTransactionDate: 'Nenhuma entrada',
                },
                cost: {
                    total: 'R$ 0,00',
                    lastTransactionDate: 'Nenhuma saída',
                },
                sum: {
                    total: 'R$ 0,00',
                    lastTransactionDate: 'Não há transações'
                }
            } as HighlightCardData);
        } else {
            setTransactionsData(transactionsFiltered);
            await AsyncStorage.setItem(collectionKey, JSON.stringify(transactionsFiltered));
        }
        await loadTransactions();

        return;
    };

    async function handleRemoveTransaction(id: string, name: string) {
        Alert.alert(
            'Excluir transação', 
            `Tem certeza que deseja excluir a transação: '${name}' ?`,
            [
                {
                    text: 'Não',
                    onPress: () => {},
                    style: 'cancel',
                },
                {
                    text: 'Sim',
                    onPress: async () => handleConfirmRemoveTransaction(id),
                }    
            ],
            {
                cancelable: true,
            }
        );
        setIsLoading(false);
    };

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
                                <Photo source={{ uri: user.avatar }} />

                                <User>
                                    <UserGreeting>Olá,</UserGreeting>
                                    <UserName>{user.name}</UserName>
                                </User>
                            </UserInfo>

                            <LogoutButton onPress={signOut}>
                                <Icon name="power" />
                            </LogoutButton>
                        </UserWrapper>
                    </Header>

                    <HighlightCards>
                        <HighlightCard 
                            type="up"
                            title="Entradas"
                            amount={highlightData?.entries?.total}
                            lastTransaction={highlightData?.entries?.lastTransactionDate}
                        />
                        <HighlightCard 
                            type="down"
                            title="Saídas"
                            amount={highlightData?.cost?.total}
                            lastTransaction={highlightData?.cost?.lastTransactionDate}
                        />
                        <HighlightCard 
                            type="total"
                            title="Total"
                            amount={highlightData?.sum?.total}
                            lastTransaction={highlightData?.sum?.lastTransactionDate}
                        />
                    </HighlightCards>

                    { !isEmpty ? (
                        <Transactions>
                            <Title>Listagem</Title>

                            <TransactionsList 
                                data={transactionsData}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => 
                                    <TransactionCard data={item}>
                                        <RemoveButton onPress={
                                            () => handleRemoveTransaction(
                                                item.id, 
                                                item.name
                                            )
                                        }>
                                            <RemoveIcon name="x" />
                                        </RemoveButton>
                                    </TransactionCard>
                                }
                            />
                        </Transactions>
                    ) : (
                        <EmptyContainer>
                            <EmptyIcon name="meh" />
                            <EmptyText>Ops! Nenhuma transação adicionada.</EmptyText>
                        </EmptyContainer>
                    )}
                </>)
            }
        </Container>
    );
}