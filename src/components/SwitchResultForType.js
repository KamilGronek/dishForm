import React from "react";

export const GetPositionForType = (props) => {
  switch (props.type) {
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
            value={props.no_of_slices}
            onChange={props.handleChangeGeneralValues}
          />
          {props.error ? (
            <strong className="d-flex justify-content-center">
              <span style={{ color: "red" }}>{props.error}</span>
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
              value={props.diameter}
              onChange={props.handleDiameter}
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
            value={props.spiciness_scale}
            onChange={props.handleForSpecifiedValues}
          />
          <p>{props.spiciness_scale}/10</p>
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
            value={props.slices_of_bread}
            onChange={props.handleForSpecifiedValues}
          />
          <br />
        </>
      );
    default:
      return "can't found ";
  }
};
