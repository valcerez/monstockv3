import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import Stock from './Stock'
import ShoppingList from './ShoppingList'  // à créer plus tard
import './App.css'

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>On Bouffe Quoi ?</h1>
        <nav>
          <NavLink
            to="/"
            end
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Stock
          </NavLink>
          <NavLink
            to="/shopping"
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Liste de courses
          </NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Stock />} />
        <Route path="/shopping" element={<ShoppingList />} />
      </Routes>
    </div>
  )
}

export default App
