"use client";

import React, { useState } from "react";
import Button from "./Button";
import LoginModal from "./LoginModal";

import { signIn, signOut, useSession } from 'next-auth/react';

const AppNavbar: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleLogin = () => {
    setModalOpen(true);
  };

  //data重新命名為session
  const { data: session } = useSession();
  
  console.log("session test", session);

  return (
    <>
      <header className="text-gray-700 body-font border-b border-gray-200">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
          <a
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            href="https://mertjf.github.io/tailblocks/"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            {/* <span className="ml-3 text-4xl">GIT</span> */}
          </a>
          <div className="flex gap-4">
            <p onClick={() => signIn("github")}>yo</p>
            <Button type="login" variant="primary" onClick={handleLogin}>
              <span>Log In</span>
            </Button>
            <Button type="login" variant="primary" onClick={() => { signOut() }}>
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </header>
      <LoginModal
        type="login"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalTitle="Github issue tracker"
      />
    </>
  );
};

export default AppNavbar;
