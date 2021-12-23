import React from 'react';

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

export function Dashboard() {
    const data: DataListProps[] = [
    {
        id: '1',
        type: 'positive',
        title: 'Desenvolvimento de Site',
        amount: 'R$ 7.500,00',
        category: {
            name: 'Vendas',
            icon: 'dollar-sign',
        },
        date: '25/11/2021',
    },
    {
        id: '2',
        type: 'negative',
        title: 'Livros na Amazon',
        amount: 'R$ 2.315,00',
        category: {
            name: 'Compras',
            icon: 'shopping-bag',
        },
        date: '25/11/2021',
    },
    {
        id: '3',
        type: 'negative',
        title: 'Pastel de carne com caldo de cana',
        amount: 'R$ 70,00',
        category: {
            name: 'Alimentação',
            icon: 'coffee',
        },
        date: '25/11/2021',
    }
    ];

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