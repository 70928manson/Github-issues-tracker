"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode
}

export const NextAuthProvider = ({ children }: IProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};
