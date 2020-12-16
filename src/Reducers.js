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

export function Reducer(state, action) {
  if (typeof state === "undefined") {
    return initialState;
  }
  switch (action.type) {
    case "CHANGE_GENERATE_VALUES":
      const { dishes } = action;
      return { ...state, dishes };
    case "ERROR_SHOW":
      const { error } = action;
      return { ...state, error };
    case "RESPONSE_SHOW":
      const { dishResponse } = action;
      return { ...state, dishResponse };
    case "ORDER_TABLE_SHOW":
      const { visibleOrderTable } = action;
      return { ...state, visibleOrderTable };
    default:
      return state;
  }
}
