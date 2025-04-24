import React, { useState, useEffect } from 'react'
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore'
import { db } from './firebase'
import { motion, AnimatePresence } from 'framer-motion'
import { CATEGORIES, CATEGORY_KEYWORDS } from './config/categories'
import './App.css'

// Catégorisation automatique basée sur les mots-clés
function autoCategorize(name) {
  const lower = name.toLowerCase()
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(k => lower.includes(k))) {
      return cat
    }
  }
  return 'misc'
}

export default function Stock() {
  const [items, setItems]     = useState([])
  const [newName, setNewName] = useState('')
  const [newQty, setNewQty]   = useState(1)

  // Chargement en temps réel depuis Firestore (collection "pantry")
  useEffect(() => {
    const q = query(
      collection(db, 'pantry'),
      orderBy('addedAt', 'desc')
    )
    return onSnapshot(q, snap =>
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    )
  }, [])

  // Ajout ou incrémentation d'un article
  const addItem = async () => {
    const name = newName.trim()
    if (!name) return

    const existing = items.find(
      it => it.name.toLowerCase() === name.toLowerCase()
    )
    const category = autoCategorize(name)

    if (existing) {
      await updateDoc(doc(db, 'pantry', existing.id), {
        qty: existing.qty + newQty
      })
    } else {
      await addDoc(collection(db, 'pantry'), {
        name: name[0].toUpperCase() + name.slice(1).toLowerCase(),
        qty: newQty,
        addedAt: Date.now(),
        category
      })
    }

    setNewName('')
    setNewQty(1)
  }

  // Modification de la quantité
  const updateQty = async (id, qty) => {
    if (qty < 1) return
    await updateDoc(doc(db, 'pantry', id), { qty })
  }

  // Suppression d'un article
  const deleteItem = async id => {
    await deleteDoc(doc(db, 'pantry', id))
  }

  // Groupement par catégorie
  const grouped = items.reduce((acc, item) => {
    const cat = item.category || 'misc'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(item)
    return acc
  }, {})

  return (
    <div>
      <div className="input-row">
            <input
          placeholder="Nouvel article"
          value={newName}
          onChange={e => setNewName(e.target.value)}
        />
        <div className="input-row-bottom">
          <select
            value={newQty}
            onChange={e => setNewQty(+e.target.value)}
          >
            {Array.from({ length: 50 }, (_, i) => i + 1).map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <button onClick={addItem}>Ajouter</button>
        </div>
      </div>

      <div className="item-list">
        {CATEGORIES.map(cat => {
          const Icon = cat.icon
          const list = grouped[cat.value] || []
          if (!list.length) return null
          return (
            <section key={cat.value}>
              <h2 className="category-header">
                <Icon size={20} className="category-icon" />
                {cat.label}
              </h2>
              <ul>
                <AnimatePresence>
                  {list.map(item => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      layout
                    >
                      <span className="item-name">{item.name}</span>
                      <div className="item-qty">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          disabled={item.qty <= 1}
                        >–</button>
                        <span>{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                        >+</button>
                      </div>
                      <button
                        className="btn-delete"
                        onClick={() => deleteItem(item.id)}
                      >×</button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </section>
          )
        })}
      </div>
    </div>
  )
}
