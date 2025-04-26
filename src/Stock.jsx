// src/Stock.jsx
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
import { ChevronDown } from 'lucide-react'
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
  const [openCats, setOpenCats] = useState(
    CATEGORIES.reduce((acc, c) => ({ ...acc, [c.value]: true }), {})
  )

  // Chargement Firestore
  useEffect(() => {
    const q = query(
      collection(db, 'pantry'),
      orderBy('addedAt', 'desc')
    )
    return onSnapshot(q, snap =>
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    )
  }, [])

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

  const updateQty = async (id, qty) => {
    if (qty < 1) return
    await updateDoc(doc(db, 'pantry', id), { qty })
  }

  const deleteItem = async id => {
    await deleteDoc(doc(db, 'pantry', id))
  }

  // Regroupement catégories
  const grouped = items.reduce((acc, item) => {
    const cat = item.category || 'misc'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(item)
    return acc
  }, {})

  const toggleCat = cat => {
    setOpenCats(prev => ({ ...prev, [cat]: !prev[cat] }))
  }

  return (
    <div className="stock-page">
      <div className="form-wrapper">
        <div className="input-row">
          <input
            placeholder="Y'a quoi?"
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
            <motion.button
              onClick={addItem}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Ajouter
            </motion.button>
          </div>
        </div>
      </div>

      <div className="item-list">
        {CATEGORIES.map(cat => {
          const Icon = cat.icon
          const list = grouped[cat.value] || []
          if (!list.length) return null

          return (
            <section key={cat.value}>
              <div
                className="category-header"
                style={{ cursor: 'pointer' }}
                onClick={() => toggleCat(cat.value)}
              >
                <Icon size={20} className="category-icon" />
                {cat.label}
                <motion.span
                  animate={{ rotate: openCats[cat.value] ? 0 : -90 }}
                  style={{ display: 'inline-block', marginLeft: 'auto' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <ChevronDown size={16} />
                </motion.span>
              </div>

              <AnimatePresence initial={false}>
                {openCats[cat.value] && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {list.map(item => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
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
                  </motion.ul>
                )}
              </AnimatePresence>
            </section>
          )
        })}
      </div>
    </div>
  )
}
