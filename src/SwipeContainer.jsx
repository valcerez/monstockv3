// src/SwipeContainer.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

export default function SwipeContainer({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const threshold = 20;

  // État pour autoriser ou non le drag du container
  const [canDrag, setCanDrag] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    // Réinitialise canDrag si on change de route
    setCanDrag(true);
  }, [pathname]);

  // Gestion du début de geste (clic ou touche)
  const handlePointerDown = e => {
    if (pathname === '/planner') {
      // Récupère la coordonnée Y du pointeur (touch ou souris)
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      const half = window.innerHeight / 2;
      if (y < half) {
        // moitié haute : disable swipe du container pour permettre scroll de la frise
        setCanDrag(false);
      } else {
        // moitié basse : enable swipe entre containers
        setCanDrag(true);
      }
    } else {
      // hors planning, toujours autoriser swipe
      setCanDrag(true);
    }
  };

  // Fin de geste, on réactive le drag
  const handleDragEnd = (e, info) => {
    setCanDrag(true);

    if (!canDrag) return;

    if (info.offset.x < -threshold) {
      if (pathname === '/planner') {
        navigate('/shopping');
      } else if (pathname === '/shopping') {
        navigate('/');
      }
    }
    if (info.offset.x > threshold) {
      if (pathname === '/') {
        navigate('/shopping');
      } else if (pathname === '/shopping') {
        navigate('/planner');
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      drag={canDrag ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      style={{ height: '100%', width: '100%', minWidth: '100%' }}
    >
      {children}
    </motion.div>
  );
}