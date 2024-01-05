"use client"

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect } from 'react';
import TaskItem from './TaskItem';
import { ITask, initTask } from '@/Redux/slices/taskSlice';
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
  const filterLabel = useAppSelector((state) => state.task.filterLabel);

  const { data } = useGetTaskListQuery("all");

  let handleData: any[] = [];

  if (data !== undefined) {
    handleData = taskList.map((issue: any) => {

      return {
        completed: false,
        id: issue.id,
        title: `${issue.title}`,
        body: issue.body,
        time: issue.created_at, //這邊要改時間
        created_at: issue.created_at,
        status: issue.status,
        state: issue.state,
        number: issue.number,
        label: issue.label
      }
    })

  }

  //時間 
  const sortedTaskList = [...handleData];
  sortedTaskList.sort((a: ITask, b: ITask) => new Date(b.time).getTime() - new Date(a.time).getTime());   //大到小
  //sortedTaskList.sort((a: ITask, b: ITask) => new Date(a.time).getTime() - new Date(b.time).getTime()); ////小到大

  //標籤
  const filteredTaskList = sortedTaskList.filter((item) => {
    if (filterLabel === 'Open') {
      return true;
    }
    if (filterLabel === "In Progress") {
      return item.status !== "Done"
    }
    return item.status === filterLabel;
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