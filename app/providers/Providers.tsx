'use client'

import React from 'react';
import { ReduxProviders } from '../../Redux/Provider';
import { SessionProvider } from "next-auth/react";

type Props = {
    children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
    return (
        <>
            <ReduxProviders>
                <SessionProvider>
                    {children}
                </SessionProvider>
            </ReduxProviders>
        </>
    )
}