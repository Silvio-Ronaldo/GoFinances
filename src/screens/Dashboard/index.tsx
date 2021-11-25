import React from 'react';

import { HighlightCard } from '../../components/HighlightCard';

import { 
    Container, 
    Header, 
    UserWrapper,
    UserInfo, 
    Photo, 
    User, 
    UserGreeting, 
    UserName,
    Icon,
    HighlightCards
} from './styles';

export function Dashboard() {
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

                    <Icon name="power" />
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
        </Container>
    );
}