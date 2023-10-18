import { format } from 'date-fns';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../Redux/slices/taskSlice';
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
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

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
      updateTodo({ ...task, status: checked ? 'incomplete' : 'complete' })
    );
  };

  const handleDelete = () => {
    dispatch(deleteTodo(task.id));
    toast.success('Todo Deleted Successfully');
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  return (
    <>
      <motion.div className="flex items-center justify-center p-4 bg-white mb-6 rounded last:mb-0" variants={child}>
        <div className="flex items-center justify-start gap-4">
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className="flex flex-col overflow-hidden">
            <p
            //className={`button button--${variant}`}
            className={`todoText ${task.status && 'todoText--completed' }`}
              // className={getClasses([
              //   styles.todoText,
              //   task.status === 'complete' && styles['todoText--completed'],
              // ])}
            >
              {task.title}
            </p>
            <p className="block text-[1.2rem] font-light mt-[-0.2rem] text-black-2">
              {format(new Date(task.time), 'p, MM/dd/yyyy')}
            </p>
          </div>
        </div>
        <div className="flex items-center justift-center gap-4">
          <div
            className={styles.icon}
            onClick={() => handleDelete()}
            onKeyDown={() => handleDelete()}
            tabIndex={0}
            role="button"
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
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
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        task={task}
      />
    </>
  );
}

export default TaskItem;