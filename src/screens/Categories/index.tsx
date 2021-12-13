import React from 'react';
import { FlatList } from 'react-native';

import { categories } from '../../utils/categories';
import { Header } from '../../components/Header';
import { Button } from '../../components/Form/Button';

import { 
    Container, 
    Category, 
    Icon, 
    Name, 
    Separator,
    Footer,
} from './styles';

type Category = {
    key: string;
    name: string;
}

interface CategoriesProps {
    category: string;
    setCategory: (category: Category) => void;
    closeCategories: () => void;
}

export function Categories({
    category,
    setCategory,
    closeCategories,
}: CategoriesProps) {
    return (
        <Container>
            <Header title="Categoria" />

            <FlatList 
                data={categories}
                style={{ flex: 1, width: '100%' }}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <Category>
                        <Icon name={item.icon} />
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />

            <Footer>
                <Button title="Selecionar" />
            </Footer>
        </Container>
    );
}