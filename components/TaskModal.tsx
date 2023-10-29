"use client"

import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { MdOutlineClose } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ITask, addTask, deleteTask, updateTask } from '../Redux/slices/taskSlice';
import Button from './Button';
import { useAppDispatch } from '@/Redux/hooks';

interface IModalOpen {
  add: boolean;
  update: boolean;
  delete: boolean;
}

interface ITaskModalProps {
  type: string;
  modalOpen: IModalOpen;
  setModalOpen: React.Dispatch<React.SetStateAction<IModalOpen>>;
  task?: ITask;
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

function TaskModal({ type, modalOpen, setModalOpen, task, modalTitle }: ITaskModalProps) {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');

  useEffect(() => {
    if ((type === 'update' || type === 'delete') && task) {
      setTitle(task.title);
      setStatus(task.status);
    } else {
      setTitle('');
      setStatus('incomplete');
    }
  }, [type, task, modalOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === '') {
      toast.error('Please enter a title');
      return;
    }
    if (title && status) {
      if (type === 'add') {
        dispatch(
          addTask({
            id: uuid(),
            title,
            status,
            time: new Date(),
          })
        );
        toast.success('Task added successfully');
      }
      if (type === 'update') {
        if (task) {
          if (task.title !== title || task.status !== status) {
            dispatch(updateTask({ ...task, title, status }));
            toast.success('Task Updated successfully');
          } else {
            toast.error('No changes made');
            return;
          }
        }
      }
      if (type === 'delete') {
        if (task !== undefined) {
          dispatch(deleteTask(task.id));
          toast.success('Task Deleted Successfully');
        } else {
          alert("刪除失敗");
        }
      }

      let tempModalOpen = {...(modalOpen as IModalOpen)};
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
                let tempModalOpen = {...(modalOpen as IModalOpen)};
                tempModalOpen[`${(type as "update" | "delete")}`] = false;
                 setModalOpen(tempModalOpen)
              }}
              onClick={() => {
                let tempModalOpen = {...(modalOpen as IModalOpen)};
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
              <label htmlFor="type" className="text-[1.6rem] text-black-1">
                Status
                <select
                  id="type"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-2 mb-8 w-full p-4 border-none bg-white text-[1.6rem]"
                  disabled={type === "delete" ? true : false}
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="complete">Completed</option>
                </select>
              </label>
              <div className="flex justify-start items-center mt-8 gap-4">
                <Button type="submit" variant="primary">
                  {modalTitle}
                </Button>
                <Button variant="secondary" onClick={() => {
                let tempModalOpen = {...(modalOpen as IModalOpen)};
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