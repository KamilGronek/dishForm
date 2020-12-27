export const chooseAdish = (dishes) => {
  return { type: "CHOOSE_A_DISH", dishes };
};

export const getResponse = (dishResponse) => ({
  type: "GET_RESPONSE",
  dishResponse: dishResponse,
});

export const showOrderDish = () => ({
  type: "SHOW_ORDERED_DISH",
  visibleOrderTable: true,
});

export const setError = () => ({
  type: "SET_ERROR",
  error: "",
});

export const returnError = (error) => ({
  type: "SET_ERROR",
  error,
});
