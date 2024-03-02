const asyncHandler = require("express-async-handler");
const Employee = require("../models/employeeModel");
const cron = require("node-cron");

const createEmployee = asyncHandler(async (req, res) => {
  const {
    name,
    salary,
    email,
    remainingAmount,
    joinedDate,
    status,
    contactNumber,
  } = req.body;
  const employee = await Employee.create({
    name,
    salary,
    email,
    remainingAmount,
    joinedDate,
    status,
    contactNumber,
  });

  res.status(201).json({
    success: true,
    employee,
  });
});

const getEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find();
  if (employees.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No employee Found",
    });
  }
  return res.status(200).json({
    success: true,
    data: employees,
  });
});

const getPaidEmployees = asyncHandler(async (req, res) => {
  const status = req.query.status || "paid";
  const employees = await Employee.find({ status });
  if (employees.length === 0) {
    return res.status(404).json({
      success: false,
      message: `No ${status} employees found`,
    });
  }
  return res.status(200).json({
    success: true,
    data: employees,
  });
});

const getEmployee = async (req, res) => {
  const { id } = req.params;
  const employee = await Employee.findById(id);
  if (!employee) {
    return res.status(404).json({
      success: false,
      message: "No employee available",
    });
  }
  return res.status(200).json({
    success: true,
    data: employee,
  });
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const updatedEmployee = await Employee.findByIdAndUpdate(
    { _id: id },
    { ...data },
    { new: true }
  );

  res.status(200).json({
    success: true,
    data: updatedEmployee,
  });
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const employee = await Employee.deleteOne({ _id: id });
  if (!employee) {
    return res.status(404).json({
      success: false,
      message: "Employee not Found",
    });
  }
  return res.status(200).json({
    success: true,
    data: employee,
  });
};

cron.schedule(" 0 0 0 * * *", async () => {
  const thirtyDaysAfter = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  // const thirtyDaysAfter = new Date(Date.now() - 1 * 60 * 1000);;
  await Employee.updateMany(
    {
      status: "paid",
      createdAt: { $lt: thirtyDaysAfter },
    },
    {
      $set: { status: "unpaid" },
    }
  );
  console.log("Updated status of employee from paid to unpaid");
});

// Cron try
// cron.schedule("*/5 * * * * *", function () {
//   console.log("-------");
//   console.log("Running cron");
// });

module.exports = {
  createEmployee,
  getEmployees,
  getPaidEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
