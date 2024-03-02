import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredEmployees: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_EMPLOYEES(state, action) {
      const { employees, search } = action.payload;
      // console.log(employees);
      const tempEmployees = employees.data?.filter((employee) => {
        return employee.name.toLowerCase().includes(search.toLowerCase());
      });

      state.filteredEmployees = tempEmployees;
    },
  },
});

export const { FILTER_EMPLOYEES } = filterSlice.actions;

export const selectFilteredEmployees = (state) =>
  state.filter.filteredEmployees;

export default filterSlice.reducer;
