import React from 'react';

const UserTabs = ({ users, selectUser }) => {
  return (
    <div>
      {users.map(user => (
        <button key={user} onClick={() => selectUser(user)}>
          {user}
        </button>
      ))}
    </div>
  );
};

export default UserTabs;
