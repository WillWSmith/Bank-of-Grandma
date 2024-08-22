import React, { useState } from 'react';

const NewEntryForm = ({ addEntry, currentBalance }) => {
  const [date, setDate] = useState('');
  const [item, setItem] = useState('');
  const [debit, setDebit] = useState('');
  const [credit, setCredit] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !item || (debit === '' && credit === '')) {
      alert('Date, item, and either debit or credit are required.');
      return;
    }

    const debitValue = debit ? parseFloat(debit) : 0;
    const creditValue = credit ? parseFloat(credit) : 0;
    const newBalance = calculateNewBalance(debitValue, creditValue);

    const entry = {
      date,
      item,
      debit: debitValue,
      credit: creditValue,
      balance: newBalance
    };

    addEntry(entry);
    setDate('');
    setItem('');
    setDebit('');
    setCredit('');
  };

  const calculateNewBalance = (debit, credit) => {
    return currentBalance - debit + credit;
  };

  return (
    <tr>
      <td>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </td>
      <td>
        <input value={item} onChange={(e) => setItem(e.target.value)} placeholder="Item" required />
      </td>
      <td>
        <input value={debit} onChange={(e) => setDebit(e.target.value)} placeholder="Debit" />
      </td>
      <td>
        <input value={credit} onChange={(e) => setCredit(e.target.value)} placeholder="Credit" />
      </td>
      <td></td>
      <td>
        <button type="submit" onClick={handleSubmit}>Add</button>
      </td>
    </tr>
  );
};

export default NewEntryForm;
