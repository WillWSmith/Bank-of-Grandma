import React from 'react';

const Balance = ({ user, balance }) => {

  return (
    <div>
      <h2>{user}'s Balance: ${balance}</h2>
    </div>
  );
};

export default Balance;
