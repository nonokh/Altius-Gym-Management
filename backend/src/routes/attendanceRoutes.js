import express from 'express';
import {
  getAttendance,
  checkIn,
  checkOut,
  getTodayAttendance,
} from '../controllers/attendanceController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/').get(getAttendance);
router.route('/checkin').post(checkIn);
router.route('/checkout/:id').put(checkOut);
router.route('/today/count').get(getTodayAttendance);

export default router;
