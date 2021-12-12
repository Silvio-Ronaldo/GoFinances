import React, { useState } from 'react';

import { Input } from '../../components/Form/Input';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { Button } from '../../components/Form/Button';

import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes,
} from './styles';

export function Register() {
    const [transactionType, setTransactionType] = useState('');

    function handleSelectedTransactionButton(type: 'up' | 'down') {
        setTransactionType(type);
    }

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <Input 
                        placeholder="Nome"
                    />
                    <Input 
                        placeholder="Preço"
                    />

                    <TransactionTypes>
                        <TransactionTypeButton 
                            type="up" 
                            title="Entrada" 
                            onPress={() => handleSelectedTransactionButton('up')}
                            isActive={transactionType === 'up'}
                        />
                        <TransactionTypeButton 
                            type="down" 
                            title="Saída" 
                            onPress={() => handleSelectedTransactionButton('down')}
                            isActive={transactionType === 'down'}
                        />
                    </TransactionTypes>
                </Fields>

                <Button title="Enviar" />
            </Form>
        </Container>
    );
}