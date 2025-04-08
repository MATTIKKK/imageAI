import React, { useEffect, useState } from 'react';
import './profile.css';

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSignOut = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/';
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:8003/users/me', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }

        const data = await response.json();

        console.log(data);
        setFirstName(data.first_name || '');
        setLastName(data.last_name || '');
        setEmail(data.email || '');
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="profile-container">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-circle"></div>
          <div>
            <h2>ImageZone</h2>
            <p>Profile Management</p>
          </div>
        </div>
        <nav className="nav-links">
          <a className="active">My Profile</a>
          <a>Billing</a>
          <a>Points</a>
          <a>Traffic Plan</a>
          <a className="signout" onClick={handleSignOut}>↩️ Sign Out</a>
        </nav>
      </aside>

      <main className="profile-main">
        <div className="profile-header">
          <h2>My Profile</h2>
          <button className="save-btn">Save Changes</button>
        </div>

        <div className="user-card">
          <div className="avatar" />
          <div className='user-info'>
            <h3>{firstName} {lastName}</h3>
            <p>Premium Member</p>
            <p className="verified">✅ Verified Account · Member since Apr 2022</p>
          </div>
        </div>

        <div className="profile-form">
          <div className="form-left">
            <h4>Personal Information</h4>
            <label>First Name</label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              disabled
            />
          </div>

          <div className="form-right">
            <h4>Security</h4>
            <label>Current Password</label>
            <input type="password" />
            <label>New Password</label>
            <input type="password" />
            <label>Confirm New Password</label>
            <input type="password" />
            <a href="#" className="advanced-link">▶ Advanced Security Options</a>
          </div>
        </div>

        <div className="plan-section">
          <div className="plan-card">
            <span className="badge">PREMIUM</span>
            <h3>Pro Traffic Plan</h3>
            <p>25,000 visitors/month · 500GB storage · Priority support</p>
            <div className="renew">Renews on <strong>November 15, 2023</strong></div>
            <button className="upgrade-btn">Upgrade Plan</button>
            <div className="storage-bar">
              <div className="used" style={{ width: '48.6%' }} />
            </div>
            <p className="storage-text">243GB / 500GB</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
