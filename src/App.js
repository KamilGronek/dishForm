import React, { useEffect, useState } from "react";
import { useStore } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import DishOrderForm from "./components/DishOrderForm";
import DishOrderTableHeader from "./components/DishOrderTableHeader";
import DishOrderTable from "./components/DishOrderTable";
import GetPositionForType from "./components/GetPositionForType";
// import GetStateForType from "./components/GetStateForType";
// import { Reducer } from "./Reducers";
import {
  generateValues,
  errorShow,
  responseShow,
  orderTableShow,
  errorShow2,
} from "./Actions";

// import { createStore } from "redux";
// const store = createStore(Reducer);

function useForceUpdate() {
  const [updateCounter, setUpdateCounter] = useState(0);
  function forceUpdate() {
    setUpdateCounter((prevCounter) => prevCounter + 1);
  }
  return forceUpdate;
}

function App() {
  const store = useStore();
  const forceUpdate = useForceUpdate();
  const state = store.getState();
  const dispatch = store.dispatch;
  useEffect(() => store.subscribe(forceUpdate), []);

  // const [state, dispatch] = useReducer(Reducer, undefined, Reducer);

  const handleChangeGeneralValues = (e, error) => {
    const value = e.target.value;
    const name = e.target.name;
    let dishes = state.dishes;
    dishes[name] = value;
    dispatch(generateValues(dishes));

    if (value === "") {
      dispatch(errorShow(error));
    }
  };

  const handleDiameter = (e) => {
    const value = parseFloat(e.target.value);
    let dishes = state.dishes;
    dishes.diameter = value;
    dispatch(generateValues(dishes));
  };

  const handleForSpecifiedValues = (e) => {
    const value = parseInt(e.target.value);
    const name = e.target.name;
    let dishes = state.dishes;
    dishes[name] = value;
    dispatch(generateValues(dishes));
  };

  const getPositionForType = () => {
    return (
      <GetPositionForType
        type={state.dishes.type}
        no_of_slices={state.dishes.no_of_slices}
        handleChangeGeneralValues={handleChangeGeneralValues}
        error={state.error}
        diameter={state.dishes.diameter}
        handleDiameter={handleDiameter}
        spiciness_scale={state.dishes.spiciness_scale}
        slices_of_bread={state.dishes.slices_of_bread}
        handleForSpecifiedValues={handleForSpecifiedValues}
      />
    );
  };

  const getStateForType = () => {
    switch (state.dishes.type) {
      case "pizza":
        return {
          name: state.dishes.name,
          preparation_time: state.dishes.preparation_time,
          type: state.dishes.type,
          no_of_slices: state.dishes.no_of_slices,
          diameter: state.dishes.diameter,
        };
      case "soup":
        return {
          name: state.dishes.name,
          preparation_time: state.dishes.preparation_time,
          type: state.dishes.type,
          spiciness_scale: state.dishes.spiciness_scale,
        };
      case "sandwich":
        return {
          name: state.dishes.name,
          preparation_time: state.dishes.preparation_time,
          type: state.dishes.type,
          slices_of_bread: state.dishes.slices_of_bread,
        };
      default:
        return "can't found ";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let dish = getStateForType();

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
            dispatch(responseShow(dishResponse));
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

  const showTableOrder = (visibleOrderTable) => {
    dispatch(orderTableShow(visibleOrderTable));
  };

  const showErrorForm = (res) => {
    let error = state.error;
    if (res.no_of_slices) {
      error = res.no_of_slices;
    }
    dispatch(errorShow2(error));
  };

  const cancelErrorForm = (error) => {
    dispatch(errorShow(error));
  };

  return (
    <>
      <DishOrderForm
        handleChangeGeneralValues={handleChangeGeneralValues}
        getPositionForType={getPositionForType}
        handleSubmit={handleSubmit}
        preparation_time={state.dishes.preparation_time}
      />
      {state.visibleOrderTable ? (
        <div className="container ">
          <div className="text-center">
            <h1 className="display-4 captionOrder">Dishes order:</h1>
          </div>
          <table className="table table-striped table-hover table-sm table-responsive-sm col-lg-10 offset-lg-1">
            <DishOrderTableHeader />
            <DishOrderTable dishResponse={state.dishResponse} />
          </table>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
