import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true,
  },
  checkInTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  checkOutTime: {
    type: Date,
  },
  date: {
    type: Date,
    required: true,
    default: () => new Date().setHours(0, 0, 0, 0),
  },
  notes: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

// Index for faster queries
attendanceSchema.index({ member: 1, date: 1 });

export default mongoose.model('Attendance', attendanceSchema);
