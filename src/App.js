import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DishOrderForm from "./components/DishOrderForm";
import LoginFormListHeader from "./components/DishOrderTableHeader";
import DishOrderTable from "./components/DishOrderTable";
class App extends Component {
  counter = 0;
  constructor(props) {
    super(props);

    this.state = {
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
  }

  handleChangeGeneralValues = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    let dishes = this.state.dishes;
    dishes[name] = value;
    this.setState({
      dishes,
    });
    if (value === "") {
      this.setState({
        error: "",
      });
    }
  };

  handleDiameter = (e) => {
    const value = parseFloat(e.target.value);
    let dishes = this.state.dishes;
    dishes.diameter = value;
    this.setState({
      dishes,
    });
  };

  handleForSpecifiedValues = (e) => {
    const value = parseInt(e.target.value);
    const name = e.target.name;
    let dishes = this.state.dishes;
    dishes[name] = value;
    this.setState({
      dishes,
    });
  };

  getPositionForType = () => {
    switch (this.state.dishes.type) {
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
              value={this.state.dishes.no_of_slices}
              onChange={this.handleChangeGeneralValues}
            />
            {this.state.error ? (
              <strong className="d-flex justify-content-center">
                <span style={{ color: "red" }}>{this.state.error}</span>
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
                value={this.state.dishes.diameter}
                onChange={this.handleDiameter}
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
              value={this.state.dishes.spiciness_scale}
              onChange={this.handleForSpecifiedValues}
            />
            <p>{this.state.dishes.spiciness_scale}/10</p>
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
              value={this.state.dishes.slices_of_bread}
              onChange={this.handleForSpecifiedValues}
            />
            <br />
          </>
        );
      default:
        return "can't found ";
    }
  };

  getStatesForTypes() {
    switch (this.state.dishes.type) {
      case "pizza":
        return {
          name: this.state.dishes.name,
          preparation_time: this.state.dishes.preparation_time,
          type: this.state.dishes.type,
          no_of_slices: this.state.dishes.no_of_slices,
          diameter: this.state.dishes.diameter,
        };
      case "soup":
        return {
          name: this.state.dishes.name,
          preparation_time: this.state.dishes.preparation_time,
          type: this.state.dishes.type,
          spiciness_scale: this.state.dishes.spiciness_scale,
        };
      case "sandwich":
        return {
          name: this.state.dishes.name,
          preparation_time: this.state.dishes.preparation_time,
          type: this.state.dishes.type,
          slices_of_bread: this.state.dishes.slices_of_bread,
        };
      default:
        return "can't found ";
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let dish = this.getStatesForTypes();

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
            this.setState({
              dishResponse: dishResponse,
            });
            this.showTableOrder(dishResponse);
            this.cancelErrorForm();
          });
        }
        if (response.status === 400) {
          return response.json().then((res) => {
            this.showErrorForm(res);
          });
        }
        throw new Error("Something went wrong...");
      })
      .catch((error) => console.log(error));
  };

  showTableOrder() {
    this.setState({
      visibleOrderTable: true,
    });
  }

  showErrorForm(res) {
    let error = this.state.error;
    if (res.no_of_slices) {
      error = res.no_of_slices;
    }
    this.setState({
      error,
    });
  }

  cancelErrorForm() {
    this.setState({
      error: "",
    });
  }

  render() {
    const { dishes, dishResponse } = this.state;

    return (
      <>
        <DishOrderForm
          handleChangeGeneralValues={this.handleChangeGeneralValues}
          getPositionForType={this.getPositionForType}
          handleSubmit={this.handleSubmit}
          preparation_time={dishes.preparation_time}
        />
        {this.state.visibleOrderTable ? (
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
}

export default App;
