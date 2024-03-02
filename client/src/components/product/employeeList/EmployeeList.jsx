import React, { useState, useEffect } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./EmployeeList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import ReactPaginate from "react-paginate";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  FILTER_EMPLOYEES,
  selectFilteredEmployees,
} from "../../../redux/features/employee/filterSlice";

import {
  deleteEmployee,
  getEmployees,
} from "../../../redux/features/employee/employeeSlice";

const EmployeeList = ({ employees, isLoading }) => {
  const [search, setSearch] = useState("");

  const filteredEmployees = useSelector(selectFilteredEmployees) || [];

  const dispatch = useDispatch();
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delEmployee = async (id) => {
    console.log(id);
    await dispatch(deleteEmployee(id));
    await dispatch(getEmployees());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Employee",
      message: "Are you sure you want to delete employee.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delEmployee(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredEmployees.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredEmployees.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredEmployees]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % filteredEmployees.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_EMPLOYEES({ employees, search }));
  }, [employees, search, dispatch]);

  return (
    <div className="employee-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Inventory Items</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && employees.length === 0 ? (
            <p>`` No employee found, please add a employee</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Salary</th>
                  <th>Status</th>
                  <th>Contact Number</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((employee, index) => {
                  const { _id, name, email, salary, status, contactNumber } =
                    employee;

                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{email}</td>
                      <td>
                        {"$"} {salary}
                      </td>
                      <td>{status}</td>
                      <td>{contactNumber}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/employee-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-employee/${_id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default EmployeeList;
