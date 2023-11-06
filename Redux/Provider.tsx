'use client';

import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

interface IChildren {
    children?: ReactNode
}

export function ReduxProviders({ children }: IChildren) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}