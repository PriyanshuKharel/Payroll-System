import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/employees/`;

// Create New Employee
const createEmployee = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all employees
const getEmployees = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Employee
const deleteEmployee = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
// Get a Employee
const getEmployee = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// Update Employee
const updateEmployee = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};
//Get paid Employee
const getPaidEmployees = async (Status) => {
  const response = await axios.get(API_URL + Status);
};

const employeeService = {
  createEmployee,
  getEmployees,
  getEmployee,
  deleteEmployee,
  updateEmployee,
  getPaidEmployees,
};

export default employeeService;
