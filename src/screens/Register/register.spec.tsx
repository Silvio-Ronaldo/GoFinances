import React, { FC } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { Register } from '.';
import theme from '../../global/styles/theme';

jest.mock('@react-navigation/native', () => {
    return {
        useNavigation: () => {
            return {
                navigate: jest.fn()
            }
        },
    }
});

jest.mock('../../hooks/auth', () => {
    return {
        useAuth: () => ({ user: { id: 'any-id' } }),
    }
});

const Providers: FC = ({ children }) => (
    <ThemeProvider theme={theme}>
        { children }
    </ThemeProvider>
);

describe('Register Screen', () => {
    it('should be able to open modal when user click in category button', async () => {
        const { getByTestId } = render(
            <Register />,
            {
                wrapper: Providers,
            }
        );

        const modalCategory = getByTestId('modal-category');
        const buttonCategory = getByTestId('button-category');

        fireEvent.press(buttonCategory);

        await waitFor(() => {
            expect(modalCategory.props.visible).toBeTruthy();
        });
    });
});