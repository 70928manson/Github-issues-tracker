"use client"

import React, { useState } from 'react';
import Button, { SelectButton } from './Button';
import TaskModal from './TaskModal';
import { updateFilterStatus } from '../Redux/slices/taskSlice';

import { useAppDispatch, useAppSelector } from '@/Redux/hooks';

interface IModalOpen {
  add: boolean;
  update: boolean;
  delete: boolean;
}

function AppHeader() {
  const [modalOpen, setModalOpen] = useState({
    add: false,
    update: false,
    delete: false,
  });
  const initialFilterStatus = useAppSelector((state) => state.task.filterStatus);
  const [filterStatus, setFilterStatus] = useState(initialFilterStatus);
  const dispatch = useAppDispatch();

  const updateFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
    dispatch(updateFilterStatus(e.target.value));
  };

  return (
    <div className="flex items-center justify-between h-[60px]">
      <Button variant="primary" onClick={() =>{
        setModalOpen({
          ...modalOpen, add: true
        })
      }}>
        Add Task
      </Button>
      <SelectButton
        id="status"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateFilter(e)}
        value={filterStatus}
      >
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Completed</option>
      </SelectButton>
      <TaskModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} modalTitle="Add Task" />
    </div>
  );
}

export default AppHeader;