import { NavLink } from 'react-router-dom';
import { FaDumbbell, FaTachometerAlt, FaUsers, FaClipboardList, FaCalendarCheck, FaMoneyBillWave, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <FaDumbbell size={32} />
        <h2>Altius</h2>
      </div>
      <nav>
        <ul className="sidebar-nav">
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
              <FaTachometerAlt />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/members" className={({ isActive }) => isActive ? 'active' : ''}>
              <FaUsers />
              <span>Members</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/plans" className={({ isActive }) => isActive ? 'active' : ''}>
              <FaClipboardList />
              <span>Membership Plans</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/attendance" className={({ isActive }) => isActive ? 'active' : ''}>
              <FaCalendarCheck />
              <span>Attendance</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/payments" className={({ isActive }) => isActive ? 'active' : ''}>
              <FaMoneyBillWave />
              <span>Payments</span>
            </NavLink>
          </li>
          <li style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <a onClick={handleLogout} style={{ cursor: 'pointer' }}>
              <FaSignOutAlt />
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </nav>
      <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', opacity: 0.5, fontSize: '0.85rem' }}>
        <div>Logged in as:</div>
        <div style={{ fontWeight: 'bold' }}>{user?.name}</div>
        <div style={{ fontSize: '0.75rem' }}>({user?.role})</div>
      </div>
    </aside>
  );
};

export default Sidebar;
