import express from 'express';
import {
  getPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan,
} from '../controllers/planController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/').get(getPlans).post(authorize('admin'), createPlan);
router.route('/:id')
  .get(getPlanById)
  .put(authorize('admin'), updatePlan)
  .delete(authorize('admin'), deletePlan);

export default router;
