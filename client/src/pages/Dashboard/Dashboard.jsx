import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmployeeList from "../../components/product/employeeList/EmployeeList";
import { getEmployees } from "../../redux/features/employee/employeeSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { employees, isLoading } = useSelector((state) => state.employee);

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  return (
    <div>
      <EmployeeList employees={employees} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;
