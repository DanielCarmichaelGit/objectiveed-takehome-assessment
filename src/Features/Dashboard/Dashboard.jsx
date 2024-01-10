import React, { Suspense, lazy, useEffect } from "react";
import styles from "../../Styles/CSS/Dashboard.module.css";

// Lazy loaded components
const Board = lazy(() => import("../../Components/Board"));
const NavBar = lazy(() => import("../NavBar/NavBar"));

export default function Dashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={styles.Page}>
        <NavBar />
        <div className={styles.Dashboard}>
          <Board />
        </div>
      </div>
    </Suspense>
  );
}
