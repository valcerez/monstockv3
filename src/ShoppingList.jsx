// src/ShoppingList.jsx
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
import { CheckSquare } from 'lucide-react'


function autoCategorize(name) {
  const lower = name.toLowerCase().trim()
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const k of keywords) {
      if (lower === k) {
        return cat 
      }
    }
  }
  
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(k => lower.includes(k))) {
      return cat
    }
  }
  return 'misc'
}

export default function ShoppingList() {
  const [items, setItems]     = useState([])
  const [newName, setNewName] = useState('')
  const [newQty, setNewQty]   = useState(1)
  const [openCats, setOpenCats] = useState(
    CATEGORIES.reduce((acc, c) => ({ ...acc, [c.value]: true }), {})
  )

  useEffect(() => {
    const q = query(
      collection(db, 'shoppingList'),
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
      await updateDoc(doc(db, 'shoppingList', existing.id), {
        qty: existing.qty + newQty
      })
    } else {
      await addDoc(collection(db, 'shoppingList'), {
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
    await updateDoc(doc(db, 'shoppingList', id), { qty })
  }

  const deleteItem = async id => {
    await deleteDoc(doc(db, 'shoppingList', id))
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
    <div className="shopping-page">
      <div className="form-wrapper">
        <div className="input-row">
          <input
            placeholder="Tu veux quoi le S?"
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
          <div className="input-row-bottom">
            <select
              value={newQty}
              onChange={e => setNewQty(+e.target.value)}
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map(n => (
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
                    {list.length > 0
                      ? list.map(item => (
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
                              className="btn-checkoff"
                              onClick={() => deleteItem(item.id)}
                              title="Cocher pour retirer"
                            >
                              <CheckSquare />
                            </button>
                          </motion.li>
                        ))
                      : (
                          <li className="empty">Aucun élément</li>
                        )}
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
