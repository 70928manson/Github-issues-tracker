"use client"

import React, { useState } from 'react';
import Button, { SelectButton } from './Button';
import TaskModal from './TaskModal';
import { updateFilterLabel } from '../Redux/slices/taskSlice';

import { useAppDispatch, useAppSelector } from '@/Redux/hooks';

import { IModalOpen } from '@/types/components/taskModal';

const AppHeader:React.FC = () => {
  const [modalOpen, setModalOpen] = useState({
    add: false,
    update: false,
    delete: false,
  } as IModalOpen);
  const initialFilterLabel = useAppSelector((state) => state.task.filterLabel);
  const [filterLabel, setFilterLabel] = useState(initialFilterLabel);
  const dispatch = useAppDispatch();

  const updateFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterLabel(e.target.value);
    dispatch(updateFilterLabel(e.target.value));
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
        value={filterLabel}
      >
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </SelectButton>
      <TaskModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} modalTitle="Add Task" />
    </div>
  );
}

export default AppHeader;