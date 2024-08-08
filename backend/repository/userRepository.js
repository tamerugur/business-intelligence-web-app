const User = require('../models/userModel');

class UserRepository {
  async findByUsername(username) {
    return await User.findOne({username});
  }

  async findById(id) {
    return User.findOne({ id });
  }

  async findByPhoneNumber(phoneNumber) {
    return User.findOne({ phoneNumber });
  }

  async registerControl(username, id, phoneNumber) {
    const userByUsername = await this.findByUsername(username);
    const userById = await this.findById(id);
    const userByPhoneNumber = await this.findByPhoneNumber(phoneNumber);
    
    return {
      usernameTaken: !!userByUsername,
      idTaken: !!userById,
      phoneNumberTaken: !!userByPhoneNumber,
    };
  }

  async register(user) {
    try {
      return await User.create(user);
    } catch (error) {
      if (error.code === 11000) {
        throw new Error('Duplicate key error: ' + JSON.stringify(error.keyValue));
      }
      throw error;
    }
  }
}

module.exports = UserRepository;
