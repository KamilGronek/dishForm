import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DishOrderForm from "./components/DishOrderForm";
import LoginFormListHeader from "./components/DishOrderTableHeader";
import DishOrderTable from "./components/DishOrderTable";

function App(){
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     dishes: {
  //       name: "",
  //       preparation_time: "00:00:00",
  //       type: "pizza",
  //       no_of_slices: "",
  //       diameter: 0.01,
  //       spiciness_scale: 1,
  //       slices_of_bread: 1,
  //     },
  //     error: "",
  //     dishResponse: {},
  //     visibleOrderTable: false,
  //   };
  // }


  const [dishes, setDishes] = useState({
          name: "",
          preparation_time: "00:00:00",
          type: "pizza",
          no_of_slices: "",
          diameter: 0.01,
          spiciness_scale: 1,
          slices_of_bread: 1,
  })

  const [ error , setError] = useState("")
  const [ dishResponse, setDishResponse] = useState({})
  const [visibleOrderTable, setVisibleOrderTable] = useState(false)

 const handleChangeGeneralValues=(e)=> {
    const value = e.target.value;
    const name = e.target.name;
    // let dishes = dishes;
    dishes[name] = value;
     setDishes(dishes)
    if (value === "") {
    setError("")
    }
  }

 const handleDiameter=(e)=> {
    const value = parseFloat(e.target.value);
    // let dishes = dishes;
    dishes.diameter = value;
   setDishes(dishes)
  }

  const handleForSpecifiedValues=(e)=> {
    const value = parseInt(e.target.value);
    const name = e.target.name;
    // let dishes = dishes;
    dishes[name] = value;
    setDishes(dishes)
  }

  const getPositionForType = () => {
    switch (dishes.type) {
      case "pizza":
        return (
          <>
            <label className="label">
              <b>No of slices:</b>
            </label>
            <input
              className="form-control"
              type="text"
              name="no_of_slices"
              placeholder="No of slices"
              value={dishes.no_of_slices}
              onChange={handleChangeGeneralValues}
            />
            {error ? (
              <strong className="d-flex justify-content-center">
                <span style={{ color: "red" }}>{error}</span>
              </strong>
            ) : (
              ""
            )}
            <label className="label">
              <b>Diameter:</b>
            </label>
            <div className="field">
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="diameter"
                value={dishes.diameter}
                onChange={handleDiameter}
              />
            </div>
            <br />
          </>
        );
      case "soup":
        return (
          <>
            <label className="label">
              {" "}
              <b>Spiciness scale:</b>
            </label>

            <input
              className="progress_bar_input form-control"
              type="range"
              step="1"
              min="1"
              max="10"
              name="spiciness_scale"
              value={dishes.spiciness_scale}
              onChange={handleForSpecifiedValues}
            />
            <p>{dishes.spiciness_scale}/10</p>
          </>
        );
      case "sandwich":
        return (
          <>
            <label className="label">
              <b>Slices of bread:</b>
            </label>
            <input
              className="form-control"
              type="number"
              min="1"
              max="12"
              name="slices_of_bread"
              value={dishes.slices_of_bread}
              onChange={handleForSpecifiedValues}
            />
            <br />
          </>
        );
      default:
        return "can't found ";
    }
  };

  const getStatesForTypes=()=> {
    switch (dishes.type) {
      case "pizza":
        return {
          name: dishes.name,
          preparation_time: dishes.preparation_time,
          type: dishes.type,
          no_of_slices: dishes.no_of_slices,
          diameter: dishes.diameter,
        };
      case "soup":
        return {
          name: dishes.name,
          preparation_time: dishes.preparation_time,
          type: dishes.type,
          spiciness_scale: dishes.spiciness_scale,
        };
      case "sandwich":
        return {
          name: dishes.name,
          preparation_time: dishes.preparation_time,
          type: dishes.type,
          slices_of_bread: dishes.slices_of_bread,
        };
      default:
        return "can't found ";
    }
  }

  const handleSubmit=(e)=> {
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
            setDishResponse(dishResponse)
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
  }

  const showTableOrder=()=> {
    setVisibleOrderTable(true)
  }

  const  showErrorForm=(res)=> {
    let error = null;
    if (res.no_of_slices) {
      error = res.no_of_slices;
    }
    setError(error)
  }

  const cancelErrorForm=()=> {
    setError(error)
  }


    // const { dishes, dishResponse } = this.state;

    return (
      <>
        <DishOrderForm
          handleChangeGeneralValues={handleChangeGeneralValues}
          getPositionForType={getPositionForType}
          handleSubmit={handleSubmit}
          preparation_time={dishes.preparation_time}
        />
        {visibleOrderTable ? (
          <div className="container ">
            <div className="text-center">
              <h1 className="display-4 captionOrder">Dishes order:</h1>
            </div>
            <table className="table table-striped table-hover table-sm table-responsive-sm col-lg-10 offset-lg-1">
              <LoginFormListHeader />
              <DishOrderTable dishResponse={dishResponse} />
            </table>
          </div>
        ) : (
          ""
        )}
      </>
    );
}

export default App;
