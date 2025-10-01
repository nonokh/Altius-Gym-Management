import mongoose from 'mongoose';

const membershipPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Plan name is required'],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: 1,
  },
  durationType: {
    type: String,
    enum: ['days', 'months', 'years'],
    default: 'months',
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0,
  },
  features: [{
    type: String,
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('MembershipPlan', membershipPlanSchema);
