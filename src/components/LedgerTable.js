import React, { useState } from 'react';

const LedgerTable = ({ ledger, onEditEntry }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Item</th>
          <th>Debit</th>
          <th>Credit</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {ledger.map((entry, index) => (
          <LedgerRow
            key={index}
            index={index}
            entry={entry}
            onEditEntry={onEditEntry}
          />
        ))}
      </tbody>
    </table>
  );
};

const LedgerRow = ({ entry, index, onEditEntry }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEntry, setEditedEntry] = useState({ ...entry });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedEntry((prev) => ({
      ...prev,
      [name]: name === 'debit' || name === 'credit' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSave = () => {
    // Convert balance to a number before saving
    editedEntry.debit = parseFloat(editedEntry.debit) || 0;
    editedEntry.credit = parseFloat(editedEntry.credit) || 0;
    onEditEntry(index, editedEntry);
    setIsEditing(false);
  };

  return (
    <tr>
      {isEditing ? (
        <>
          <td><input type="date" name="date" value={editedEntry.date} onChange={handleEditChange} /></td>
          <td><input name="item" value={editedEntry.item} onChange={handleEditChange} /></td>
          <td><input name="debit" type="number" value={editedEntry.debit} onChange={handleEditChange} /></td>
          <td><input name="credit" type="number" value={editedEntry.credit} onChange={handleEditChange} /></td>
          <td>{editedEntry.balance}</td>
          <td>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </td>
        </>
      ) : (
        <>
          <td>{entry.date}</td>
          <td>{entry.item}</td>
          <td>{entry.debit}</td>
          <td>{entry.credit}</td>
          <td>{entry.balance}</td>
          <td>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </td>
        </>
      )}
    </tr>
  );
};

export default LedgerTable;
