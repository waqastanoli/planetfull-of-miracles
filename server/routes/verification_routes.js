import express from 'express';
import userController from '../controllers/user_controller';
const router = express.Router();

//============= CALLS BY ID
router.route('/')
  // GET
  .get( userController.confirm )  

export default router;