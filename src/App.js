import React, { useReducer, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { DishOrderForm } from "./components/DishOrderForm";
import LoginFormListHeader from "./components/DishOrderTableHeader";
import { DishOrderTable } from "./components/DishOrderTable";
import { GetPositionForType } from "./components/SwitchResultForType";
import {
  dishReducer,
  getAlldishes,
  getError,
  isOrderVisible,
  getDishResponse,
} from "./reducer";
import {
  chooseAdish,
  getResponse,
  showOrderDish,
  setError,
  returnError,
} from "./actions";
import { createStore } from "redux";

const store = createStore(dishReducer);
// window.store = store;
// store.subscribe(() => console.log(store.getState()));

function useForceUpdate() {
  const [updateCounter, setUpdateState] = useState(0);
  function forceUpdate() {
    setUpdateState((prevCounter) => prevCounter + 1);
  }
  return forceUpdate;
}

function App() {
  const forceUpdate = useForceUpdate();
  const state = store.getState();
  const dispatch = store.dispatch;
  useEffect(() => store.subscribe(forceUpdate), []);

  // const [state, dispatch] = useReducer(dishReducer, undefined, dishReducer);

  const handleChangeGeneralValues = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    let dishes = getAlldishes(state);
    dishes[name] = value;
    dispatch(chooseAdish(dishes));
    if (value === "") {
      dispatch(setError());
    }
  };

  const handleDiameter = (e) => {
    const value = parseFloat(e.target.value);
    let dishes = getAlldishes(state);
    dishes.diameter = value;
    dispatch(chooseAdish(dishes));
    store.dispatch(chooseAdish(dishes));
  };

  const handleForSpecifiedValues = (e) => {
    const value = parseInt(e.target.value);
    const name = e.target.name;
    let dishes = getAlldishes(state);
    dishes[name] = value;
    dispatch(chooseAdish(dishes));
  };

  const getPositionForType = () => {
    return (
      <GetPositionForType
        type={getAlldishes(state).type}
        no_of_slices={getAlldishes(state).no_of_slices}
        handleChangeGeneralValues={handleChangeGeneralValues}
        error={getError(state)}
        diameter={getAlldishes(state).diameter}
        handleDiameter={handleDiameter}
        spiciness_scale={getAlldishes(state).spiciness_scale}
        slices_of_bread={getAlldishes(state).slices_of_bread}
        handleForSpecifiedValues={handleForSpecifiedValues}
      />
    );
  };

  const getStatesForTypes = () => {
    switch (getAlldishes(state).type) {
      case "pizza":
        return {
          name: getAlldishes(state).name,
          preparation_time: getAlldishes(state).preparation_time,
          type: getAlldishes(state).type,
          no_of_slices: getAlldishes(state).no_of_slices,
          diameter: getAlldishes(state).diameter,
        };
      case "soup":
        return {
          name: getAlldishes(state).name,
          preparation_time: getAlldishes(state).preparation_time,
          type: getAlldishes(state).type,
          spiciness_scale: getAlldishes(state).spiciness_scale,
        };
      case "sandwich":
        return {
          name: getAlldishes(state).name,
          preparation_time: getAlldishes(state).preparation_time,
          type: getAlldishes(state).type,
          slices_of_bread: getAlldishes(state).slices_of_bread,
        };
      default:
        return "can't found ";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let dish = getStatesForTypes();

    let piecesOfPizza = dish.no_of_slices;

    const isDigit = (str) => /^\d+$/.test(str);

    if (isDigit(piecesOfPizza)) {
      dish.no_of_slices = parseInt(piecesOfPizza);
    }
    let dishReqestBody = JSON.stringify(dish);
    fetch("https://frosty-wood-6558.getsandbox.com:443/dishes", {
      method: "post",
      body: dishReqestBody,
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json().then((dishResponse) => {
            dispatch(getResponse(dishResponse));
            showTableOrder(dishResponse);
            cancelErrorForm();
          });
        }
        if (response.status === 400) {
          return response.json().then((res) => {
            showErrorForm(res);
          });
        }
        throw new Error("Something went wrong...");
      })
      .catch((error) => console.log(error));
  };

  const showTableOrder = () => {
    dispatch(showOrderDish());
  };

  const showErrorForm = (res) => {
    let error = getError(state);
    if (res.no_of_slices) {
      error = res.no_of_slices;
    }
    dispatch(returnError(error));
  };

  const cancelErrorForm = () => {
    dispatch(setError());
  };

  return (
    <>
      <DishOrderForm
        handleChangeGeneralValues={handleChangeGeneralValues}
        getPositionForType={getPositionForType}
        handleSubmit={handleSubmit}
        preparation_time={getAlldishes(state).preparation_time}
      />
      {isOrderVisible(state) ? (
        <div className="container ">
          <div className="text-center">
            <h1 className="display-4 captionOrder">Dishes order:</h1>
          </div>
          <table className="table table-striped table-hover table-sm table-responsive-sm col-lg-10 offset-lg-1">
            <LoginFormListHeader />
            <DishOrderTable dishResponse={getDishResponse(state)} />
          </table>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
