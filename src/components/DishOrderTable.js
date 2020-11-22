import React, { Component } from "react";

class DishOrderTable extends Component {
  render() {
    const {
      id,
      name,
      preparation_time,
      type,
      no_of_slices,
      diameter,
      spiciness_scale,
      slices_of_bread,
    } = this.props.dishResponse;

    return (
      <>
        <tbody>
          <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{preparation_time}</td>
            <td>{type}</td>
            <td>{no_of_slices}</td>
            <td>{diameter}</td>
            <td>{spiciness_scale}</td>
            <td>{slices_of_bread}</td>
          </tr>
        </tbody>
      </>
    );
  }
}

export default DishOrderTable;
