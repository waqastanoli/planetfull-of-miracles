import express from 'express';
import orderController from '../controllers/order_controller';
const router = express.Router();

//============= BASE CALLS
router.route('/')
  // POST
  .post( orderController.create )
  // GET
  .get( orderController.getAll )

//============= CALLS BY ID
router.route('/:id')
  // GET
  .get( orderController.getById )  
  // DELETE
  .delete( orderController.remove )

export default router;