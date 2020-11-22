import React from "react";

const DishOrderTableHeader = () => {
  return (
    <thead className="thead-dark captionsHeading">
      <tr>
        <th>id</th>
        <th>Name</th>
        <th>Preparation Time</th>
        <th>Type</th>
        <th>No of slices</th>
        <th>Diameter</th>
        <th>Spiciness scale</th>
        <th>Slices of bread</th>
      </tr>
    </thead>
  );
};

export default DishOrderTableHeader;
