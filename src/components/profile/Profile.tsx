import React, { useEffect, useState } from 'react';
import './profile.css';
import Pricing from '../pricing/Pricing';

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [activePlan, setActivePlan] = useState('pro');

  const [points, setPoints] = useState(750); // Пример баллов
  const [history, setHistory] = useState({
    aiImagePrompt: 5,
    imageColorization: 3,
    resizeImages: 7,
    faceEmotionRecognition: 2,
  });

  const handleRedeemPoints = () => {
    // Логика для использования баллов
    alert('Points redeemed!');
  };

  const handleSignOut = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/';
  };

  // Обновленная функция для обработки подписки
  const handleSubscribe = (plan: string) => {
    // Устанавливаем выбранный план
    setActivePlan(plan);

    // Показываем зелёный алерт
    setShowSuccessAlert(true);

    // Скрываем алерт через 3 секунды
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000);
  };

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
          <a
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => setActiveTab('profile')}
          >
            My Profile
          </a>
          <a
            className={activeTab === 'billing' ? 'active' : ''}
            onClick={() => setActiveTab('billing')}
          >
            Billing
          </a>
          <a
            className={activeTab === 'points' ? 'active' : ''}
            onClick={() => setActiveTab('points')}
          >
            Points
          </a>
          <a
            className={activeTab === 'traffic' ? 'active' : ''}
            onClick={() => setActiveTab('traffic')}
          >
            Traffic Plan
          </a>
          <a className="signout" onClick={handleSignOut}>
            ↩️ Sign Out
          </a>
        </nav>
      </aside>

      <main className="profile-main">
        {/* Уведомление об успешной подписке */}
        {showSuccessAlert && (
          <div className="alert success">
            <p>Subscription successful!</p>
          </div>
        )}

        {/* Содержимое для каждого раздела */}
        {activeTab === 'profile' && (
          <div>
            <div className="user-card">
              <div className="avatar" />
              <div className="user-info">
                <h3>
                  {firstName} {lastName}
                </h3>
                <p>Premium Member</p>
                <p className="verified">
                  ✅ Verified Account · Member since Apr 2022
                </p>
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
                <a href="#" className="advanced-link">
                  ▶ Advanced Security Options
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="billing-section">
            <h3>Billing</h3>
            <h4>Payment Method</h4>
            <div className="payment-method">
              <input
                type="radio"
                name="payment-method"
                id="card"
                defaultChecked
              />
              <label htmlFor="card">Card</label>
              <div className="card-info">
                <label>Card Information</label>
                <input type="text" placeholder="1234 1234 1234 1234" />
                <div className="expiry-cvc">
                  <input type="text" placeholder="MM / YY" />
                  <input type="text" placeholder="CVC" />
                </div>
                <label>Cardholder Name</label>
                <input type="text" placeholder="Full name on card" />
              </div>
              <label>Country or region</label>
              <input type="text" placeholder="Kazakhstan" />
              <label>
                <input type="checkbox" /> I'm purchasing as a business
              </label>
              <label>Securely save my information for 1-click checkout</label>
              <input type="text" placeholder="+7 (000) - 000 - 00 - 00" />
              <button
                className="subscribe-btn"
                onClick={() => handleSubscribe('billing')}
              >
                Subscribe
              </button>
            </div>
          </div>
        )}

        {activeTab === 'points' && (
          <div>
            <div className="points-section">
              <div className="reward-points">
                <div className="points-card">
                  <h3>Reward Points</h3>
                  <div className="points-count">
                    <p>{points}</p>
                    <p>Points earned for today</p>
                  </div>
                  <button className="redeem-btn" onClick={handleRedeemPoints}>
                    Redeem Points
                  </button>
                </div>
              </div>
            </div>

            <div className="history-section">
              <h3>History</h3>
              <div className="history-categories">
                {Object.keys(history).map((category) => {
                  // Приводим category к типу keyof history
                  const categoryKey = category as keyof typeof history;
                  return (
                    <div key={category} className="history-category">
                      <div className="category-title">
                        <p>{category.replace(/([A-Z])/g, ' $1')}</p>
                      </div>
                      <div className="history-images">
                        {[...Array(history[categoryKey])].map((_, index) => (
                          <div key={index} className="history-image"></div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'traffic' && (
          <div className="traffic-plan-section">
            <h2>Traffic Plan</h2>

            <Pricing />

            <div className="plan-section">
              <div className="plan-card">
                <span className="badge">PREMIUM</span>
                <h3>Pro Traffic Plan</h3>
                <p>25,000 visitors/month · 500GB storage · Priority support</p>
                <div className="renew">
                  Renews on <strong>November 15, 2023</strong>
                </div>
                <button className="upgrade-btn">Upgrade Plan</button>
                <div className="storage-bar">
                  <div className="used" style={{ width: '48.6%' }} />
                </div>
                <p className="storage-text">243GB / 500GB</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
