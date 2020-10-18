import React from "react";
import { observer } from "mobx-react";

import useStore from "stores/useStore";

import IElement from "types/IElement";
import { RequestState } from "types/RequestState";

import Button from "components/Button";
import NewElement from "components/NewElement";

import styles from "./Tree.module.scss";

import declineIcon from "images/declineIcon.svg";
import backArrowIcon from "images/backArrowIcon.svg";

const Tree: React.FC = observer(() => {
  const { ElementsStore } = useStore();

  const handleElementClick = (id: number) => {
    ElementsStore.getElement(id).catch(() =>
      console.log("FAILED WHILE GETTING ELEMENT")
    );
  };

  const handleSubmitClick = (newElement: IElement) => {
    ElementsStore.createElement(newElement).catch(() =>
      console.log("FAILED WHILE CREATING ELEMENT")
    );
  };

  const handleDeleteClick = (e: React.SyntheticEvent, id: number) => {
    e.stopPropagation();
    ElementsStore.deleteElement(id).catch(() =>
      console.log("FAILED WHILE DELETING ELEMENT")
    );
  };

  const renderContent = () => {
    if (ElementsStore.state === RequestState.ERROR)
      return <p className={styles["tree__status"]}>Ошибка</p>;
    if (ElementsStore.state !== RequestState.SUCCESS) return null;

    if (!ElementsStore.element?.id)
      return (
        <NewElement
          classNames={styles["tree__default-element-control"]}
          parentId={null}
          onSubmit={handleSubmitClick}
        />
      );

    return (
      <>
        <div className={styles["tree__header"]}>
          <p className={styles["tree__header-title"]}>
            {ElementsStore.element.id} {ElementsStore.element.type}
          </p>
        </div>
        <div className={styles["tree__content"]}>
          {ElementsStore.element.parent_id && (
            <Button
              onClick={() =>
                handleElementClick(ElementsStore.element.parent_id)
              }
              classNames={styles["tree__content-back-btn"]}
              imgUrl={backArrowIcon}
            ></Button>
          )}
          <NewElement
            parentId={ElementsStore.element.id}
            onSubmit={handleSubmitClick}
          />
          {ElementsStore.element.children.map((child) => (
            <div
              key={child.id}
              onClick={() => handleElementClick(child.id)}
              className={styles["tree__content-element"]}
            >
              <p>
                {child.id} {child.type}
              </p>

              <Button
                onClick={(e) => handleDeleteClick(e, child.id)}
                imgUrl={declineIcon}
              />
            </div>
          ))}
        </div>
      </>
    );
  };

  return <div className={styles["tree"]}>{renderContent()}</div>;
});

export default Tree;
