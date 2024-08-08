const EmployeeRepository = require("../repository/employeeRepository");

const employeeRepository = new EmployeeRepository();

class EmployeeService {
    async registerEmployee(employee) {
      try {
        await employeeRepository.employeeRegister(employee);
        return true;  
      } catch (error) {
        console.error("Error registering employee:", error);
        throw error;
      }
    }
  
  async registerEmployeeControl(req, res) {
    try {
      const test = employeeRepository.getRegister
      test = req.params
      console.log(req.params)
      return employeeRepository.getRegister;
    } catch (error) {
      console.log("Error occured at employeeService: " + err)
      throw error;
    }
  }

  async getEmployees(){
    try{
      console.log("in service");
      const result = await employeeRepository.getEmployees();
      // console.log(result);
      return result;
    }catch(err){

    }
    
  }
}

module.exports = EmployeeService;
