import React from 'react';

const Balance = ({ user, balance, updateBalance }) => {
  const [editing, setEditing] = React.useState(false);
  const [newBalance, setNewBalance] = React.useState(balance);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    updateBalance(newBalance);
    setEditing(false);
  };

  return (
    <div>
      <h2>{user}'s Balance: {editing ? <input value={newBalance} onChange={(e) => setNewBalance(e.target.value)} /> : balance}</h2>
      <button onClick={editing ? handleSave : handleEdit}>{editing ? "Save" : "Edit"}</button>
    </div>
  );
};

export default Balance;
