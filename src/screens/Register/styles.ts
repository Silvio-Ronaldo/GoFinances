import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.background};
    flex: 1;
`;

export const Form = styled.View`
    width: 100%;

    padding: 24px;

    justify-content: space-between;
`;

export const Fields = styled.View``;

export const TransactionTypes = styled.View`
    flex-direction: row;
    justify-content: space-between;

    margin-top: 8px;
    margin-bottom: 16px;
`;

export const ButtonContainer = styled.View`
    position: absolute;
    bottom: -200px;
    left: 24px;
    right: 24px;
    width: 100%;
`;