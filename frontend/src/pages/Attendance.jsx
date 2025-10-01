import { useEffect, useState } from 'react';
import { FaUserCheck } from 'react-icons/fa';
import { attendanceService, memberService } from '../services';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState('');

  useEffect(() => {
    fetchAttendance();
    fetchMembers();
  }, []);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const data = await attendanceService.getAll({ limit: 50 });
      setAttendance(data.attendance);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const data = await memberService.getAll({ status: 'active', limit: 100 });
      setMembers(data.members);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleCheckIn = async () => {
    if (!selectedMember) {
      alert('Please select a member');
      return;
    }
    try {
      await attendanceService.checkIn(selectedMember);
      setSelectedMember('');
      fetchAttendance();
      alert('Check-in successful!');
    } catch (error) {
      alert(error.response?.data?.message || 'Error checking in');
    }
  };

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div>
      <div className="header">
        <h1>Attendance</h1>
      </div>

      <div className="card">
        <h2 className="card-title">Check In Member</h2>
        <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
          <select
            className="form-select"
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
            style={{ flex: 1 }}
          >
            <option value="">Select Member</option>
            {members.map(member => (
              <option key={member._id} value={member._id}>
                {member.firstName} {member.lastName} - {member.email}
              </option>
            ))}
          </select>
          <button className="btn btn-success" onClick={handleCheckIn}>
            <FaUserCheck /> Check In
          </button>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">Recent Attendance</h2>
        {loading ? (
          <div className="loading"><div className="spinner"></div></div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Check In Time</th>
                  <th>Check Out Time</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {attendance.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                      No attendance records found
                    </td>
                  </tr>
                ) : (
                  attendance.map(record => (
                    <tr key={record._id}>
                      <td>{record.member?.firstName} {record.member?.lastName}</td>
                      <td>{formatDateTime(record.checkInTime)}</td>
                      <td>{record.checkOutTime ? formatDateTime(record.checkOutTime) : 'Not checked out'}</td>
                      <td>{new Date(record.date).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;
