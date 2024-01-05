"use client"

import React from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';

import LoginButton from './LoginButton';

interface IIssueModalProps {
    type: string;
    modalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalTitle: string;
}

const dropIn = {
    hidden: {
        opacity: 0,
        transform: 'scale(0.9)',
    },
    visible: {
        transform: 'scale(1)',
        opacity: 1,
        transition: {
            duration: 0.1,
            type: 'spring',
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        transform: 'scale(0.9)',
        opacity: 0,
    },
};

const LoginModal: React.FC<IIssueModalProps> = ({ type, modalOpen, setModalOpen, modalTitle }) => {

    return (
        <AnimatePresence>
            {modalOpen && (
                <motion.div
                    className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-50 flex justify-center items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-bg-2 max-w-[500px] w-[90%] mx-auto flex justify-center items-center p-8 rounded-lg relative"
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.div
                            className="absolute top[-10px] right-0 translate-y-[-100%] text-[2.5rem] p-2 
              rounded bg-gray-1 text-black-2 flex items-center 
              justify-center cursor-pointer z-[-1] hover:bg-[#e32525] hover:text-white
              duration-300 ease-in-out"
                            onKeyDown={() => { setModalOpen(false) }}
                            onClick={() => { setModalOpen(false) }}
                            role="button"
                            tabIndex={0}
                            // animation
                            initial={{ top: 40, opacity: 0 }}
                            animate={{ top: -10, opacity: 1 }}
                            exit={{ top: 40, opacity: 0 }}
                        >
                            <MdOutlineClose />
                        </motion.div>

                        <form className="w-full">
                            {/* <div>
                                <Image src={logo} alt="logo" priority />
                            </div> */}
                            <h1 className="text-black text-[2rem] font-semibold p-8 mb-8 uppercase text-center">
                                {modalTitle}
                                {/*這邊要logo */}
                            </h1>
                            <h2 className="text-black-1 text-[2rem] font-semibold p-4 mb-8 uppercase text-center">
                                Welcome Back !
                            </h2>
                            <p>Login with ur Github account to start a new life!</p>
                            <div className="flex mx-auto">
                                <LoginButton>
                                    Login with Github
                                </LoginButton>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default LoginModal;