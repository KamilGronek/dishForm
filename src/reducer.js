// state
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

export const dishReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "CHOOSE_A_DISH": {
      const { dishes } = action;
      return { ...state, dishes };
    }
    case "SHOW_ORDERED_DISH": {
      const { visibleOrderTable } = action;
      return { ...state, visibleOrderTable };
    }
    case "SET_ERROR": {
      const { error } = action;
      return { ...state, error };
    }
    case "GET_RESPONSE": {
      const { dishResponse } = action;
      return { ...state, dishResponse };
    }
    default:
      return state;
  }
};

// selectors
export const getAlldishes = (state) => state.dishes;
export const getError = (state) => state.error;
export const isOrderVisible = (state) => state.visibleOrderTable;
export const getDishResponse = (state) => state.dishResponse;
