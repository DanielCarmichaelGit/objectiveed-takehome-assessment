import React, { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasksData,
  toggleView,
  sortGroups,
} from "../StateManagement/Actions/actions";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TocIcon from "@mui/icons-material/Toc";
import Button from "@mui/material/Button";
import styles from "../Styles/CSS/Board.module.css";
import Alert from "./Alert";
import DashboardFilterBar from "../Features/Dashboard/DashboardFilters";
import Typography from "@mui/material/Typography";

// Lazy loaded components
const CardView = lazy(() => import("./CardView"));
const BasicTable = lazy(() => import("./TableView"));
const GroupView = lazy(() => import("../Features/Board/groupView"));
const CreateTaskView = lazy(() => import("../Features/Board/CreateTaskView"));
const TaskView = lazy(() => import("../Features/Board/TaskView"));
const CreateGroupView = lazy(() => import("../Features/Board/CreateGroupView"));

export default function Board() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const groups = useSelector((state) => state.groups);
  const viewMode = useSelector((state) => state.viewMode);

  useEffect(() => {
    dispatch(fetchTasksData());
  }, [dispatch]);

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      const groupMap = {};

      tasks.forEach((task) => {
        if (task.groupDto) {
          const groupId = task.groupDto.id;
          if (!groupMap[groupId]) {
            groupMap[groupId] = {
              id: groupId,
              name: task.groupDto.name,
              description: task.groupDto.description,
              tasks: [],
            };
          }
          groupMap[groupId].tasks.push({
            id: task.id,
            name: task.name,
            body: task.body,
          });
        }
      });

      const sortedGroups = Object.values(groupMap);
      dispatch(sortGroups(sortedGroups));
    }
  }, [tasks, dispatch]);

  function handleToggleView(mode) {
    dispatch(toggleView(mode));
  }

  function renderView() {
    switch (viewMode) {
      case "board":
        return <CardView groups={groups} />;
      case "group":
        return <GroupView />;
      case "createTask":
        return <CreateTaskView />;
      case "task":
        return <TaskView />;
      case "table":
        return <BasicTable groups={groups} />;
      case "createGroupView":
        return <CreateGroupView />;
      default:
        return <Typography variant="body1">Something went wrong</Typography>;
    }
  }

  return (
    <div className={styles.Board}>
      <div className={styles.BoardOptions}>
        <DashboardFilterBar />
        <DashboardIcon
          onClick={() => handleToggleView("board")}
          className={`${styles.Icon} ${viewMode === "board" ? styles.HighlightedIcon : styles.BasicIcon}`}
        />
        <TocIcon
          onClick={() => handleToggleView("table")}
          className={`${styles.Icon} ${viewMode === "table" ? styles.HighlightedIcon : styles.BasicIcon}`}
        />
      </div>
      <div className={styles.BoardContent}>
        <Suspense fallback={<div>Loading...</div>}>
          {groups?.length > 0 ? renderView() : viewMode === "createGroupView" ? (
            <CreateGroupView />
          ) : (
            <Alert>
              <Button onClick={() => handleToggleView("createGroupView")}>
                Create a Group
              </Button>
            </Alert>
          )}
        </Suspense>
      </div>
    </div>
  );
}
