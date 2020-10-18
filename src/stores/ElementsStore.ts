import { action, decorate, observable } from "mobx";
import IElement from "types/IElement";
import { RequestState } from "types/RequestState";

class ElementsStore {
  element: IElement = null;
  jsonObj: string = "";
  state: RequestState = RequestState.PENDING;

  getElement = (id?: number) => {
    this.state = RequestState.LOADING;

    return fetch(`${process.env.REACT_APP_API_HOST}${id ? `?id=${id}` : ""}`)
      .then(async (res) => {
        switch (res.status) {
          case 200:
          case 201:
            return res.json();
          default:
            this.state = RequestState.ERROR;
            return Promise.reject();
        }
      })
      .then((res: IElement) => {
        if (Object.keys(res).length !== 0) this.element = res;

        this.state = RequestState.SUCCESS;
      });
  };

  getJson = () => {
    this.state = RequestState.LOADING;

    return fetch(`${process.env.REACT_APP_API_HOST}/json`)
      .then(async (res) => {
        switch (res.status) {
          case 200:
          case 201:
            return res.json();
          default:
            this.state = RequestState.ERROR;
            return Promise.reject();
        }
      })
      .then((res) => {
        this.jsonObj = JSON.stringify(res, null, 2);
        this.state = RequestState.SUCCESS;
      });
  };

  createElement = (newElement: IElement) => {
    this.state = RequestState.LOADING;

    return fetch(`${process.env.REACT_APP_API_HOST}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newElement),
    })
      .then(async (res) => {
        switch (res.status) {
          case 200:
          case 201:
            return res.json();
          default:
            this.state = RequestState.ERROR;
            return Promise.reject();
        }
      })
      .then((res: IElement) => {
        if (Object.keys(res).length !== 0) {
          if (res.parent_id !== null)
            this.element = {
              ...this.element,
              children: [res, ...this.element.children],
            };
          else this.element = res;
        }

        this.state = RequestState.SUCCESS;
      });
  };

  updateElement = (element: IElement) => {
    this.state = RequestState.LOADING;

    return fetch(`${process.env.REACT_APP_API_HOST}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(element),
    })
      .then(async (res) => {
        switch (res.status) {
          case 200:
          case 201:
            return res.json();
          default:
            this.state = RequestState.ERROR;
            return Promise.reject();
        }
      })
      .then((res: IElement) => {
        this.element = res;
        this.state = RequestState.SUCCESS;
      });
  };

  deleteElement = (id: number) => {
    this.state = RequestState.LOADING;

    return fetch(`${process.env.REACT_APP_API_HOST}?id=${id}`, {
      method: "DELETE",
    })
      .then(async (res) => {
        switch (res.status) {
          case 200:
          case 201:
            return res.json();
          default:
            this.state = RequestState.ERROR;
            return Promise.reject();
        }
      })
      .then((res: IElement) => {
        this.element = {
          ...this.element,
          children: this.element.children.filter((child) => child.id !== id),
        };
        this.state = RequestState.SUCCESS;
      });
  };
}

decorate(ElementsStore, {
  state: observable,
  element: observable,
  jsonObj: observable,
  getElement: action,
});

export default ElementsStore;
