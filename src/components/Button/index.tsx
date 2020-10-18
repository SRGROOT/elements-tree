import React from "react";

import styles from "./Button.module.scss";

interface IProps {
  submit?: boolean;
  imgUrl?: string;
  classNames?: string;
  onClick?: (e: React.SyntheticEvent) => any;
}

const Button: React.FC<IProps> = (props) => {
  return (
    <button
      className={`${styles["button"]} ${props.classNames || ""}`}
      onClick={(e) => (props.onClick ? props.onClick(e) : null)}
      type={props.submit ? "submit" : "button"}
    >
      {props.imgUrl && <img src={props.imgUrl} alt="" />}

      {props.children}
    </button>
  );
};

export default Button;
