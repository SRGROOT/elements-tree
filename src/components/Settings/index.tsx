import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";

import useStore from "stores/useStore";

import IElement from "types/IElement";
import { RequestState } from "types/RequestState";

import Button from "components/Button";
import Atribute, { IData } from "components/Atribute";

import submitIcon from "images/submitIcon.svg";

import styles from "./Settings.module.scss";

const Settings: React.FC = observer(() => {
  const { ElementsStore } = useStore();
  const [element, setElement] = useState<IElement>(ElementsStore.element);

  const handleSaveBtn = () => {
    element.type &&
      ElementsStore.updateElement(element).catch(() =>
        console.log("FAILED WHILE UPDATING ELEMENT")
      );
  };

  const handleDeleteAtributeBtn = (key: string) => {
    let newAtributes: IElement["atributes"] = element.atributes;

    delete newAtributes[key];
    setElement({ ...element, atributes: newAtributes });
  };

  const handleChangeCreateAtribute = (data: IData): boolean => {
    if (element.atributes.hasOwnProperty(data.key)) return false;

    setElement({
      ...element,
      atributes: { ...element.atributes, [data.key]: data.value },
    });

    return true;
  };

  const handleChangeValue = (key: string, newValue: string) => {
    let newAtributes: IElement["atributes"] = element.atributes;

    newAtributes[key] = newValue;
    setElement({ ...element, atributes: newAtributes });
  };

  useEffect(() => {
    setElement(ElementsStore.element);
  }, [ElementsStore.element]);

  const renderContent = () => {
    if (ElementsStore.state !== RequestState.SUCCESS) return null;

    if (!element?.id) return null;

    return (
      <>
        <label>
          Тип
          <input
            type="text"
            onChange={(e: React.SyntheticEvent<HTMLInputElement>) =>
              setElement({ ...element, type: e.currentTarget.value })
            }
            defaultValue={element.type}
          />
        </label>
        <p className={styles["settings__atributes-title"]}>Атрибуты</p>
        <div className={styles["settings__atributes-container"]}>
          {Object.keys(element.atributes).map((key) => (
            <Atribute
              key={key}
              data={{
                key,
                value: element.atributes[key].toString(),
              }}
              onDecline={handleDeleteAtributeBtn}
              onChangeValue={handleChangeValue}
            />
          ))}

          <Atribute isNew onSubmit={handleChangeCreateAtribute} />
        </div>

        <Button
          onClick={handleSaveBtn}
          classNames={styles["setting__btn-submit"]}
          imgUrl={submitIcon}
        />
      </>
    );
  };

  return (
    <div className={styles["settings"]}>
      <p className={styles["settings__title"]}>Панель свойств</p>
      {renderContent()}
    </div>
  );
});

export default Settings;
