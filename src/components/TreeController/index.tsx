import React, { useEffect } from "react";
import { observer } from "mobx-react";

import useStore from "stores/useStore";

import Tree from "components/Tree";
import Settings from "components/Settings";

import styles from "./TreeController.module.scss";

const TreeController: React.FC = () => {
  const { ElementsStore } = useStore();

  useEffect(() => {
    ElementsStore.getElement().catch(() =>
      console.log("FAILED WHILE GETTING ROOT ELEMENT")
    );
  }, [ElementsStore]);

  const handleJsonBtnClick = () => {
    ElementsStore.getJson().catch(() =>
      console.log("FAILED WHILE GETTING JSON")
    );
  };

  return (
    <div className={styles["tree-controller"]}>
      <div className={styles["tree-controller__main"]}>
        <Settings />
        <Tree />
      </div>

      <div>
        <button
          className={styles["tree-controller__btn"]}
          onClick={handleJsonBtnClick}
        >
          Сгенерировать JSON
        </button>
        <pre>{ElementsStore.jsonObj}</pre>
      </div>
    </div>
  );
};

export default observer(TreeController);
