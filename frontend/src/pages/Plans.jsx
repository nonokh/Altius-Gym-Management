import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { planService } from '../services';

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const data = await planService.getAll();
      setPlans(data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div>
      <div className="header">
        <h1>Membership Plans</h1>
      </div>

      <div className="stats-grid">
        {plans.map(plan => (
          <div key={plan._id} className="card">
            <h3 style={{ marginBottom: '10px', color: 'var(--primary-color)' }}>{plan.name}</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '10px' }}>
              ₹{plan.price}
            </div>
            <p style={{ color: 'var(--secondary-color)', marginBottom: '15px' }}>
              {plan.description}
            </p>
            <p style={{ marginBottom: '10px' }}>
              <strong>Duration:</strong> {plan.duration} {plan.durationType}
            </p>
            {plan.features && plan.features.length > 0 && (
              <div>
                <strong>Features:</strong>
                <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                  {plan.features.map((feature, index) => (
                    <li key={index} style={{ marginBottom: '5px' }}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            <div style={{ marginTop: '15px' }}>
              <span className={`badge ${plan.isActive ? 'badge-success' : 'badge-danger'}`}>
                {plan.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
