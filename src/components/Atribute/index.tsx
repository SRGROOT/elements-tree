import Button from "components/Button";
import React, { useState } from "react";

import styles from "./Atribute.module.scss";

import addIcon from "images/addIcon.svg";
import declineIcon from "images/declineIcon.svg";
import submitIcon from "images/submitIcon.svg";

export interface IData {
  key: string;
  value: any;
}

interface IProps {
  data?: IData;
  classNames?: string;
  isNew?: boolean;
  onChangeValue?: (key: string, newValue: string) => void;
  onSubmit?: (data: IData) => boolean;
  onDecline?: (key: string) => void;
}

const Atribute: React.FC<IProps> = (props) => {
  const [formIsOpen, setFormIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<IData>({
    key: props.data?.key || "",
    value: props.data?.value || "",
  });

  const handleAddBtn = () => {
    setFormIsOpen(true);
  };

  const handleSubmitClick = () => {
    data.key && props.onSubmit && props.onSubmit(data) && setFormIsOpen(false);
  };

  const handleValueChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    !props.isNew &&
      props.onChangeValue &&
      props.onChangeValue(data.key, e.currentTarget.value);

    setData({ ...data, value: e.currentTarget.value });
  };

  return (
    <div className={`${styles["atribute"]} ${props.classNames || ""}`}>
      {formIsOpen || !props.isNew ? (
        <>
          <div className={styles["atribute__input-wrapper"]}>
            {!props.isNew ? (
              <p> {props.data?.key + " :" || ""}</p>
            ) : (
              <input
                placeholder="Ключ"
                defaultValue={props.data?.key || ""}
                onChange={(e: React.SyntheticEvent<HTMLInputElement>) =>
                  setData({ ...data, key: e.currentTarget.value })
                }
                required
              ></input>
            )}

            <input
              placeholder="Значение"
              defaultValue={props.data?.value || ""}
              onChange={handleValueChange}
            ></input>
          </div>

          <>
            {props.isNew && (
              <Button
                onClick={handleSubmitClick}
                classNames={styles["atribute__btn"]}
                imgUrl={submitIcon}
              />
            )}

            <Button
              classNames={`${styles["atribute__btn"]} ${
                !props.isNew ? styles["atribute__btn_offset"] : ""
              }`}
              onClick={() => {
                setFormIsOpen(false);
                props.onDecline && props.onDecline(data.key);
              }}
              imgUrl={declineIcon}
            />
          </>
        </>
      ) : (
        props.isNew && <Button onClick={handleAddBtn} imgUrl={addIcon} />
      )}
    </div>
  );
};
export default Atribute;
