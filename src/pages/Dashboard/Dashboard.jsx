import React, { useState } from 'react';
import './Dashboard.css';

// ICONS: Using inline SVGs to keep the component self-contained.
const LogoIcon = () => (
  <svg className="logo-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5zM12 13.5l-10-5V17l10 5v-8.5z" />
  </svg>
);

const UserIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const StethoscopeIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 18a4 4 0 1 0 8 0h-8zM4 18V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M12 18a4 4 0 1 0 8 0h-8zM12 18V10a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <circle cx="6" cy="6" r="2" />
    <circle cx="18" cy="10" r="2" />
  </svg>
);

const HospitalIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22V10" />
    <path d="M12 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-8" />
    <path d="M10 10V4h4v6" />
    <path d="M18 22V10" />
    <path d="M6 22V10" />
  </svg>
);

const SettingsIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
);

const LogoutIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
);


// Main Dashboard Component
export default function HealthcareDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  const cards = [
    {
      title: 'Explore Patients',
      description: 'Access and manage patient records, appointments, and medical history with ease.',
      Icon: UserIcon,
      theme: 'blue',
      buttonText: 'View Patients',
    },
    {
      title: 'Doctor Portal',
      description: 'Collaborate with medical staff, manage schedules, and access clinical tools.',
      Icon: StethoscopeIcon,
      theme: 'green',
      buttonText: 'Access Portal',
    },
    {
      title: 'Hospital Management',
      description: 'Oversee operations, resource allocation, and facility administration.',
      Icon: HospitalIcon,
      theme: 'purple',
      buttonText: 'Manage Facility',
    },
  ];

  return (
      <div className="dashboard-wrapper">
        <div className="container">
          
          {/* Header */}
          <header className="dashboard-header">
            <div className="header-logo">
              <LogoIcon />
              <span className="header-title">VandanaHub</span>
            </div>
            <div className="profile-menu-wrapper">
              <button onClick={() => setMenuOpen(!menuOpen)} className="avatar-button">
                <img 
                  src="https://placehold.co/100x100/E2E8F0/4A5568?text=U" 
                  alt="User Avatar"
                  className="avatar-image"
                />
              </button>
              {menuOpen && (
                <div className="profile-menu">
                  <a href="#" className="profile-menu-item">
                    <SettingsIcon className="menu-icon"/>
                    Settings
                  </a>
                  <a href="#" className="profile-menu-item profile-menu-logout">
                    <LogoutIcon className="menu-icon"/>
                    Logout
                  </a>
                </div>
              )}
            </div>
          </header>

          {/* Main Content */}
          <main className="main-content">
            <div className="cards-grid">
              {cards.map((card, index) => {
                return (
                  <div
                    key={card.title}
                    className={`dashboard-card theme-${card.theme}`}
                    style={{ animationDelay: `${index * 150}ms`}}
                  >
                    <div className="card-content-wrapper">
                      <div className="card-icon-wrapper">
                        <card.Icon className="card-icon" />
                      </div>
                      <h3 className="card-title">{card.title}</h3>
                      <p className="card-description">{card.description}</p>
                    </div>
                    <button className="card-button">
                      {card.buttonText}
                    </button>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>
  );
}
