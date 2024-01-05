"use client"

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect } from 'react';
import IssueItem from './IssueItem';
import { IIssue, initIssue } from '@/Redux/slices/issueSlice';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { useGetIssueListQuery } from '@/Redux/services/issueApi';

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
  const issueList = useAppSelector((state) => state.issue.issueList);
  const filterLabel = useAppSelector((state) => state.issue.filterLabel);

  const { data } = useGetIssueListQuery("all");

  let handleData: any[] = [];

  if (data !== undefined) {
    handleData = issueList.map((issue: any) => {

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
  const sortedIssueList = [...handleData];
  sortedIssueList.sort((a: IIssue, b: IIssue) => new Date(b.time).getTime() - new Date(a.time).getTime());   //大到小
  //sortedIssueList.sort((a: IIssue, b: IIssue) => new Date(a.time).getTime() - new Date(b.time).getTime()); ////小到大

  //標籤
  const filteredIssueList = sortedIssueList.filter((item) => {
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
        {filteredIssueList && filteredIssueList.length > 0 ? (
          filteredIssueList.map((issue) => (
            <IssueItem key={issue.id} issue={issue} />
          ))
        ) : (
          <motion.p variants={child} className="text-[1.6rem] font-medium text-black-2 text-center mx-auto py-2 px-4 rounded-lg bg-gray-2">
            No Issues
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent;