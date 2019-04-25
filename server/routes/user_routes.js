import express from 'express';
import userController from '../controllers/user_controller';
const router = express.Router();

//============= BASE CALLS
router.route('/register')
  // POST
  .post( userController.create );

router.route('/signin')
  // POST
  .post( userController.login ); 

router.route('/verify')
  // POST
  .post( userController.confirm );   

export default router;