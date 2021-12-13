import React, { useState } from 'react';

import { Header } from '../../components/Header';
import { Input } from '../../components/Form/Input';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../../components/Form/CategorySelect';
import { Button } from '../../components/Form/Button';

import { 
    Container,
    Form,
    Fields,
    TransactionTypes,
} from './styles';

type TransactionType = 'up' | 'down';

export function Register() {
    const [transactionType, setTransactionType] = useState<TransactionType>
                                                    ('' as TransactionType);

    function handleSelectedTransactionButton(type: 'up' | 'down') {
        setTransactionType(type);
    }

    return (
        <Container>
            <Header title="Cadastro" />

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

                    <CategorySelect title="Categoria" />
                </Fields>

                <Button title="Enviar" />
            </Form>
        </Container>
    );
}