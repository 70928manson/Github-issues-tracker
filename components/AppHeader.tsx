"use client"

import React, { useState } from 'react';
import Button, { SelectButton } from './Button';
import IssueModal from './IssueModal';
import { updateFilterLabel } from '../Redux/slices/issueSlice';

import { useAppDispatch, useAppSelector } from '@/Redux/hooks';

import { IModalOpen } from '@/types/components/issueModalOpen';

const AppHeader:React.FC = () => {
  const [modalOpen, setModalOpen] = useState({
    add: false,
    update: false,
    delete: false,
  } as IModalOpen);
  const initialFilterLabel = useAppSelector((state) => state.issue.filterLabel);
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
        Add Issue
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
      <IssueModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} modalTitle="Add Issue" />
    </div>
  );
}

export default AppHeader;