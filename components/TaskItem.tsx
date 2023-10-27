import { format } from 'date-fns';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { updateTask } from '../Redux/slices/taskSlice';
import CheckButton from './CheckButton';
import TaskModal from './TaskModal';

import { ITask } from '../Redux/slices/taskSlice';

import '../styles/components/taskItem.css';

interface ITaskItemProps {
  task: ITask;
}

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function TaskItem({ task }: ITaskItemProps) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [modalOpen, setModalOpen] = useState({
    add: false,
    update: false,
    delete: false,
  })

  useEffect(() => {
    if (task.status === 'complete') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [task.status]);

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      updateTask({ ...task, status: checked ? 'incomplete' : 'complete' })
    );
  };

  const handleDelete = () => {
    setModalOpen({
      ...modalOpen, delete: true
    })
  };

  const handleUpdate = () => {
    setModalOpen({
      ...modalOpen, update: true
    })
  };

  console.log("2-1", "更新updateModal state方式");

  console.log("斷了QQ")

  console.log("5 type集中管理 ex taskModal和appHeader的 IModalOpen");
  
    

  return (
    <>
      <motion.div className="flex items-center justify-between p-4 bg-white mb-6 rounded last:mb-0" variants={child}>
        <div className="flex items-center justify-start gap-4">
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className="flex flex-col overflow-hidden">
            <p
            //className={`button button--${variant}`}
            className={`todoText ${task.status === "complete" && 'todoText--completed' }`}
              // className={getClasses([
              //   styles.todoText,
              //   task.status === 'complete' && styles['todoText--completed'],
              // ])}
            >
              {task.title}
            </p>
            <p className="block text-[1.2rem] font-light mt-[-0.2rem] text-black-2">
              {/* { task.time !== undefined ?  format(new Date(task.time), 'p, MM/dd/yyyy') : format(new Date(), 'p, MM/dd/yyyy') } */}
              { format(new Date(task.time), 'p, MM/dd/yyyy')}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div
            className="text-[2rem] p-2 rounded bg-gray-1 text-black-2 flex items-center justify-center cursor-pointer 
            duration-300 ease-in-out hover:bg-gray-2"
            onClick={() => handleDelete()}
            onKeyDown={() => handleDelete()}
            tabIndex={0}
            role="button"
          >
            <MdDelete />
          </div>
          <div
            className="text-[2rem] p-2 rounded bg-gray-1 text-black-2 flex items-center justify-center cursor-pointer 
            duration-300 ease-in-out hover:bg-gray-2"
            onClick={() => handleUpdate()}
            onKeyDown={() => handleUpdate()}
            tabIndex={0}
            role="button"
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>
      <TaskModal
        type="update"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        task={task}
        modalTitle="Update Task"
      />
      <TaskModal
        type="delete"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        task={task}
        modalTitle="Delete Task"
      />
    </>
  );
}

export default TaskItem;