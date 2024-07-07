import React from 'react';

const LedgerTable = ({ ledger }) => {
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
          <tr key={index}>
            <td>{entry.date}</td>
            <td>{entry.item}</td>
            <td>{entry.debit}</td>
            <td>{entry.credit}</td>
            <td>{entry.balance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LedgerTable;