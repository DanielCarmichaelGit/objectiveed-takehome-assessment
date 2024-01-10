import GroupCard from "../Features/Board/GroupCard";
import styles from "../Styles/CSS/CardView.module.css";
import { useDispatch } from "react-redux";
import {
  setSelectedGroup,
  setLastView,
  toggleView,
} from "../StateManagement/Actions/actions";

export default function CardView({ groups }) {
  const dispatch = useDispatch();

  // Upon group click, set selectedGroup to clicked group
  function handleGroupSelect(group) {
    dispatch(setSelectedGroup(group));
    dispatch(setLastView("board"));
    dispatch(toggleView("group"));
  }
  

  return (
    <div className={styles.CardView}>
      {groups.map((group, index) => (
        <GroupCard
          selectGroup={() => handleGroupSelect(group)}
          key={index}
          group={group}
        />
      ))}
    </div>
  );  
}
