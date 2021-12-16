import React, { useState } from 'react';
import { Modal } from 'react-native';
import { useForm } from 'react-hook-form';

import { Header } from '../../components/Header';
import { InputForm } from '../../components/Form/InputForm';
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

interface FormDataProps {
    name: string;
    amount: string;
}

export function Register() {
    const [transactionType, setTransactionType] = useState<TransactionType>
                                                    ('' as TransactionType);
    const [categoriesModalOpen, setCategoriesModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    const { control, handleSubmit } = useForm();

    function handleSelectedTransactionButton(type: 'up' | 'down') {
        setTransactionType(type);
    }

    function handleOpenCategoriesModal() {
        setCategoriesModalOpen(true);
    }

    function handleCloseCategoriesModal() {
        setCategoriesModalOpen(false);
    }

    function handleFormSubmit(formData: FormDataProps) {
        const data = {
            name: formData.name,
            amount: formData.amount,
            transactionType,
            category: category.key
        }

        // enviar os dados
    }

    return (
        <Container>
            <Header title="Cadastro" />

            <Form>
                <Fields>
                    <InputForm
                        name="name"
                        control={control}
                        placeholder="Nome"
                    />
                    <InputForm
                        name="amount"
                        control={control}
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

                <Button 
                    title="Enviar" 
                    onPress={handleSubmit(handleFormSubmit)}
                />
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