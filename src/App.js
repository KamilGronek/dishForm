import React, { useReducer } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { DishOrderForm } from "./components/DishOrderForm";
import LoginFormListHeader from "./components/DishOrderTableHeader";
import { DishOrderTable } from "./components/DishOrderTable";
import { GetPositionForType } from "./components/SwitchResultForType";

const stateReducer = (prevState, stateChanges) => {
  return {
    ...prevState,
    ...stateChanges,
  };
};
function App() {
  const initialState = {
    dishes: {
      name: "",
      preparation_time: "00:00:00",
      type: "pizza",
      no_of_slices: "",
      diameter: 0.01,
      spiciness_scale: 1,
      slices_of_bread: 1,
    },
    error: "",
    dishResponse: {},
    visibleOrderTable: false,
  };

  const [state, setState] = useReducer(stateReducer, initialState);

  const handleChangeGeneralValues = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    let dishes = state.dishes;
    dishes[name] = value;
    setState({
      dishes,
    });
    if (value === "") {
      setState({
        error: "",
      });
    }
  };

  const handleDiameter = (e) => {
    const value = parseFloat(e.target.value);
    let dishes = state.dishes;
    dishes.diameter = value;
    setState({
      dishes,
    });
  };

  const handleForSpecifiedValues = (e) => {
    const value = parseInt(e.target.value);
    const name = e.target.name;
    let dishes = state.dishes;
    dishes[name] = value;
    setState({
      dishes,
    });
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

  const getStatesForTypes = () => {
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
            setState({
              dishResponse: dishResponse,
            });
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
    setState({
      visibleOrderTable: true,
    });
  };

  const showErrorForm = (res) => {
    let error = state.error;
    if (res.no_of_slices) {
      error = res.no_of_slices;
    }
    setState({
      error,
    });
  };

  const cancelErrorForm = () => {
    setState({
      error: "",
    });
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
            <LoginFormListHeader />
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
