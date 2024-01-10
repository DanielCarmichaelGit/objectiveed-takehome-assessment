import styles from "../../Styles/CSS/GroupCard.module.css";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TaskCard from "./TaskCard";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { toggleView, setLastView, setSelectedGroup, setSelectedTask } from "../../StateManagement/Actions/actions";
import { useDispatch, useSelector } from 'react-redux';

export default function GroupCard({ group, selectGroup }) {
  // ease of use redefinition
  const dispatch = useDispatch();

  function handleTaskIconClick(event) {
    // prevent click event bubbling
    event.stopPropagation();
    dispatch(setSelectedGroup(group));
    dispatch(toggleView("createTask"));
    dispatch(setLastView("board"));
  }

  // on task click, dispatch actions to set selected task and group data for use in components
  function handleTaskClick(event, task) {
    console.log(task)
    event.stopPropagation();
    dispatch(setSelectedTask(task));
    dispatch(setSelectedGroup(group));
    dispatch(toggleView("task"));
    dispatch(setLastView("board"));
  }

  return (
    <div onClick={() => selectGroup()} className={styles.GroupCard}>
      <div className={styles.HeaderRow}>
        <Typography variant="body1">
          {group.name}
        </Typography>
        <PlaylistAddIcon onClick={handleTaskIconClick} className={styles.Icon}/>
      </div>
      {group?.tasks?.length > 0 ? <Divider className={styles.Divider}></Divider> : null}
      {group?.tasks?.map((task, index) => (
        <TaskCard selectTask={(event) => handleTaskClick(event, task)} key={index} task={task}/>
      ))}
    </div>
  );
}
