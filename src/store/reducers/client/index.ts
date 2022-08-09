import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../index';
import { ClientState } from './types';
import { v4 as uuidv4 } from 'uuid';

type initialStateType = {
    ClientList: ClientState[];
};

const ClientList: ClientState[] = [
    {
        id: uuidv4(),
        name: 'Anna',
        city: 'Moscow',
        number: '823312132',
        age: '27'
    },
    {
        id: uuidv4(),
        name: 'Dmitry',
        city: 'Moscow',
        number: '823123',
        age: '18'
    },
    {
        id: uuidv4(),
        name: 'Alexander',
        city: 'Moscow',
        number: '878678',
        age: '21'
    },
];

const initialState: initialStateType = {
    ClientList,
};

export const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        addNewClient: (state, action: PayloadAction<ClientState>) => {
            state.ClientList.push(action.payload);
        },
        updateClient: (state, action: PayloadAction<ClientState>) => {
            const {
                payload: { id, age, number, city, name },
            } = action;

            state.ClientList = state.ClientList.map((client) =>
                client.id === id ? { ...client, name, number, age, city } : client
            );
        },
        deleteClient: (state, action: PayloadAction<{ id: string }>) => {
            state.ClientList = state.ClientList.filter((client) => client.id !== action.payload.id);
        },
    },
});

export const { addNewClient, updateClient, deleteClient } = clientSlice.actions;

export const selectClientList = (state: RootState) => state.client.ClientList;

export default clientSlice.reducer;