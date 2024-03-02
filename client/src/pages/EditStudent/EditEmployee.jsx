import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import EmployeeForm from "../../components/product/employeeForm/EmployeeForm";
import {
  getEmployees,
  selectEmployee,
  selectIsLoading,
  setSelectedEmployee,
  updateEmployee,
} from "../../redux/features/employee/employeeSlice";

const EditEmployee = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const employeeEdit = useSelector(selectEmployee);

  const [employee, setEmployee] = useState(employeeEdit);

  useEffect(() => {
    dispatch(setSelectedEmployee(id));
  }, []);

  useEffect(() => {
    setEmployee(employeeEdit);
  }, [employeeEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const saveEmployee = async (e) => {
    e.preventDefault();

    const remainingAmount =
      employee.salary -
      employee.salary * employee.VAT -
      employee.salary * employee.TDS -
      employee.salary * employee.SSF;

    const formData = {
      name: employee.name,
      email: employee.email,
      salary: employee.salary,
      status: employee.status,
      contactNumber: employee.contactNumber,
      joinedDate: employee.joinedDate,
      VAT: employee.VAT,
      TDS: employee.TDS,
      SSF: employee.SSF,
      remainingAmount,
    };
    console.log("fhaofhoaf", formData, employee);
    await dispatch(updateEmployee({ id, formData }));
    await dispatch(getEmployees());

    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Employee</h3>
      <EmployeeForm
        employee={employee}
        handleInputChange={handleInputChange}
        saveEmployee={saveEmployee}
      />
    </div>
  );
};

export default EditEmployee;
