import React, { FC } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import { useAuth, AuthProvider } from './auth';

jest.mock('expo-auth-session', () => {
    return {
        startAsync: () => {
            return {
                type: 'success',
                params: {
                    access_token: 'google-token',
                }
            }
        },
        makeRedirectUri: () => {
            return 'exp://127.0.0.1:19000/--/redirect'
        },
    }
});

const Providers: FC = ({ children }) => (
    <AuthProvider>
        { children }
    </AuthProvider>
);

describe('Auth Hook', () => {
    it('should be able to sign in with Google account existing', async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({
                id: `userInfo.id`,
                email: `userInfo.email`,
                name: `userInfo.given_name`,
                photo: `userInfo.picture`,
                locale: `userInfo.locale`,
                verified_email: `userInfo.verified_email`,
            })
        })) as jest.Mock;

        const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
            wrapper: Providers
        });

        await waitForNextUpdate();

        await act(() => result.current.signInWithGoogle());

        expect(result.current.user).toBeTruthy();
    });
});