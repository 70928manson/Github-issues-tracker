"use client"

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect } from 'react';
import TaskItem from './TaskItem';
import { ITask, localStorageInitTask } from '@/Redux/slices/taskSlice';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { useGetTaskListQuery } from '@/Redux/services/taskApi';

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

const AppContent: React.FC = () => {
  const taskList = useAppSelector((state) => state.task.taskList);
  const filterStatus = useAppSelector((state) => state.task.filterStatus);

  const { data, isLoading } = useGetTaskListQuery("all");
  console.log("data", data);
  console.log("taskList", taskList);


  const dispatch = useAppDispatch();

  let handleData: any[] = [];

  if (data !== undefined) {
    handleData = data.map((d: any) => {
      console.log("d", d);

      // id: string;
      // title: string;
      // status: string;
      // time: string;

      return {
        completed: false,
        id: d.id,
        title: `${d.title} (Github來的)`,
        body: d.body,
        time: "December 17, 2023 03:24:00",
        status: ""
      }
    })

  }

  //handleData放到sortedTaskList
  const sortedTaskList = [...taskList, ...handleData];
  sortedTaskList.sort((a: ITask, b: ITask) => new Date(b.time).getTime() - new Date(a.time).getTime());

  const filteredTaskList = sortedTaskList.filter((item) => {
    if (filterStatus === 'all') {
      return true;
    }
    return item.status === filterStatus;
  });

  useEffect(() => {
    //這邊換成Github issue
    //local task 88
    const localTaskList = window.localStorage.getItem('taskList');
    if (localTaskList) {
      const a: ITask[] = JSON.parse(localTaskList);
      dispatch(localStorageInitTask(a));
    }
  }, [dispatch])

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