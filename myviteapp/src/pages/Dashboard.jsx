import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/authuser/profile', { withCredentials: true })
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        console.error('Error getting data', e);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/authuser/logout', { withCredentials: true });
      navigate('/login');
    } catch (e) {
      console.error('Logout failed:', e);
    }
  };

  const handleSupplement = () => {
    navigate('/addsuplement');
  };

  if (!data) {
    return <div>Loading or failed to load profile information</div>;
  }

  const { authuser, machine, supplement } = data;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard</h2>

      <h3>User Info</h3>
      <p><strong>Name:</strong> {authuser.uname}</p>
      <p><strong>Email:</strong> {authuser.uemail}</p>
      <p><strong>Address:</strong> {authuser.uaddress}</p>
      <hr />

      <h3>Machines</h3>
      {machine.length > 0 ? (
        machine.map((m, i) => (
          <div key={i}>
            <p><strong>Title:</strong> {m.mtitle}</p>
            <p><strong>Price:</strong> {m.mprice}</p>
            <p><strong>Description:</strong> {m.mdescription}</p>
            <p><strong>Status:</strong> {m.mstatus}</p>
           <br/>
          </div>
        ))
      ) : (
        <p>No machines found.</p>
      )}
 <hr />
      <h3>Supplements</h3>
      {supplement.length > 0 ? (
        supplement.map((s, i) => (
          <div key={i}>
            <p><strong>Title:</strong> {s.stitle}</p>
            <p><strong>Price:</strong> {s.sprice}</p>
            <p><strong>Description:</strong> {s.sdescription}</p>
            <p><strong>Status:</strong> {s.sstatus}</p>
            <br/>
          </div>
        ))
      ) : (
        <p>No supplements found.</p>
      )}

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleSupplement} style={{ marginLeft: '10px' }}>
          Add Supplement
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
