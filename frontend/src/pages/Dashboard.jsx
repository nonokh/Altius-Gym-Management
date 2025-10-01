import { useEffect, useState } from 'react';
import { FaUsers, FaUserCheck, FaUserSlash, FaMoneyBillWave } from 'react-icons/fa';
import { memberService, attendanceService, paymentService } from '../services';

const Dashboard = () => {
  const [stats, setStats] = useState({
    members: { total: 0, active: 0, inactive: 0, expired: 0 },
    todayAttendance: 0,
    payments: { totalRevenue: 0, transactionCount: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [memberStats, attendanceCount, paymentStats] = await Promise.all([
        memberService.getStats(),
        attendanceService.getTodayCount(),
        paymentService.getStats(),
      ]);

      setStats({
        members: memberStats,
        todayAttendance: attendanceCount.count,
        payments: paymentStats,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="header">
        <h1>Dashboard</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon primary">
            <FaUsers />
          </div>
          <div className="stat-content">
            <h3>{stats.members.total}</h3>
            <p>Total Members</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon success">
            <FaUserCheck />
          </div>
          <div className="stat-content">
            <h3>{stats.members.active}</h3>
            <p>Active Members</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon warning">
            <FaUserSlash />
          </div>
          <div className="stat-content">
            <h3>{stats.members.expired}</h3>
            <p>Expired Memberships</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon success">
            <FaUsers />
          </div>
          <div className="stat-content">
            <h3>{stats.todayAttendance}</h3>
            <p>Today's Attendance</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon primary">
            <FaMoneyBillWave />
          </div>
          <div className="stat-content">
            <h3>₹{stats.payments.totalRevenue.toLocaleString()}</h3>
            <p>Total Revenue</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon success">
            <FaMoneyBillWave />
          </div>
          <div className="stat-content">
            <h3>{stats.payments.transactionCount}</h3>
            <p>Total Transactions</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">Welcome to Altius Gym Management System</h2>
        <p style={{ color: 'var(--secondary-color)', marginTop: '10px' }}>
          Manage your gym operations efficiently with our modern management system.
          Navigate through the sidebar to manage members, membership plans, attendance, and payments.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
