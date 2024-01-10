import styles from "../../Styles/CSS/DashboardFilters.module.css"
import Typography from "@mui/material/Typography";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { toggleView } from "../../StateManagement/Actions/actions";

export default function DashboardFilterBar() {
  const dispatch = useDispatch();

  function handleCreateGroup() {
    dispatch(toggleView("createGroupView"));
  }

  return (
    <div className={styles.FilterBar}>
      <div className={styles.FilterBarLeft}>
        <Typography variant="h6">Project Management</Typography>
      </div>
      <div className={styles.FilterBarRight}>
        <Button onClick={handleCreateGroup} className={styles.Button}>
          <WorkspacesIcon />
          Create Group
        </Button>
      </div>
    </div>
  );
}
