import styles from "../Styles/CSS/Alert.module.css";

export default function Alert({ children }) {
  return (
    <div className={styles.Alert}>
      {
        children
      }
    </div>
  )
}