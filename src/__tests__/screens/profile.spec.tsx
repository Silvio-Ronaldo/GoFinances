import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

describe('Profile Screen', () => {
    it('check if show correctly user name input placeholder', () => {
        // Renderiza um componente e retorna propriedades sobre sua renderização
        const { getByPlaceholderText } = render(<Profile />);

        // Captura um input que tenha placeholder 'Nome'
        const inputName = getByPlaceholderText('Nome');

        // Verifica se tal placeholder existe
        expect(inputName.props.placeholder).toBeTruthy();
    });

    it('check if user data has been loaded', () => {
        const { getByTestId } = render(<Profile />);

        const inputName = getByTestId('input-name');
        const inputSurname = getByTestId('input-surname');

        expect(inputName.props.value).toEqual('Silvio');
        expect(inputSurname.props.value).toEqual('Ronaldo');
    });

    it('check if render correctly title text', () => {
        const { getByTestId } = render(<Profile />);

        const textTitle = getByTestId('text-title');

        expect(textTitle.props.children).toContain('Perfil'); // toEqual também serve
    });
});