const EmployeeService = require("../services/employeeService");
const employeeService = new EmployeeService();

class EmployeeController {
    async EmployeeRegister(req, res) {
        try {
            const employee = req.body;
            console.log("router test")
            const result = await employeeService.registerEmployee(employee);
            console.log("employee registered");
            console.log(employee);
            res.status(201).json(result);  // Send response back to client
        } catch (error) {
            console.error("Error registering employee:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async GetEmployees(req, res){
        try{
            console.log("in the employeeController, GetEmployees");
            const result = await employeeService.getEmployees();
            console.log(typeof(result));
            res.send(result);
        }catch(err){
            console.log("Error occured at employeeController: " + err)
        }
        
    }
}

module.exports = EmployeeController;