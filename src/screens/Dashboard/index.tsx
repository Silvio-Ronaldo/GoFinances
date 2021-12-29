import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

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
    TransactionsList
} from './styles';

export interface DataListProps extends TransactionCardData {
    id: string;
}

const collectionKey = '@gofinances:transactions';

export function Dashboard() {
    const [data, setData] = useState<DataListProps[]>([]);

    const loadTransactions = useCallback(async () => {
        const response = await AsyncStorage.getItem(collectionKey);
        const transactions = response ? JSON.parse(response) : [];

        const transactionsFormatted: DataListProps[] = transactions
            .map((transaction: DataListProps) => {
                let amount = Number(transaction.amount)
                                .toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                });
                amount = amount.replace('R$', 'R$ ');
                
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

        setData(transactionsFormatted);
    }, []);

    useEffect(() => {
        loadTransactions();
    }, []);

    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, []));

    return (
        <Container>
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
                    amount="R$ 17.770,00"
                    lastTransaction="Última entrada dia 19 de novembro"
                />
                <HighlightCard 
                    type="down"
                    title="Saídas"
                    amount="R$ 3.200,20"
                    lastTransaction="Última saída dia 12 de novembro"
                />
                <HighlightCard 
                    type="total"
                    title="Total"
                    amount="R$ 14.569,80"
                    lastTransaction="01 à 25 de novembro"
                />
            </HighlightCards>

            <Transactions>
                <Title>Listagem</Title>

                <TransactionsList 
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => 
                        <TransactionCard data={item} />}
                />
            </Transactions>
        </Container>
    );
}