import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./EmployeeForm.scss";

const EmployeeForm = ({ employee, handleInputChange, saveEmployee }) => {
  return (
    <div className="add-employee">
      <Card cardClass={"card"}>
        <form onSubmit={saveEmployee}>
          <label>Employee Name:</label>
          <input
            type="text"
            placeholder="Employee name"
            name="name"
            value={employee?.name}
            onChange={handleInputChange}
          />

          <label>Employee Email:</label>
          <input
            type="text"
            placeholder="Employee Email"
            name="email"
            value={employee?.email}
            onChange={handleInputChange}
          />

          <label>Employee Salary:</label>
          <input
            type="text"
            placeholder="Salary"
            name="salary"
            value={employee?.salary}
            onChange={handleInputChange}
          />

          <label>Employee Status:</label>
          <div>
            <label>
              <input
                type="radio"
                name="status"
                value="unpaid"
                checked={employee?.status === "unpaid"}
                onChange={handleInputChange}
              />
              Unpaid
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="paid"
                checked={employee?.status === "paid"}
                onChange={handleInputChange}
              />
              Paid
            </label>
          </div>

          <label>Employee ContactNumber:</label>
          <input
            type="text"
            placeholder="Number"
            name="contactNumber"
            value={employee?.contactNumber}
            onChange={handleInputChange}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Employee
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

EmployeeForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
EmployeeForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default EmployeeForm;
