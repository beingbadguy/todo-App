import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

const signController = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      return res.status(400).json({
        message: 'Please fill all details cazrefully',
      });
    }
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({
        sucess: false,
        message: 'User already exits',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, username, password: hashedPassword });
    console.log('User has been created successfully');

    return res.status(200).json({
      success: true,
      message: 'User created successfully',
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Internal server error',
      error: err.message,
    });
  }
};

export default signController;
