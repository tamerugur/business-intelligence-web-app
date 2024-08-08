const bcrypt = require("bcrypt");
const UserRepository = require("../repository/userRepository");
const jwt = require("jsonwebtoken");
const userRepository = new UserRepository();
require("dotenv").config();
class UserService {
  async register(username, password, id, fullName, phoneNumber) {
    const { usernameTaken, idTaken, phoneNumberTaken } =
      await userRepository.registerControl(username, id, phoneNumber);

    if (usernameTaken) {
      throw new Error("Someone with that username already exists.");
    }
    if (idTaken) {
      throw new Error("You can only create one account with an ID.");
    }
    if (phoneNumberTaken) {
      throw new Error("You can only create one account with a phone number.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await userRepository.register({
        username,
        password: hashedPassword,
        id,
        fullName,
        phoneNumber,
      });
    } catch (error) {
      throw error;
    }

    return { message: "User registered successfully!" };
  }

  async login(username, password) {
    console.log("before findbyusername")
    const user = await userRepository.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      console.log("after if");
      const token = jwt.sign(
        {
          username: user.username,
          fullName: user.fullName,
          _id: user._id,
          phoneNumber: user.phoneNumber,
          id: user.id,
        },
        process.env.SECRET,
        {
          expiresIn: "1h",
        }
      );
      console.log(token);
      return {
        message: "Login successful!",
        token: token,
        user: {
          username: user.username,
          fullName: user.fullName,
          _id: user._id,
          phoneNumber: user.phoneNumber,
          id: user.id,
        },
      };
    }
    throw new Error("Invalid credentials!");
  }

  async findByUsername(username) {
    return await userRepository.findByUsername(username);
  }
}

module.exports = UserService;
