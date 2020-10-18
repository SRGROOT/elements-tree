import React from "react";
import ElementsStore from "./ElementsStore";

const createStore = () => {
  return {
    ElementsStore: new ElementsStore(),
  };
};

export type Store = ReturnType<typeof createStore>;

export const storeContext = React.createContext<Store>(null);

export const Consumer = storeContext.Consumer;

const Provider: React.FC = (props) => {
  return (
    <storeContext.Provider value={createStore()}>
      {props.children}
    </storeContext.Provider>
  );
};

export default Provider;
