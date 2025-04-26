// src/SwipeContainer.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'

export default function SwipeContainer({ children }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const threshold = 100  // px nécessaires pour déclencher le swipe

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -threshold && pathname === '/') {
      // swipe vers la gauche depuis Stock → Liste de courses
      navigate('/shopping')
    }
    if (info.offset.x > threshold && pathname === '/shopping') {
      // swipe vers la droite depuis Liste de courses → Stock
      navigate('/')
    }
  }

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      style={{ height: '100%' }}
    >
      {children}
    </motion.div>
  )
}
