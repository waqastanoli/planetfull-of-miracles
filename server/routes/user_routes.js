import express from 'express';
import userController from '../controllers/user_controller';
const router = express.Router();

//============= BASE CALLS
router.route('/register')
  // POST
  .post( userController.create );
   // POST
router.route('/updateproud')
  .post( userController.updateproud ); 
    // POST
router.route('/updatecontract')
  .post( userController.updatecontract ); 

router.route('/updatetopic')
  // POST
  .post( userController.updatetopic );  
  
router.route('/profile/:name')
  // POST
  .get( userController.profile ); 
router.route('/pic/:id/:type')
  // POST
  .post( userController.profilepic );  
router.route('/:id')
  // POST
  .put( userController.updatesection );  
router.route('/signin')
  // POST
  .post( userController.login ); 

router.route('/verify')
  // POST
  .post( userController.confirm );   

export default router;