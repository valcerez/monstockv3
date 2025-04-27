// src/MealPlanner.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db } from './firebase';
import './App.css';

const SLOTS = [
  { key: 'lunch',  label: 'Midi' },
  { key: 'dinner', label: 'Soir' }
];
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

export default function MealPlanner() {
  const headerRef = useRef(null);
  const today = useMemo(() => new Date(), []);
  const todayIso = today.toISOString().slice(0, 10);

  const dates = useMemo(() => {
    const arr = [];
    for (let offset = -2; offset <= 8; offset++) {
      const d = new Date(today);
      d.setDate(today.getDate() + offset);
      arr.push(d.toISOString().slice(0, 10));
    }
    return arr;
  }, [today]);

  const [selectedDate, setSelectedDate] = useState(todayIso);
  const [plans, setPlans] = useState({});
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    const start = dates[0];
    const end = dates[dates.length - 1];
    const q = query(
      collection(db, 'mealPlans'),
      where('date', '>=', start),
      where('date', '<=', end)
    );
    const unsub = onSnapshot(q, snap => {
      const data = {};
      snap.docs.forEach(d => {
        const o = d.data();
        data[`${o.date}-${o.slot}`] = { id: d.id, ...o };
      });
      setPlans(data);
    });
    return () => unsub();
  }, [dates]);

  useEffect(() => {
    const purgeOld = async () => {
      const qOld = query(
        collection(db, 'mealPlans'),
        where('date', '<', dates[0])
      );
      const snap = await getDocs(qOld);
      snap.forEach(docSnap => deleteDoc(doc(db, 'mealPlans', docSnap.id)));
    };
    purgeOld();
  }, [dates]);

  // Center scroll and disable propagation for header
  useEffect(() => {
    const container = headerRef.current;
    if (!container) return;
    const idx = dates.indexOf(selectedDate);
    const cell = container.children[idx];
    if (cell) {
      const offset = cell.offsetLeft - (container.clientWidth / 2 - cell.clientWidth / 2);
      container.scrollTo({ left: offset, behavior: 'smooth' });
    }
  }, [selectedDate, dates]);

  const allSlots = useMemo(
    () =>
      SLOTS.map(s => {
        const weekday = new Date(selectedDate)
          .toLocaleDateString('fr-FR', { weekday: 'long' });
        const dayLabel = capitalize(weekday);   // → 'Lundi', 'Mardi', etc.
        return {
          key:   `${selectedDate}-${s.key}`,
          date:  selectedDate,
          slot:  s.key,
          label: `${dayLabel} ${s.label}`     // e.g. 'Lundi Midi'
        }
      }),
    [selectedDate]
  );

  useEffect(() => {
    const next = {};
    allSlots.forEach(({ key }) => (next[key] = plans[key]?.title || ''));
    setInputs(next);
  }, [plans, allSlots]);

  const handleBlur = async ({ key, date, slot }) => {
    const title = inputs[key]?.trim() || '';
    const existing = plans[key];
    if (title) {
      if (existing) {
        if (existing.title !== title) {
          await updateDoc(doc(db, 'mealPlans', existing.id), { title });
        }
      } else {
        await addDoc(collection(db, 'mealPlans'), {
          date,
          slot,
          title,
          notes: '',
          addedAt: Date.now()
        });
      }
    } else if (existing) {
      await deleteDoc(doc(db, 'mealPlans', existing.id));
    }
  };

  const handleClear = async ({ key }) => {
    setInputs(prev => ({ ...prev, [key]: '' }));
    if (plans[key]) {
      await deleteDoc(doc(db, 'mealPlans', plans[key].id));
    }
  };

  return (
    <div className="meal-planner-page">
      <div
        ref={headerRef}
        className="planner-header"
        style={{
          width: '100%',
          display: 'flex',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}
        onMouseDown={e => e.stopPropagation()}
        onTouchStart={e => e.stopPropagation()}
        onTouchMove={e => e.stopPropagation()}
      >
        {dates.map(dateStr => {
          const isActive = dateStr === selectedDate;
          const isToday = dateStr === todayIso;
          const dayLabel = isToday
            ? 'auj'
            : new Date(dateStr).toLocaleDateString('fr-FR', { weekday: 'short' });
          const dayNum = new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric' });
          return (
            <div
              key={dateStr}
              className={`planner-header-cell${isActive ? ' active' : ''}`}
              onClick={() => setSelectedDate(dateStr)}
              style={{ flex: '0 0 33.3333%' }}
            >
              <div>{dayLabel}</div>
              <div>{dayNum}</div>
            </div>
          );
        })}
      </div>
      <div className="form-wrapper">
        <div className="meal-planner-list">
          {allSlots.map(item => (
            <div key={item.key} className="meal-row">
              <div className="meal-label">{item.label}</div>
              <textarea
                className="meal-input"
                rows={2}
                placeholder="Titre du repas…"
                value={inputs[item.key]}
                onChange={e =>
                  setInputs(prev => ({ ...prev, [item.key]: e.target.value }))
                }
                onBlur={() => handleBlur(item)}
              />
              <button
                className="meal-clear-btn"
                onClick={() => handleClear(item)}
                title="Vider"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}