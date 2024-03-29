import { format } from 'date-fns';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { updateIssue } from '../Redux/slices/issueSlice';
import CheckButton from './CheckButton';
import IssueModal from './IssueModal';

import { IIssue } from '../Redux/slices/issueSlice';

import '../styles/components/issueItem.css';
import { useAppDispatch } from '@/Redux/hooks';
import { useSession } from 'next-auth/react';

interface IIssueItemProps {
  issue: IIssue;
}

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const IssueItem: React.FC<IIssueItemProps> = ({ issue }) => {
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(false);
  const [modalOpen, setModalOpen] = useState({
    add: false,
    update: false,
    delete: false,
  });

  //data重新命名為session
  const { data: session, status } = useSession();

  useEffect(() => {
    if (issue.status === 'Done') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [issue.status]);

  const handleCheck = () => {
    setChecked(!checked);    
    dispatch(
      updateIssue({ ...issue, status: checked ? 'In Progress' : 'Done', label: checked ? 'In Progress' : 'Done' })
    );

    const apiUri = `https://api.github.com/repos/70928manson/Github-issues-tracker/issues/${issue.number}`;
    const headers = new Headers();
    headers.append("Accept", "application/vnd.github.v3+json");
    if (status === "authenticated") {
      headers.append("Authorization", `Bearer ${session?.access_token}`);
    }
    headers.append("Content-Type", "application/json");

    let bodyData = JSON.stringify({
      "labels": issue.status === "Done" ? ["In Progress"] : ["Done"]
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

    toast.success('Issue change status successfully');
  };

  const handleDelete = () => {
    setModalOpen({
      ...modalOpen, delete: true
    })
    toast.success('Issue Deleted Successfully');
  };

  const handleUpdate = () => {
    setModalOpen({
      ...modalOpen, update: true
    })
  };

  return (
    <>
      <motion.div className="flex items-center justify-between p-4 bg-white mb-6 rounded last:mb-0" variants={child}>
        <div className="flex items-center justify-start gap-4">
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className="flex flex-col overflow-hidden">
            <p
            className={`todoText ${issue.status === "Done" && 'todoText--completed' }`}
            >
              {issue.title}
            </p>
            <div>
              <p className="block text-[1.5rem] font-light mt-[-0.2rem] text-black-2 pb-2">{`body: ${issue.body}`}</p>
            </div>
            <div>
              <p className="block text-[1.5rem] font-light mt-[-0.2rem] text-black-2 pb-2">{`label to status: ${issue.status}`}</p>
            </div>
            <p className="block text-[1.2rem] font-light mt-[-0.2rem] text-black-2">
              { format(new Date(issue.time), 'p, MM/dd/yyyy') }
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
      <IssueModal
        type="update"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        issue={issue}
        modalTitle="Update Issue"
      />
      <IssueModal
        type="delete"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        issue={issue}
        modalTitle="Delete Issue"
      />
    </>
  );
}

export default IssueItem;