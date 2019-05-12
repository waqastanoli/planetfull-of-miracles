import express from 'express';
import topicController from '../controllers/topic_controller';
const router = express.Router();

router.route('/detail/:id')
  // GET
  .get( topicController.detail );

export default router;