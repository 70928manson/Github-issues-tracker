"use client";

import React, { useState } from "react";
import Button from "./Button";
import LoginModal from "./LoginModal";

import { signIn, signOut, useSession } from 'next-auth/react';
import { useAppDispatch } from "@/Redux/hooks";
import toast from "react-hot-toast";
import { initIssue } from "@/Redux/slices/issueSlice";

import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [keyword, setKeyword] = useState('');

  const handleLogin = () => {
    setModalOpen(true);
  };

  //data重新命名為session
  const { data: session, status } = useSession();

  //console.log("Navbar session", session);
  const hnadleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }

  const handleSearchInputKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  const handleSearch = () => {
    const apiUri = `https://api.github.com/search/issues?q=${keyword}+type:issue+repo:70928manson/Github-issues-tracker`;
    const headers = new Headers();
    headers.append("Accept", "application/vnd.github.text-match+json");
    if (status === "authenticated") {
      headers.append("Authorization", `Bearer ${session?.access_token}`);
    }
    headers.append("Content-Type", "application/json");

    let config = {
      method: 'GET',
      headers: headers,
    };

    fetch(apiUri, config)
      .then(res => res.json())
      .then(result => dispatch(initIssue(result.items)))
      .catch(error => console.log('error', error));

    toast.success('Issue search successfully');
    setKeyword("");
  }
  

  return (
    <>
      <header className="text-gray-700 body-font border-b border-gray-200">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
          <div className="flex justify-center items-center w-[50%]">
            <Link href="https://github.com/70928manson/Github-issues-tracker" style={{
              color: 'rgb(55, 65, 81 / var(--tw-text-opacity))',
              textDecoration: 'none'
            }} target="_blank">
              <FaGithub size={28} />
            </Link>
            <div className="flex justify-center items-center w-[50%]">
              <div className="w-full px-4">
                <div className="relative flex justify-center items-center">
                  <input type="text" name="q" className="w-full border h-12 shadow p-4 rounded-full" placeholder="search"
                    value={keyword} onChange={hnadleSearchInputChange} onKeyDown={handleSearchInputKeyDown}
                  />
                  <button type="button" onClick={handleSearch}>
                    <svg className="text-black-400 h-5 w-5 absolute top-3.5 right-5 fill-current"
                      xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"
                      x="0px" y="0px" viewBox="0 0 56.966 56.966" xmlSpace="preserve">
                      <path
                        d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z">
                      </path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
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

export default Navbar;
