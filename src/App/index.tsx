import TreeController from "components/TreeController";
import React from "react";

import styles from "./App.module.scss";

const App: React.FC = () => {
  return (
    <div className={styles["App"]}>
      <header className={styles["App-header"]}></header>

      <TreeController />
    </div>
  );
};

export default App;
