import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaidEmployeeList from "../../components/product/paidEmployeeList/PaidEmployeeList";
import { getPaidEmployees } from "../../redux/features/employee/employeeSlice";

const PaidEmployee = () => {
  const dispatch = useDispatch();

  const { employees, isLoading } = useSelector((state) => state.employee);

  useEffect(() => {
    dispatch(getPaidEmployees(Status));
  }, []);
  return (
    <div>
      <PaidEmployeeList employees={employees} isLoading={isLoading} />
    </div>
  );
};

export default PaidEmployee;
