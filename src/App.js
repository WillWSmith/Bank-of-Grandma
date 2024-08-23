import React, { useState, useEffect } from 'react';
import { db, doc, getDoc, updateDoc } from './firebase';

// Components
import UserTabs from './components/UserTabs';
import Balance from './components/Balance';
import LedgerTable from './components/LedgerTable';
import NewEntryForm from './components/NewEntryForm';

// Styles
import logo from './media/logo192.png';
import './App.css';

const users = ['Grandma', 'Desmond & Allie', 'Ronan', 'Nicole', 'Karen', 'Bob'];

const App = () => {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [balance, setBalance] = useState(0);
  const [ledger, setLedger] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const userDoc = await getDoc(doc(db, 'users', selectedUser));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setBalance(userData.balance || 0);
        setLedger((userData.ledger || []).reverse());
        setCurrentPage(1);
      } else {
        setBalance(0);
        setLedger([]);
      }
    };
    fetchData();
  }, [selectedUser]);
  

  const addEntry = async (entry) => {
    const newLedger = [entry, ...ledger];
    const newBalance = entry.balance;
    await updateDoc(doc(db, 'users', selectedUser), { ledger: newLedger, balance: newBalance });
    setLedger(newLedger);
    setBalance(newBalance);
  };

  const editEntry = async (index, editedEntry) => {
    const newLedger = [...ledger];
  
    editedEntry.debit = parseFloat(editedEntry.debit) || 0;
    editedEntry.credit = parseFloat(editedEntry.credit) || 0;
  
    if (index === 0) {
      editedEntry.balance = editedEntry.credit - editedEntry.debit;
    } else {
      editedEntry.balance = newLedger[index - 1].balance + editedEntry.credit - editedEntry.debit;
    }
  
    newLedger[index] = editedEntry;
  
    for (let i = index + 1; i < newLedger.length; i++) {
      newLedger[i].balance = newLedger[i - 1].balance + newLedger[i].credit - newLedger[i].debit;
    }
  
    const finalBalance = newLedger[newLedger.length - 1].balance;
    await updateDoc(doc(db, 'users', selectedUser), { ledger: newLedger, balance: finalBalance });
  
    setLedger(newLedger);
    setBalance(finalBalance);
  };

  // Pagination logic
  const totalPages = Math.ceil(ledger.length / entriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="app-container">
      <div className="logo">
        <img src={logo} alt="Bank of Grandma Logo" />
      </div>
      <div className="user-tabs">
        <UserTabs users={users} selectUser={setSelectedUser} />
      </div>
      <Balance user={selectedUser} balance={balance} />
      <LedgerTable
        ledger={ledger}
        onEditEntry={editEntry}
        currentPage={currentPage}
        entriesPerPage={entriesPerPage}
      />
      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={index + 1 === currentPage}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <NewEntryForm addEntry={addEntry} currentBalance={balance} />
    </div>
  );
};

export default App;