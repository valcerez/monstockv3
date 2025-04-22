import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence }      from 'framer-motion';
import { db }                           from './firebase';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  updateDoc
} from 'firebase/firestore';
import './App.css';

// Helpers pour incrémenter / décrémenter la quantité
const incQty = async (id, currentQty) => {
  const ref = doc(db, 'pantry', id);
  await updateDoc(ref, { qty: currentQty + 1 });
};

const decQty = async (id, currentQty) => {
  const ref = doc(db, 'pantry', id);
  await updateDoc(ref, { qty: Math.max(0, currentQty - 1) });
};

function App() {
  const [items, setItems]     = useState([]);
  const [newName, setNewName] = useState('');

  // Écoute temps‑réel Firestore
  useEffect(() => {
    const q = query(
      collection(db, 'pantry'),
      orderBy('addedAt', 'desc')
    );
    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        setItems(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      },
      error => {
        console.error('❌ Firestore onSnapshot error:', error);
      }
    );
    return unsubscribe;
  }, []);

  // Ajouter un article
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
        <AnimatePresence>
          {items.map(item => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 50, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              layout
            >
              <span className="item-name">{item.name}</span>

              <div className="item-qty-control">
                <button
                  onClick={() => decQty(item.id, item.qty)}
                  aria-label="Réduire"
                >
                  ➖
                </button>
                <span className="item-qty">{item.qty}</span>
                <button
                  onClick={() => incQty(item.id, item.qty)}
                  aria-label="Augmenter"
                >
                  ➕
                </button>
              </div>

              <button
                className="btn-delete"
                onClick={() => removeItem(item.id)}
                aria-label="Supprimer"
              >
                ❌
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default App;
