import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEmployee } from "../../../redux/features/employee/employeeSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import DOMPurify from "dompurify";
import "./EmployeeDetail.scss";

const EmployeeDetail = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getEmployee(id));
  }, [dispatch, id]);

  const { employee, isLoading, isError, message } = useSelector(
    (state) => state.employee
  );
  console.log(employee);
  return (
    <div className="employee-detail">
      <h3 className="--mt">Employee Detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {employee && (
          <div className="detail">
            <h4>
              <span className="badge">Name: </span> &nbsp;{" "}
              {employee?.data?.name}
            </h4>
            <p>
              <b>&rarr; Email : </b>
              {employee?.data?.email}
            </p>
            <p>
              <b>&rarr; Salary : </b>
              {"$"} {employee?.data?.salary}
            </p>
            <p>
              <b>&rarr; VAT : </b>
              {employee?.data?.VAT} {"%"}
            </p>
            <p>
              <b>&rarr; TDS : </b>
              {employee?.data?.TDS} {"%"}
            </p>
            <p>
              <b>&rarr; SSF : </b>
              {employee?.data?.SSF}
            </p>
            <p>
              <b>&rarr; Remaining Amount : </b>
              {"$"} {employee?.data?.remainingAmount}
            </p>
            <p>
              <b>&rarr; Status : </b>
              {employee?.data?.status}
            </p>
            <p>
              <b>&rarr; Joined Date: </b> {employee?.data?.joinedDate}
            </p>
            <p>
              <b>&rarr; ContactNumber : </b>
              {employee?.data?.contactNumber}
            </p>
            {/* <p>
              <b>&rarr; Remaining : </b> {"$"}
              {employee.amount * employee.paidAmount}
            </p> */}
            <hr />
            {/* <code className="--color-dark">
              Created on: {employee.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {employee.updatedAt.toLocaleString("en-US")}
            </code> */}
          </div>
        )}
      </Card>
    </div>
  );
};

export default EmployeeDetail;
