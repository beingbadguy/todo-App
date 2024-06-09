import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { configDotenv } from 'dotenv';
configDotenv();

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Enter your details carefully.',
      });
    }
    const userExists = await User.findOne({ username });
    if (!userExists) {
      return res.status(400).json({
        success: false,
        message: 'User does not exists. Please register first',
      });
    }
    const isMatch = await bcrypt.compare(password, userExists.password);
    const payload = {
      username: userExists.username,
      name: userExists.name,
      id: userExists._id,
    };
    if (isMatch) {
      const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: '1h',
      });
      res.cookie('token', token, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        secure: true,
        sameSite: false,
      
      });
      console.log('Login Successffull');
      return res.status(200).json({
        success: true,
        message: 'Login successfull',
        data: token,
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Internal server error ',
    });
  }
};

export default loginController;
