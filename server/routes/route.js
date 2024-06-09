import express from 'express';
const router = express.Router();
import signController from '../controllers/signController.js';
import loginController from '../controllers/loginContoller.js';
import verifiedPage from '../middlewares/Verify.js';
import todoController from '../controllers/todoController.js';
import viewContoller from '../controllers/viewController.js';
import deleteController from '../controllers/deleteController.js';

// routing occus here

router.post('/sign', signController);
router.post('/login', loginController);
router.post('/createTodo/:user', todoController);
router.get('/view/:id', viewContoller);
router.delete('/delete/:id', deleteController);

// protected routes

router.get('/user', verifiedPage, (req, res) => {
  // console.log(req.user);
  return res.status(200).json({
    success: true,
    data: req.user,
  });
});

router.get('/logout', (req, res) => {
  res.clearCookie('token', { path: '/' }); // 'token' should be replaced with your cookie name
  res.status(200).json({
    success: true,
    message: 'Cookie cleared',
  });
});

export default router;
