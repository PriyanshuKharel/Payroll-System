const express = require("express");
const router = express.Router();
// const protect = require("../middleWare/authMiddleware");
const {
  createEmployee,
  getEmployees,
  getEmployee,
  deleteEmployee,
  updateEmployee,
  getPaidEmployees,
} = require("../controllers/employeeController");

router.post("/", createEmployee);
router.patch("/:id", updateEmployee);
router.get("/", getEmployees);
router.get("/job", getPaidEmployees);
router.get("/:id", getEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
