import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';

const UserTabs = ({ users, selectUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = window.innerWidth <= 600;

  return (
    <div className="user-tabs">
      {isMobile ? (
        <>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="toggle-btn"
            aria-expanded={isOpen}
          >
            <FaBars />
          </button>
          <div className={`user-dropdown ${isOpen ? 'open' : ''}`}>
            {users.map((user) => (
              <button
                key={user}
                onClick={() => {
                  selectUser(user);
                  setIsOpen(false); // Close dropdown after selection
                }}
              >
                {user}
              </button>
            ))}
          </div>
        </>
      ) : (
        users.map((user) => (
          <button key={user} onClick={() => selectUser(user)}>
            {user}
          </button>
        ))
      )}
    </div>
  );
};

export default UserTabs;
