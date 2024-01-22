"use client"

import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { MdOutlineClose } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { IIssue, addIssue, deleteIssue, updateIssue } from '../Redux/slices/issueSlice';
import Button from './Button';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { IModalOpen } from '@/types/components/issueModalOpen';

import { useSession } from 'next-auth/react';
import { useGetIssueListQuery } from '@/Redux/services/issueApi';

interface IIssueModalProps {
  type: string;
  modalOpen: IModalOpen;
  setModalOpen: React.Dispatch<React.SetStateAction<IModalOpen>>;
  issue?: IIssue;
  modalTitle: string;
}

type TTestConfig = {
  method: string;
  headers: Headers;
  body: string;
  redirect: string;
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

const IssueModal: React.FC<IIssueModalProps> = ({ type, modalOpen, setModalOpen, issue, modalTitle }) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [issueBody, setIssueBody] = useState('');
  const [label, setLabel] = useState('In Progress');

  const issueList = useAppSelector((state) => state.issue.issueList);

  //data重新命名為session
  const { data: session, status } = useSession();
  
  useEffect(() => {
    if ((type === 'update' || type === 'delete') && issue) {
      setTitle(issue.title);
      setIssueBody(issue.body);
      if (issue.status === undefined) {
        setLabel('In Progress')
      } else {
        setLabel(issue.status);
      }
    } else {
      setTitle('');
      setIssueBody('');
      setLabel('In Progress');
    }
  }, [type, issue, modalOpen]);

  const handleAdd = () => {
    dispatch(
      addIssue({
        id: uuid(),
        title,
        body: issueBody,
        label,
        status: "In Progress",
        time: Date(),
        created_at: Date(),
        number: issueList.length + 1
      })
    );

    const apiUri = `https://api.github.com/repos/70928manson/Github-issues-tracker/issues`;
    const headers = new Headers();
    headers.append("Accept", "application/vnd.github.v3+json");
    if (status === "authenticated") {
      headers.append("Authorization", `Bearer ${session?.access_token}`);
    }
    headers.append("Content-Type", "application/json");

    let bodyData = JSON.stringify({
      "title": title,
      "body": issueBody,
    });

    let config = {
      method: 'POST',
      headers: headers,
      body: bodyData,
      //redirect: 'follow'
    };

    fetch(apiUri, config)
      .then(res => res.json())
      .then(result => console.log("result", result))
      .catch(error => console.log('error', error));

    toast.success('Issue added successfully');
  }

  const handleUpdate = () => {
    if (issue) {
      if (issue.title !== title || issue.body !== issueBody || issue.status !== label) {
        dispatch(updateIssue({ ...issue, title, body: issueBody, label }));
        //toast.success('Issue Updated successfully');
      } else {
        toast.error('No changes made');
        return;
      }
      const apiUri = `https://api.github.com/repos/70928manson/Github-issues-tracker/issues/${issue.number}`;
      const headers = new Headers();
      headers.append("Accept", "application/vnd.github.v3+json");
      if (status === "authenticated") {
        headers.append("Authorization", `Bearer ${session?.access_token}`);
      }
      headers.append("Content-Type", "application/json");

      let bodyData = JSON.stringify({
        "title": title,
        "body": issueBody,
        "labels": [`${label}`]
      });

      let config = {
        method: 'PATCH',
        headers: headers,
        body: bodyData,
        //redirect: 'follow'
      };

      fetch(apiUri, config)
        .then(res => res.json())
        //.then(result => console.log("result", result))
        .catch(error => console.log('error', error));

      toast.success('Issue update successfully');

    }
  }

  const handleDelete = () => {
    if (issue !== undefined) {
      dispatch(deleteIssue(issue.id));
      toast.success('Issue Deleted Successfully');
    } else {
      toast.error('Delete Failed');
      return;
    }
    if (issue) {
      const apiUri = `https://api.github.com/repos/70928manson/Github-issues-tracker/issues/${issue.number}`;
      const headers = new Headers();
      headers.append("Accept", "application/vnd.github.v3+json");
      if (status === "authenticated") {
        headers.append("Authorization", `Bearer ${session?.access_token}`);
      }
      headers.append("Content-Type", "application/json");

      let bodyData = JSON.stringify({
        "state": "closed"
      });

      let config = {
        method: 'PATCH',
        headers: headers,
        body: bodyData,
      };

      fetch(apiUri, config)
        .then(res => res.json())
        //.then(result => console.log("result", result))
        .catch(error => console.log('error', error));

      toast.success('Issue delete successfully');
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errStrArr: string[] = [];
    
    if (title === '') {
      errStrArr.push("Title is required!");
    }
    if (issueBody.length < 30) {
      errStrArr.push("Body need at least 30!");
    }

    const errorMsgs = errStrArr.map((msg, index) => <p key={`${msg}${index}`}>{msg}</p>);
    
    if (errorMsgs.length > 0) {
      toast.error(<div>{errorMsgs}</div>);
      return;
    }

    if (title && label) {
      switch (type) {
        case 'add':
          handleAdd();
          break;
        case 'update':
          handleUpdate();
        case 'delete':
          handleDelete();
        default:
          console.log("no such type in switch case", type)
      }
      let tempModalOpen = { ...(modalOpen) };
      tempModalOpen[`${(type as "add" | "update" | "delete")}`] = false;
      setModalOpen(tempModalOpen)
    }
  };

  return (
    <AnimatePresence>
      {modalOpen[`${(type as "add" | "update" | "delete")}`] === true && (
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
              onKeyDown={() => {
                let tempModalOpen = { ...(modalOpen) };
                tempModalOpen[`${(type as "update" | "delete")}`] = false;
                setModalOpen(tempModalOpen)
              }}
              onClick={() => {
                let tempModalOpen = { ...(modalOpen) };
                tempModalOpen[`${(type as "update" | "delete")}`] = false;
                setModalOpen(tempModalOpen)
              }}
              role="button"
              tabIndex={0}
              // animation
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>

            <form className="w-full" onSubmit={(e) => handleSubmit(e)}>
              <h1 className="text-black-1 text-[2rem] font-semibold p-4 mb-8 uppercase">
                {modalTitle}
              </h1>
              <label htmlFor="title" className="text-[1.6rem] text-black-1">
                Title*
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-2 mb-8 w-full p-4 border-none bg-white text-[1.6rem]"
                  disabled={type === "delete" ? true : false}
                />
              </label>
              <label htmlFor="title" className="text-[1.6rem] text-black-1">
                Body <span>{issueBody.length} / 30</span>
                <textarea
                  //type="text"
                  id="body"
                  value={issueBody}
                  onChange={(e) => setIssueBody(e.target.value)}
                  className="mt-2 mb-8 w-full p-4 border-none bg-white text-[1.6rem]"
                  disabled={type === "delete" ? true : false}
                />
              </label>
              <label htmlFor="type" className="text-[1.6rem] text-black-1">
                Label
                <select
                  id="type"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className="mt-2 mb-8 w-full p-4 border-none bg-white text-[1.6rem]"
                  disabled={type === "delete" ? true : false}
                >
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </label>
              <div className="flex justify-end items-center mt-8 gap-4">
                <Button type="submit" variant="primary">
                  {modalTitle}
                </Button>
                <Button variant="secondary" onClick={() => {
                  let tempModalOpen = { ...(modalOpen) };
                  tempModalOpen[`${(type as "update" | "delete")}`] = false;
                  setModalOpen(tempModalOpen)
                }}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default IssueModal;