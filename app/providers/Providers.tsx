'use client'

import React from 'react';
import { ReduxProviders } from '../../Redux/Provider';
import { NextAuthProvider } from '../nextAuthProvider';
import ToasterProvider from './ToasterProvider';

type Props = {
    children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
    return (
        <>
            <NextAuthProvider>
                <ReduxProviders>
                    <ToasterProvider />
                    {children}
                </ReduxProviders>
            </NextAuthProvider>
        </>
    )
}