import React from "react";

export const DishOrderTable = (props) => {
  return (
    <>
      <tbody>
        <tr>
          <td>{props.dishResponse.id}</td>
          <td>{props.dishResponse.name}</td>
          <td>{props.dishResponse.preparation_time}</td>
          <td>{props.dishResponse.type}</td>
          <td>{props.dishResponse.no_of_slices}</td>
          <td>{props.dishResponse.diameter}</td>
          <td>{props.dishResponse.spiciness_scale}</td>
          <td>{props.dishResponse.slices_of_bread}</td>
        </tr>
      </tbody>
    </>
  );
};
