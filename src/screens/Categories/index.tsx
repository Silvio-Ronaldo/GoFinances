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
    category: Category;
    setCategory: (category: Category) => void;
    closeCategories: () => void;
}

export function Categories({
    category,
    setCategory,
    closeCategories,
}: CategoriesProps) {
    const numCols = 2;

    function handleSelectCategory(item: Category) {
        setCategory(item);
    }

    return (
        <Container>
            <Header title="Categoria" />

            <FlatList 
                data={categories}
                style={{ flex: 1, width: '100%' }}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <Category 
                        onPress={() => handleSelectCategory(item)}
                        isActive={category.key === item.key}
                    >
                        <Icon name={item.icon} />
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
                contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}
                numColumns={numCols}
                key={numCols}
            />

            <Footer>
                <Button 
                    title="Selecionar"
                    onPress={closeCategories}
                />
            </Footer>
        </Container>
    );
}