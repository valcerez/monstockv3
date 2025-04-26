import React from 'react'
import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Stock from './Stock'
import ShoppingList from './ShoppingList'
import SwipeContainer from './SwipeContainer'
import './App.css'

function App() {
  const location = useLocation()

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>On Bouffe Quoi ?</h1>

        {/* Nouvelle ligne de navigation */}
        <div className="nav-container">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-item stock${isActive ? ' active' : ''}`
            }
          >
            Stock
          </NavLink>
          <NavLink
            to="/shopping"
            className={({ isActive }) =>
              `nav-item shopping${isActive ? ' active' : ''}`
            }
          >
            Liste des courses
          </NavLink>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <SwipeContainer>
                <Stock />
              </SwipeContainer>
            }
          />
          <Route
            path="/shopping"
            element={
              <SwipeContainer>
                <ShoppingList />
              </SwipeContainer>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App
