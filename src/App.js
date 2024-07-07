import React, { useState, useEffect } from 'react';
import { db } from './firebase';
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
      const userDoc = await db.collection('users').doc(selectedUser).get();
      if (userDoc.exists) {
        setBalance(userDoc.data().balance);
        setLedger(userDoc.data().ledger);
      }
    };
    fetchData();
  }, [selectedUser]);

  const updateBalance = async (newBalance) => {
    await db.collection('users').doc(selectedUser).update({ balance: newBalance });
    setBalance(newBalance);
  };

  const addEntry = async (entry) => {
    const newLedger = [...ledger, entry];
    await db.collection('users').doc(selectedUser).update({ ledger: newLedger });
    setLedger(newLedger);
    setBalance(entry.balance);
  };

  return (
    <div>
      <UserTabs users={users} selectUser={setSelectedUser} />
      <Balance user={selectedUser} balance={balance} updateBalance={updateBalance} />
      <LedgerTable ledger={ledger} />
      <NewEntryForm addEntry={addEntry} />
    </div>
  );
};

export default App;
