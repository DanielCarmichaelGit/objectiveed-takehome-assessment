import React, { useState } from "react";
import styles from "../../Styles/CSS/GroupView.module.css";
import GroupCard from "./GroupCard";
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { deleteGroup, fetchTasksData, toggleView, updateGroup } from "../../StateManagement/Actions/actions";

export default function GroupView() {
  // get currently selected group form redux store
  const selectedGroup = useSelector((state) => state.selectedGroup)
  // ease of use redefinition
  const dispatch = useDispatch();

  // state for group name and description
  const [groupName, setGroupName] = useState(selectedGroup.name);
  const [groupDescription, setGroupDescription] = useState(selectedGroup.description);

  // handle back navigation via redux
  function handleBackClick() {
    dispatch(toggleView("board"));
  }

  // handle deletion of group resource
  function handleGroupDelete() {
    const payload = {
      id: selectedGroup.id,
      name: selectedGroup.name,
      description: selectedGroup.description
    };
    dispatch(deleteGroup(payload));

    // set refetch to true to get latest changes
    localStorage.setItem("refetch", "true")
    dispatch(fetchTasksData())
  }

  // function to handle the group update via dispatching actions
  function handleGroupUpdate() {
    const groupData = {
      id: selectedGroup.id,
      name: groupName,
      description: groupDescription
    };
    dispatch(updateGroup(groupData)); // Assuming you have a corresponding updateGroup action
  }

  return (
    <div className={styles.GroupView}>
      <GroupCard key={"selected_group"} group={selectedGroup} />
      <div className={styles.GroupInfo}>
        <div className={styles.GroupInfoRow}>
          <ArrowBackIcon className={styles.Icon} onClick={handleBackClick}/>
          <Typography variant="body1">
            Manage Group Info
          </Typography>
        </div>
        <TextField 
          label="Group Name" 
          value={groupName} 
          onChange={(e) => setGroupName(e.target.value)} 
          focused
        />
        <TextField 
          label="Description" 
          value={groupDescription} 
          onChange={(e) => setGroupDescription(e.target.value)} 
          focused
        />
        <div className={styles.GroupInfoButtonRow}>
          <Button onClick={handleGroupUpdate}>Update</Button>
          <Button onClick={handleGroupDelete}>Delete</Button>
        </div>
      </div>
    </div>
  );
}
