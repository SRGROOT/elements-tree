import Button from "components/Button";
import React, { useState } from "react";
import IElement from "types/IElement";

import styles from "./NewElement.module.scss";

import addIcon from "images/addIcon.svg";
import declineIcon from "images/declineIcon.svg";
import submitIcon from "images/submitIcon.svg";

interface IProps {
  parentId: number;
  classNames?: string;
  onSubmit: (newElement: IElement) => void;
}

const NewElement: React.FC<IProps> = (props) => {
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [type, setType] = useState<string>("");

  const handleAddBtn = () => {
    setFormIsOpen(true);
  };

  const handleSubmitClick = () => {
    if (!type) return;

    props.onSubmit({
      type,
      parent_id: props.parentId,
      atributes: {},
    });
  };

  return (
    <div className={`${styles["new-element"]} ${props.classNames || ""}`}>
      {formIsOpen ? (
        <>
          <input
            onChange={(e: React.SyntheticEvent<HTMLInputElement>) =>
              setType(e.currentTarget.value)
            }
            required
            type="text"
          ></input>

          <Button
            onClick={handleSubmitClick}
            classNames={styles["new-element__btn"]}
            imgUrl={submitIcon}
          />
          <Button
            classNames={styles["new-element__btn"]}
            onClick={() => setFormIsOpen(false)}
            imgUrl={declineIcon}
          />
        </>
      ) : (
        <Button onClick={handleAddBtn} imgUrl={addIcon} />
      )}
    </div>
  );
};
export default NewElement;
