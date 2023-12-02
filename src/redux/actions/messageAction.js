const { createAction } = require("@reduxjs/toolkit");

export const setSuccessMessageAction = createAction(`message/setSuccessMessage`);
export const setErrorMessageAction = createAction(`message/setErrorMessage`);