import React, { ReactNode } from 'react';

import "../styles/components/button.css";

import { BsGithub } from 'react-icons/bs';

import { signIn, useSession } from 'next-auth/react';

interface ILoginButtonProps {
    // type?: string;
    // variant: string;
    children: ReactNode;
    //onClick?: () => void;
}

const LoginButton: React.FC<ILoginButtonProps> = ({ children }) => {
    return (
        <button
            className="login-button login-button--social-login login-button--github mx-auto cursor-pointer"
            onClick={() => {
                signIn("github")
            }}
        >
            {/* <i className="icon fa fa-github"></i> */}
            <BsGithub className="icon" />
            {children}
        </button>
    );
}

export default LoginButton;