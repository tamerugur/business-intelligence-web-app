const express = require("express");
const router = express.Router();
const EmployeeController = require("../controllers/employeeController");

const employeeController = new EmployeeController();

router.post("/register", async (req, res) => {
    console.log("Request body:", req.body); // Log request body
    try {
      const result = await employeeController.EmployeeRegister(req, res);
      console.log("Response sent:", result); // Log response
    } catch (error) {
      console.error("Error occurred:", error);
    }
  });

router.get("/getemployees", async (req, res) => employeeController.GetEmployees(req, res));

module.exports = router;
