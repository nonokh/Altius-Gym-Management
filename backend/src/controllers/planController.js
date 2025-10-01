import MembershipPlan from '../models/MembershipPlan.js';

// @desc    Get all membership plans
// @route   GET /api/plans
// @access  Private
export const getPlans = async (req, res) => {
  try {
    const { isActive } = req.query;
    const query = isActive !== undefined ? { isActive: isActive === 'true' } : {};
    
    const plans = await MembershipPlan.find(query).sort({ price: 1 });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single plan
// @route   GET /api/plans/:id
// @access  Private
export const getPlanById = async (req, res) => {
  try {
    const plan = await MembershipPlan.findById(req.params.id);
    
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new plan
// @route   POST /api/plans
// @access  Private (Admin)
export const createPlan = async (req, res) => {
  try {
    const plan = await MembershipPlan.create(req.body);
    res.status(201).json(plan);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Plan with this name already exists' });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update plan
// @route   PUT /api/plans/:id
// @access  Private (Admin)
export const updatePlan = async (req, res) => {
  try {
    const plan = await MembershipPlan.findById(req.params.id);
    
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    const updatedPlan = await MembershipPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete plan
// @route   DELETE /api/plans/:id
// @access  Private (Admin)
export const deletePlan = async (req, res) => {
  try {
    const plan = await MembershipPlan.findById(req.params.id);
    
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    await plan.deleteOne();
    res.json({ message: 'Plan removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
