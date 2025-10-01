import express from 'express';
import {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
  getPaymentStats,
} from '../controllers/paymentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/').get(getPayments).post(createPayment);
router.route('/stats/overview').get(getPaymentStats);
router.route('/:id').get(getPaymentById).put(updatePayment).delete(deletePayment);

export default router;
