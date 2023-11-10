'use client'

import React from 'react';
import { ReduxProviders } from '../../Redux/Provider';
import { NextAuthProvider } from '../nextAuthProvider';

type Props = {
    children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
    return (
        <>
            <NextAuthProvider>
                <ReduxProviders>
                    {children}
                </ReduxProviders>
            </NextAuthProvider>
        </>
    )
}