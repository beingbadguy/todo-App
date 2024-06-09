import Todo from '../models/todoModel.js';

const viewContoller = async (req, res) => {
  try {
    const { id } = req.params;
    const newTodo = await Todo.find({ user: id });

    res.status(201).json({
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
export default viewContoller;
