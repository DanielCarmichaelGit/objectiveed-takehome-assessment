import React, { useState, useEffect } from "react";
import styles from "../../Styles/CSS/TaskView.module.css";
import GroupCard from "./GroupCard";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  deleteTask,
  fetchTasksData,
  toggleView,
  updateTask,
} from "../../StateManagement/Actions/actions";

export default function TaskView() {
  const selectedTask = useSelector((state) => state.selectedTask);
  const selectedGroup = useSelector((state) => state.selectedGroup);
  const dispatch = useDispatch();

  // State for task title and description
  const [taskTitle, setTaskTitle] = useState(selectedTask.name);
  const [taskDescription, setTaskDescription] = useState(selectedTask.body);

  // Update state when selectedTask changes
  useEffect(() => {
    setTaskTitle(selectedTask.name);
    setTaskDescription(selectedTask.body);
  }, [selectedTask]);


  // navigate back using redux
  function handleBackClick() {
    dispatch(toggleView("board"));
  }

  // handle the deletion of a task resource
  function handleTaskDelete() {
    const payload = {
      id: selectedTask.id,
      name: selectedTask.name,
      body: selectedTask.body,
      groupDto: {
        id: selectedGroup.id,
        name: selectedGroup.name,
        description: selectedGroup.description,
      },
    };
    dispatch(deleteTask(payload));

    // refetch for latest changes
    localStorage.setItem("refetch", "true");
    dispatch(fetchTasksData());
  }

  // dispatch task update action
  function handleTaskUpdate() {
    if (taskTitle !== "" && taskDescription !== "") {
      const payload = {
        id: selectedTask.id,
        name: taskTitle,
        body: taskDescription,
        groupDto: {
          id: selectedGroup.id,
          name: selectedGroup.name,
          description: selectedGroup.description,
        },
      };

      dispatch(updateTask(payload));

      // refetch for latest changes
      localStorage.setItem("refetch", "true");
      dispatch(fetchTasksData());
    }
  }

  return (
    <div className={styles.TaskView}>
      <GroupCard key={"selected_group"} group={selectedGroup} />
      <div className={styles.GroupInfo}>
        <div className={styles.GroupInfoRow}>
          <ArrowBackIcon className={styles.Icon} onClick={handleBackClick} />
          <Typography variant="body1">Update Task</Typography>
        </div>
        <TextField
          label="Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          focused
        />
        <TextField
          label="Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          focused
        />
        <div className={styles.GroupInfoButtonRow}>
          <Button onClick={handleTaskUpdate}>Update Task</Button>
          <Button onClick={handleTaskDelete}>Delete Task</Button>
        </div>
      </div>
    </div>
  );
}
