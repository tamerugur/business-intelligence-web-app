const UserService = require("../services/userService");
const userService = new UserService();

class UserController {
  async login(req, res) {
    console.log("controller check");
    try {
      const { username, password } = req.body;
      console.log("test");
      const user = await userService.login(username, password);
  
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      const token = user.token;
      console.log("trying to send the cookie: " + token);
      res.cookie("token", token, { httpOnly: true, sameSite: 'Lax', secure: false });
      console.log("login successful");
  
      // Include the user data and token in the response
      res.status(200).json({ message: "Login successful", user, token });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }
  async logout(req, res) {
    console.log("logout processing...");
    return res
      .clearCookie("token", { path: '/' }) // Ensure the path matches where the cookie was set
      .status(200)
      .json({ message: "Successfully logged out 😏 🍀" });
  }
  async findByUsername(req, res) {
    try {
      const { username } = req.params;
      const user = await userService.findByUsername(username);
      if (!user) {
        return res.status(404).json({ message: "username not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async register(req, res){
    const data = {username: req.username, password: req.password, }
  }
}

module.exports = UserController;
