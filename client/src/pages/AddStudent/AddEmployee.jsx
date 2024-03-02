import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import {
  createEmployee,
  selectIsLoading,
} from "../../redux/features/employee/employeeSlice";
import EmployeeForm from "../../components/product/employeeForm/EmployeeForm";

const initialState = {
  name: "",
  email: "",
  contactNumber: "",
  status: "",
  salary: 0,
};

const AddEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(initialState);
  const isLoading = useSelector(selectIsLoading);

  const { name, email, contactNumber, status, salary } = employee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const saveEmployee = async (e) => {
    e.preventDefault();
    if (!name || !email || !contactNumber || !status || !salary) {
      alert("Please fill all the required fields");
      return;
    }

    const remainingAmount =
      salary - salary * 0.13 - salary * 0.013 - salary * 30;

    const formData = {
      name: employee.name,
      email: employee.email,
      salary: employee.salary,
      status: employee.status,
      contactNumber: employee.contactNumber,
      joinedDate: employee.joinedDate,
      VAT: 13,
      TDS: 1.3,
      SSF: 3000,
      remainingAmount,
    };
    await dispatch(createEmployee(formData));

    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Employee</h3>
      <EmployeeForm
        employee={employee}
        handleInputChange={handleInputChange}
        saveEmployee={saveEmployee}
      />
    </div>
  );
};

export default AddEmployee;
