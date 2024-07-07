import React from 'react';

const NewEntryForm = ({ addEntry }) => {
  const [date, setDate] = React.useState('');
  const [item, setItem] = React.useState('');
  const [debit, setDebit] = React.useState('');
  const [credit, setCredit] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const balance = calculateNewBalance(debit, credit);
    addEntry({ date, item, debit, credit, balance });
    setDate('');
    setItem('');
    setDebit('');
    setCredit('');
  };

  const calculateNewBalance = (debit, credit) => {
    // calculate the new balance based on the current balance and the debit/credit values

    // implement here

    // return the new balance
    
    // return balance + (credit - debit); <-- uncomment this line
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