import styles from "../../Styles/CSS/NavBar.module.css";

import Logo from "../../Assets/hello-long.png";
import { useDispatch } from 'react-redux';
import { toggleView } from "../../StateManagement/Actions/actions";

export default function NavBar() {
  const dispatch = useDispatch();

  // on logo click set view to default "board"
  function handleLogoClick() {
    dispatch(toggleView("board"));
  }

  return (
    <div className={styles.NavBar}>
      <div className={styles.NavBarGroup}>
        <img onClick={handleLogoClick} src={Logo} className={styles.LogoImage}/>
      </div>
    </div>
  )
}