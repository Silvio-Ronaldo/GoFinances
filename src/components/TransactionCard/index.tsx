import React, { ReactNode } from 'react';

import { categories } from '../../utils/categories';

import { 
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date,
} from './styles';

export interface TransactionCardData {
    type: 'up' | 'down';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface TransactionCardProps {
    data: TransactionCardData;
    children: ReactNode;
}

export function TransactionCard({ data, children }: TransactionCardProps) {
    const category = categories.filter(item => item.key === data.category)[0];

    return (
        <Container>
            <Title>{data.name}</Title>
            <Amount type={data.type}>
                { data.type === 'down' && '- '}
                { data.amount }
            </Amount>

            <Footer>
                <Category>
                    <Icon name={category.icon} />
                    <CategoryName>{category.name}</CategoryName>
                </Category>
                <Date>{data.date}</Date>
            </Footer>

            {children}
        </Container>
    );
}