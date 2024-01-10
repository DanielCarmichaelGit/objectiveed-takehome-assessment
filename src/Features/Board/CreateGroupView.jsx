import React, { useEffect, useState } from 'react';
import styles from "../../Styles/CSS/TaskView.module.css";
import GroupCard from "./GroupCard";
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toggleView, createGroup, setLastView } from "../../StateManagement/Actions/actions";

export default function CreateGroupView() {
  // upon component render, initialize the view to "board" to ensure no render issues
  useEffect(() => {
    dispatch(setLastView("board"));
  }, [])

  // ease of use redefinition
  const dispatch = useDispatch();

  // State hooks for task title and description
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  // function to handle back click via redux
  function handleBackClick() {
    dispatch(toggleView("board"));
  }

  // function to handle the creation of the resource "group" via redux
  function handleGroupCreate() {
    if (groupName !== '' && groupDescription !== '') {
      const groupData = {
        name: groupName,
        description: groupDescription
      };
      localStorage.setItem("refetch", "true")
      dispatch(createGroup(groupData));
    }
  }

  return (
    <div className={styles.TaskView}>
      <div className={styles.GroupInfo}>
        <div className={styles.GroupInfoRow}>
          <ArrowBackIcon className={styles.Icon} onClick={handleBackClick} />
          <Typography variant="body1">
            Create Group
          </Typography>
        </div>
        <TextField
          label="Name"
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          required
          focused
        />
        <TextField
          label="Description"
          placeholder="Enter group description"
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.target.value)}
          required
          focused
        />
        <div className={styles.GroupInfoButtonRow}>
          <Button onClick={handleGroupCreate}>Create Group</Button>
        </div>
      </div>
    </div>
  );
}
