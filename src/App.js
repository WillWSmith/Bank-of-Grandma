import React, { useState, useEffect } from 'react';
import { db, doc, getDoc, updateDoc } from './firebase';
import UserTabs from './components/UserTabs';
import Balance from './components/Balance';
import LedgerTable from './components/LedgerTable';
import NewEntryForm from './components/NewEntryForm';

const users = ['Grandma', 'Desmond & Allie', 'Ronan', 'Nicole', 'Karen', 'Bob'];

const App = () => {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [balance, setBalance] = useState(0);
  const [ledger, setLedger] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userDoc = await getDoc(doc(db, 'users', selectedUser));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setBalance(userData.balance || 0);
        setLedger(userData.ledger || []);
      } else {
        setBalance(0);
        setLedger([]);
      }
    };
    fetchData();
  }, [selectedUser]);

  const addEntry = async (entry) => {
    const newLedger = [...ledger, entry];
    const newBalance = entry.balance;
    await updateDoc(doc(db, 'users', selectedUser), { ledger: newLedger, balance: newBalance });
    setLedger(newLedger);
    setBalance(newBalance);
  };

  const editEntry = async (index, editedEntry) => {
    const newLedger = [...ledger];
  
    // Ensure debit and credit values are numbers
    editedEntry.debit = parseFloat(editedEntry.debit) || 0;
    editedEntry.credit = parseFloat(editedEntry.credit) || 0;
  
    // Calculate the balance for this entry
    if (index === 0) {
      // For the first entry, balance starts with the first transaction
      editedEntry.balance = editedEntry.credit - editedEntry.debit;
    } else {
      // For subsequent entries, base the balance on the previous entry's balance
      editedEntry.balance = newLedger[index - 1].balance + editedEntry.credit - editedEntry.debit;
    }
  
    newLedger[index] = editedEntry;
  
    // Recalculate the balance for all entries after the edited one
    for (let i = index + 1; i < newLedger.length; i++) {
      newLedger[i].balance = newLedger[i - 1].balance + newLedger[i].credit - newLedger[i].debit;
    }
  
    // Update the root balance to match the last entry's balance
    const finalBalance = newLedger[newLedger.length - 1].balance;
    await updateDoc(doc(db, 'users', selectedUser), { ledger: newLedger, balance: finalBalance });
  
    // Update the state
    setLedger(newLedger);
    setBalance(finalBalance);
  };  

  return (
    <div>
      <UserTabs users={users} selectUser={setSelectedUser} />
      <Balance user={selectedUser} balance={balance} />
      <LedgerTable ledger={ledger} onEditEntry={editEntry} />
      <NewEntryForm addEntry={addEntry} currentBalance={balance} />
    </div>
  );
};

export default App;
