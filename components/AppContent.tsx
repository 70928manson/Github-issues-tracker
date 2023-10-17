import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';

import type { RootState } from '../Redux/store';
import { ITask } from '@/Redux/slices/taskSlice';

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function AppContent() {
  const taskList = useSelector((state: RootState) => state.task.taskList);
  const filterStatus = useSelector((state: RootState) => state.task.filterStatus);

  const sortedTaskList = [...taskList];
  sortedTaskList.sort((a: ITask, b: ITask) => new Date(b.time).getTime() - new Date(a.time).getTime());

  const filteredTaskList = sortedTaskList.filter((item) => {
    if (filterStatus === 'all') {
      return true;
    }
    return item.status === filterStatus;
  });

  return (
    <motion.div
      className="bg-bg-2 p-8 rounded-xl md:p-6"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {filteredTaskList && filteredTaskList.length > 0 ? (
          filteredTaskList.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))
        ) : (
          <motion.p variants={child} className="text-[1.6rem] font-medium text-black-2 text-center mx-auto py-2 px-4 rounded-lg bg-gray-2">
            No Tasks
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent;