import React, { useState } from 'react';

const LedgerTable = ({ ledger, onEditEntry, currentPage, entriesPerPage }) => {
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = ledger.slice(indexOfFirstEntry, indexOfLastEntry);

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Item</th>
          <th>Debit</th>
          <th>Credit</th>
          <th>Balance</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {currentEntries.map((entry, index) => (
          <LedgerRow
            key={index}
            index={index + indexOfFirstEntry}
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

  const handleEditClick = () => {
    setEditedEntry({ ...entry });
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedEntry((prev) => ({
      ...prev,
      [name]: name === 'debit' || name === 'credit' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSave = () => {
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
          <td>${entry.balance}</td>
          <td>
            <button onClick={handleEditClick}>Edit</button>
          </td>
        </>
      )}
    </tr>
  );
};

export default LedgerTable;