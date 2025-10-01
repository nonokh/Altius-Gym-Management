import Payment from '../models/Payment.js';
import Member from '../models/Member.js';

// @desc    Get all payments
// @route   GET /api/payments
// @access  Private
export const getPayments = async (req, res) => {
  try {
    const { memberId, status, startDate, endDate, page = 1, limit = 20 } = req.query;
    
    const query = {};
    
    if (memberId) {
      query.member = memberId;
    }
    
    if (status) {
      query.status = status;
    }
    
    if (startDate || endDate) {
      query.paymentDate = {};
      if (startDate) query.paymentDate.$gte = new Date(startDate);
      if (endDate) query.paymentDate.$lte = new Date(endDate);
    }

    const payments = await Payment.find(query)
      .populate('member', 'firstName lastName email')
      .populate('membershipPlan', 'name price')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ paymentDate: -1 });

    const count = await Payment.countDocuments(query);

    res.json({
      payments,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single payment
// @route   GET /api/payments/:id
// @access  Private
export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('member', 'firstName lastName email')
      .populate('membershipPlan', 'name price');
    
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new payment
// @route   POST /api/payments
// @access  Private
export const createPayment = async (req, res) => {
  try {
    const { member: memberId } = req.body;

    // Verify member exists
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    const payment = await Payment.create(req.body);
    
    const populatedPayment = await Payment.findById(payment._id)
      .populate('member', 'firstName lastName email')
      .populate('membershipPlan', 'name price');

    res.status(201).json(populatedPayment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update payment
// @route   PUT /api/payments/:id
// @access  Private
export const updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('member', 'firstName lastName email')
      .populate('membershipPlan', 'name price');

    res.json(updatedPayment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete payment
// @route   DELETE /api/payments/:id
// @access  Private
export const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    await payment.deleteOne();
    res.json({ message: 'Payment removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get payment statistics
// @route   GET /api/payments/stats/overview
// @access  Private
export const getPaymentStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const query = { status: 'completed' };
    
    if (startDate || endDate) {
      query.paymentDate = {};
      if (startDate) query.paymentDate.$gte = new Date(startDate);
      if (endDate) query.paymentDate.$lte = new Date(endDate);
    }

    const result = await Payment.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ]);

    const stats = result.length > 0 ? result[0] : { totalRevenue: 0, count: 0 };

    res.json({
      totalRevenue: stats.totalRevenue,
      transactionCount: stats.count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
