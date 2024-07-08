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

  const updateBalance = async (newBalance) => {
    await updateDoc(doc(db, 'users', selectedUser), { balance: newBalance });
    setBalance(newBalance);
  };

  const addEntry = async (entry) => {
    const newLedger = [...ledger, entry];
    const newBalance = entry.balance;
    await updateDoc(doc(db, 'users', selectedUser), { ledger: newLedger, balance: newBalance });
    setLedger(newLedger);
    setBalance(newBalance);
  };

  return (
    <div>
      <UserTabs users={users} selectUser={setSelectedUser} />
      <Balance user={selectedUser} balance={balance} updateBalance={updateBalance} />
      <LedgerTable ledger={ledger} />
      <NewEntryForm addEntry={addEntry} currentBalance={balance} />
    </div>
  );
};

export default App;
