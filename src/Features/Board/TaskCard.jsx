import styles from "../../Styles/CSS/TaskCard.module.css";
import Typography from "@mui/material/Typography";

export default function TaskCard({ selectTask, task }) {

  return (
    <div onClick={selectTask} className={styles.TaskCard}>
      <Typography variant="body1">
        {
          task.name
        }
      </Typography>
      <Typography sx={{maxWidth: "252px"}} variant="body2">
        {
          task.body
        }
      </Typography>
    </div>
  )
}