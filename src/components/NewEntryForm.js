import React from 'react';

const NewEntryForm = ({ addEntry }) => {
  const [date, setDate] = React.useState('');
  const [item, setItem] = React.useState('');
  const [debit, setDebit] = React.useState('');
  const [credit, setCredit] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addEntry({ date, item, debit, credit });
    setDate('');
    setItem('');
    setDebit('');
    setCredit('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" />
      <input value={item} onChange={(e) => setItem(e.target.value)} placeholder="Item" />
      <input value={debit} onChange={(e) => setDebit(e.target.value)} placeholder="Debit" />
      <input value={credit} onChange={(e) => setCredit(e.target.value)} placeholder="Credit" />
      <button type="submit">Add</button>
    </form>
  );
};

export default NewEntryForm;
