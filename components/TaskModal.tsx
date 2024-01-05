"use client"

import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { MdOutlineClose } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ITask, addTask, deleteTask, updateTask } from '../Redux/slices/taskSlice';
import Button from './Button';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { IModalOpen } from '@/types/components/taskModal';

import { useSession } from 'next-auth/react';
import { useGetTaskListQuery } from '@/Redux/services/taskApi';

interface ITaskModalProps {
  type: string;
  modalOpen: IModalOpen;
  setModalOpen: React.Dispatch<React.SetStateAction<IModalOpen>>;
  task?: ITask;
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

const TaskModal: React.FC<ITaskModalProps> = ({ type, modalOpen, setModalOpen, task, modalTitle }) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [taskBody, setTaskBody] = useState('');
  const [label, setLabel] = useState('In Progress');

  const taskList = useAppSelector((state) => state.task.taskList);

  //data重新命名為session
  const { data: session, status } = useSession();
  
  useEffect(() => {
    if ((type === 'update' || type === 'delete') && task) {
      setTitle(task.title);
      setTaskBody(task.body);
      if (task.status === undefined) {
        setLabel('In Progress')
      } else {
        setLabel(task.status);
      }
    } else {
      setTitle('');
      setTaskBody('');
      setLabel('In Progress');
    }
  }, [type, task, modalOpen]);

  const handleAdd = () => {
    dispatch(
      addTask({
        id: uuid(),
        title,
        body: taskBody,
        label,
        time: Date(),
        created_at: Date(),
        number: taskList.length + 1
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
      "body": taskBody,
    });

    let config = {
      method: 'POST',
      headers: headers,
      body: bodyData,
      //redirect: 'follow'
    };

    fetch(apiUri, config)
      .then(res => res.json())
      //.then(result => console.log("result", result))
      .catch(error => console.log('error', error));

    toast.success('Task added successfully');
  }

  const handleUpdate = () => {
    if (task) {
      if (task.title !== title || task.body !== taskBody || task.status !== label) {
        dispatch(updateTask({ ...task, title, body: taskBody, label }));
        //toast.success('Task Updated successfully');
      } else {
        toast.error('No changes made');
        return;
      }
      const apiUri = `https://api.github.com/repos/70928manson/Github-issues-tracker/issues/${task.number}`;
      const headers = new Headers();
      headers.append("Accept", "application/vnd.github.v3+json");
      if (status === "authenticated") {
        headers.append("Authorization", `Bearer ${session?.access_token}`);
      }
      headers.append("Content-Type", "application/json");

      let bodyData = JSON.stringify({
        "title": title,
        "body": taskBody,
        //"state": open或close
        //"label": 各種
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

      toast.success('Task update successfully');

    }
  }

  const handleDelete = () => {
    if (task !== undefined) {
      dispatch(deleteTask(task.id));
      toast.success('Task Deleted Successfully');
    } else {
      toast.error('Delete Failed');
      return;
    }
    if (task) {
      const apiUri = `https://api.github.com/repos/70928manson/Github-issues-tracker/issues/${task.number}`;
      const headers = new Headers();
      headers.append("Accept", "application/vnd.github.v3+json");
      if (status === "authenticated") {
        headers.append("Authorization", `Bearer ${session?.access_token}`);
      }
      headers.append("Content-Type", "application/json");

      let bodyData = JSON.stringify({
        "state": "closed"
        //"label": 各種
      });

      let config = {
        method: 'PATCH',
        headers: headers,
        body: bodyData,
        //redirect: 'follow'
      };

      fetch(apiUri, config)
        .then(res => res.json())
        .then(result => console.log("result", result))
        .catch(error => console.log('error', error));

      toast.success('Task update successfully');
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === '') {
      toast.error('Please enter a title');
      return;
    }

    if (title && label) {
      if (type === 'add') {
        handleAdd();
      }
      if (type === 'update') {
        handleUpdate();
      }
      if (type === 'delete') {
        handleDelete();
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
                Title
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
                Body
                <textarea
                  //type="text"
                  id="body"
                  value={taskBody}
                  onChange={(e) => setTaskBody(e.target.value)}
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

export default TaskModal;