import express from 'express';
import {
  getMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
  getMemberStats,
} from '../controllers/memberController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/').get(getMembers).post(createMember);
router.route('/stats/overview').get(getMemberStats);
router.route('/:id').get(getMemberById).put(updateMember).delete(deleteMember);

export default router;
