const Employee = require("../models/employeeModel");

class EmployeeRepository {
  async employeeRegister(employee) {
    try {
      return await Employee.create(employee);
    } catch (error) {
      if (error.code === 11000) {
        throw new Error(
          "Duplicate key error: " + JSON.stringify(error.keyValue)
        );
      }
      throw error;
    }
  }
  
  async getEmployees(){
    try {
      console.log("in repos")
      return await Employee.find().exec();
    } catch (err) {
      console.error("Error occurred in getEmployees: " + err);
      throw err;
    }
  }
  
}

module.exports = EmployeeRepository;
