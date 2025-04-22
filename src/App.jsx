import { useState, useEffect } from 'react';
import { db } from './firebase';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import './App.css';

function App() {
  const [items, setItems]     = useState([]);
  const [newName, setNewName] = useState('');

  // Écoute temps‑réel sur la collection "pantry"
  useEffect(() => {
    const q = query(collection(db, 'pantry'), orderBy('addedAt', 'desc'));
    const unsubscribe = onSnapshot(q, snapshot => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(list);
    });
    return unsubscribe;
  }, []);

  // Ajouter un nouvel article
  const addItem = async () => {
    if (!newName.trim()) return;
    await addDoc(collection(db, 'pantry'), {
      name: newName.trim(),
      qty: 1,
      addedAt: Date.now()
    });
    setNewName('');
  };

  // Supprimer un article
  const removeItem = async id => {
    await deleteDoc(doc(db, 'pantry', id));
  };

  return (
    <div className="app-container">
      <h1>MonStockV3</h1>
      <div className="input-row">
        <input
          value={newName}
          onChange={e => setNewName(e.target.value)}
          placeholder="Nouvel article"
        />
        <button onClick={addItem}>Ajouter</button>
      </div>
      <ul className="item-list">
        {items.map(item => (
          <li key={item.id}>
            <span className="item-name">{item.name}</span>
            <span className="item-qty">×{item.qty}</span>
            <button
              className="btn-delete"
              onClick={() => removeItem(item.id)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
