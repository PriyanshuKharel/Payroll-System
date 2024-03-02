import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./features/employee/employeeSlice";
import filterReducer from "./features/employee/filterSlice";

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    filter: filterReducer,
  },
});
