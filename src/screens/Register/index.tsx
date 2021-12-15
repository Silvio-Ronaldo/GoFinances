import React, { useState } from 'react';
import { Modal } from 'react-native';

import { Header } from '../../components/Header';
import { Input } from '../../components/Form/Input';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../../components/Form/CategorySelect';
import { Button } from '../../components/Form/Button';
import { Categories } from '../Categories';

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
    const [categoriesModalOpen, setCategoriesModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    function handleSelectedTransactionButton(type: 'up' | 'down') {
        setTransactionType(type);
    }

    function handleOpenCategoriesModal() {
        setCategoriesModalOpen(true);
    }

    function handleCloseCategoriesModal() {
        setCategoriesModalOpen(false);
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

                    <CategorySelect 
                        title={category.name}
                        onPress={handleOpenCategoriesModal}
                    />
                </Fields>

                <Button title="Enviar" />
            </Form>

            <Modal 
                visible={categoriesModalOpen}
                statusBarTranslucent
            >
                <Categories 
                    category={category}
                    setCategory={setCategory}
                    closeCategories={handleCloseCategoriesModal}
                />
            </Modal>
        </Container>
    );
}