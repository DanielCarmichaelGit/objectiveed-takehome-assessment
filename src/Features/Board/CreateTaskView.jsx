import React, { useState } from "react";
import styles from "../../Styles/CSS/TaskView.module.css";
import GroupCard from "./GroupCard";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toggleView, createTask, fetchTasksData } from "../../StateManagement/Actions/actions";

export default function CreateTaskView() {
  // initialize local vars from redux store
  const selectedGroup = useSelector((state) => state.selectedGroup);
  const lastView = useSelector((state) => state.lastView);
  const dispatch = useDispatch();

  // State hooks for task title and description
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  // function to handle back click via redux
  function handleBackClick() {
    dispatch(toggleView(lastView));
  }

  // function to create task via redux
  function handleTaskCreate() {
    if (taskDescription !== "" && taskTitle !== "") {
      const taskData = {
        name: taskTitle,
        body: taskDescription,
        groupDto: {
          id: selectedGroup.id,
          name: selectedGroup.name,
          description: selectedGroup.description,
        },
      };
      dispatch(createTask(taskData));

      // set refetch to true to get latest changes
      localStorage.setItem("refetch", "true");
      dispatch(fetchTasksData())
    }
  }

  return (
    <div className={styles.TaskView}>
      <GroupCard key={"selected_group"} group={selectedGroup} />
      <div className={styles.GroupInfo}>
        <div className={styles.GroupInfoRow}>
          <ArrowBackIcon className={styles.Icon} onClick={handleBackClick} />
          <Typography variant="body1">Create Task</Typography>
        </div>
        <div className={styles.GroupInfoText}>
          <Typography variant="caption">Name</Typography>
          <Typography variant="body1">{selectedGroup.name}</Typography>
        </div>
        <div className={styles.GroupInfoText}>
          <Typography variant="caption">Description</Typography>
          <Typography variant="body1">{selectedGroup.description}</Typography>
        </div>
        <TextField
          label="Title"
          placeholder="Enter task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          focused
        />
        <TextField
          label="Description"
          placeholder="Enter task description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          focused
        />
        <div className={styles.GroupInfoButtonRow}>
          <Button onClick={handleTaskCreate}>Create Task</Button>
        </div>
      </div>
    </div>
  );
}
