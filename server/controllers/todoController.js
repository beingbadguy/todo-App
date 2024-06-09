import mongoose from 'mongoose';
import Todo from '../models/todoModel.js';

const todoController = async (req, res) => {
  try {
    const { user } = req.params;
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all details carefully',
      });
    }
    const newTodo = await Todo.create({ user, title, description });
    return res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: newTodo,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};
export default todoController;
