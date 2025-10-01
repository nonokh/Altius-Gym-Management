import Attendance from '../models/Attendance.js';
import Member from '../models/Member.js';

// @desc    Get attendance records
// @route   GET /api/attendance
// @access  Private
export const getAttendance = async (req, res) => {
  try {
    const { memberId, startDate, endDate, page = 1, limit = 20 } = req.query;
    
    const query = {};
    
    if (memberId) {
      query.member = memberId;
    }
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const attendance = await Attendance.find(query)
      .populate('member', 'firstName lastName email')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ checkInTime: -1 });

    const count = await Attendance.countDocuments(query);

    res.json({
      attendance,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Check in member
// @route   POST /api/attendance/checkin
// @access  Private
export const checkIn = async (req, res) => {
  try {
    const { memberId } = req.body;

    // Verify member exists
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Check if member is active
    if (member.status !== 'active') {
      return res.status(400).json({ message: 'Member is not active' });
    }

    // Check if already checked in today
    const today = new Date().setHours(0, 0, 0, 0);
    const existingAttendance = await Attendance.findOne({
      member: memberId,
      date: today,
      checkOutTime: { $exists: false },
    });

    if (existingAttendance) {
      return res.status(400).json({ message: 'Member already checked in' });
    }

    const attendance = await Attendance.create({
      member: memberId,
      checkInTime: new Date(),
      date: today,
    });

    const populatedAttendance = await Attendance.findById(attendance._id)
      .populate('member', 'firstName lastName email');

    res.status(201).json(populatedAttendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Check out member
// @route   PUT /api/attendance/checkout/:id
// @access  Private
export const checkOut = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);

    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    if (attendance.checkOutTime) {
      return res.status(400).json({ message: 'Member already checked out' });
    }

    attendance.checkOutTime = new Date();
    await attendance.save();

    const populatedAttendance = await Attendance.findById(attendance._id)
      .populate('member', 'firstName lastName email');

    res.json(populatedAttendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get today's attendance count
// @route   GET /api/attendance/today/count
// @access  Private
export const getTodayAttendance = async (req, res) => {
  try {
    const today = new Date().setHours(0, 0, 0, 0);
    const count = await Attendance.countDocuments({ date: today });
    
    res.json({ count, date: new Date(today) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
