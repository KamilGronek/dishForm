export const generateValues = (dishes) => {
  return { type: "CHANGE_GENERATE_VALUES", dishes };
};

export const errorShow = () => ({
  type: "ERROR_SHOW",
  error: "",
});

export const responseShow = (dishResponse) => ({
  type: "RESPONSE_SHOW",
  dishResponse: dishResponse,
});

export const orderTableShow = () => ({
  type: "ORDER_TABLE_SHOW",
  visibleOrderTable: true,
});

export const errorShow2 = (error) => ({
  type: "ERROR_SHOW",
  error,
});
