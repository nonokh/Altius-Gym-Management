import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { paymentService, memberService, planService } from '../services';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    member: '',
    membershipPlan: '',
    amount: '',
    paymentMethod: 'cash',
    status: 'completed',
  });

  useEffect(() => {
    fetchPayments();
    fetchMembers();
    fetchPlans();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const data = await paymentService.getAll({ limit: 50 });
      setPayments(data.payments);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const data = await memberService.getAll({ limit: 100 });
      setMembers(data.members);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const fetchPlans = async () => {
    try {
      const data = await planService.getAll();
      setPlans(data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await paymentService.create(formData);
      setShowModal(false);
      resetForm();
      fetchPayments();
      alert('Payment recorded successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Error recording payment');
    }
  };

  const resetForm = () => {
    setFormData({
      member: '',
      membershipPlan: '',
      amount: '',
      paymentMethod: 'cash',
      status: 'completed',
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div>
      <div className="header">
        <h1>Payments</h1>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <FaPlus /> Record Payment
          </button>
        </div>
      </div>

      <div className="card">
        {loading ? (
          <div className="loading"><div className="spinner"></div></div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Plan</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                      No payment records found
                    </td>
                  </tr>
                ) : (
                  payments.map(payment => (
                    <tr key={payment._id}>
                      <td>{payment.member?.firstName} {payment.member?.lastName}</td>
                      <td>{payment.membershipPlan?.name || 'N/A'}</td>
                      <td>₹{payment.amount}</td>
                      <td>{payment.paymentMethod}</td>
                      <td>{formatDate(payment.paymentDate)}</td>
                      <td>
                        <span className={`badge badge-${payment.status === 'completed' ? 'success' : 'warning'}`}>
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">Record Payment</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Member</label>
                <select
                  className="form-select"
                  value={formData.member}
                  onChange={(e) => setFormData({ ...formData, member: e.target.value })}
                  required
                >
                  <option value="">Select Member</option>
                  {members.map(member => (
                    <option key={member._id} value={member._id}>
                      {member.firstName} {member.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Membership Plan</label>
                <select
                  className="form-select"
                  value={formData.membershipPlan}
                  onChange={(e) => {
                    const plan = plans.find(p => p._id === e.target.value);
                    setFormData({ 
                      ...formData, 
                      membershipPlan: e.target.value,
                      amount: plan ? plan.price : ''
                    });
                  }}
                >
                  <option value="">Select Plan (Optional)</option>
                  {plans.map(plan => (
                    <option key={plan._id} value={plan._id}>
                      {plan.name} - ₹{plan.price}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Amount</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Payment Method</label>
                  <select
                    className="form-select"
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  >
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="upi">UPI</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button type="submit" className="btn btn-primary">
                  Record Payment
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
