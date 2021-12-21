import React, { useState } from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

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

const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    amount: Yup
        .number()
        .typeError('Informe um valor numérico')
        .positive('O preço não pode ser negativo')
        .required('Preço é obrigatório'),
});

export function Register() {
    const [transactionType, setTransactionType] = useState<TransactionType>
                                                    ('' as TransactionType);
    const [categoriesModalOpen, setCategoriesModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver:  yupResolver(schema),
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

    function handleRegister(formData: FormDataProps) {
        if(!transactionType) {
            return Alert.alert(
                'Transação não encontrada', 
                'Selecione um tipo de transação.',
            );
        }

        if(category.key === 'category') {
            return Alert.alert(
                'Categoria não selecionada',
                'Selecione uma categoria.',
            )
        }
        
        const data = {
            name: formData.name,
            amount: formData.amount,
            transactionType,
            category: category.key
        }

        console.log(data);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header title="Cadastro" />

                <Form>
                    <Fields>
                        <InputForm
                            name='name'
                            control={control}
                            placeholder='Nome da transação'
                            autoCapitalize='sentences'  
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        <InputForm
                            name='amount'
                            control={control}
                            placeholder='Preço'
                            keyboardType='numeric'
                            error={errors.amount && errors.amount.message}
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
                        onPress={handleSubmit(handleRegister)}
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
        </TouchableWithoutFeedback>
    );
}