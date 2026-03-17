/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { ChevronUp, ChevronDown, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [units, setUnits] = useState(2);
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const hours = new Date().getHours();
    // Night is defined as 7 PM (19:00) to 7 AM (07:00)
    setIsNight(hours >= 19 || hours < 7);
  }, []);

  const getMultiplier = (u: number) => {
    if (u <= 5) return 12 - (2 / 3) * (u - 2); // 2–5: 12 → 10
    if (u <= 10) return 10 - 0.2 * (u - 5); // 6–10: 9.8 → 9
    if (u <= 15) return 9 - 0.2 * (u - 10); // 11–15: 8.8 → 8
    return 8 - 0.2 * (u - 15); // 16–20: 7.8 → 7
  };

  const totalPrice = useMemo(() => {
    const multiplier = getMultiplier(units);
    return Math.round(units * multiplier);
  }, [units]);

  const increment = () => {
    if (units < 20) setUnits(prev => prev + 1);
  };

  const decrement = () => {
    if (units > 2) setUnits(prev => prev - 1);
  };

  const handleWhatsAppClick = () => {
    const message = `*Unidades:* ${units}\n*Total:* ${totalPrice}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  // Theme colors
  const theme = {
    bg: isNight ? 'bg-[#1A1614]' : 'bg-[#FDFBF7]',
    text: isNight ? 'text-[#FDFBF7]' : 'text-[#2D241E]',
    card: isNight ? 'bg-[#2D241E] border-stone-800 shadow-black/20' : 'bg-white border-stone-100 shadow-stone-200/50',
    accent: isNight ? 'text-[#EC8B8B]' : 'text-[#A34343]',
    muted: isNight ? 'text-stone-400' : 'text-stone-500',
    divider: isNight ? 'bg-stone-700' : 'bg-stone-100',
    hover: isNight ? 'hover:bg-stone-800' : 'hover:bg-stone-100/80',
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} font-serif flex flex-col items-center justify-center p-6 transition-colors duration-700`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-md ${theme.card} rounded-[2rem] shadow-xl py-14 px-8 border transition-colors duration-700`}
      >
        <div className="grid grid-cols-2 gap-x-8 gap-y-1 mb-12 relative">
          {/* Vertical Divider */}
          <div className={`absolute left-1/2 top-0 bottom-0 w-px ${theme.divider} -translate-x-1/2 transition-colors duration-700 pointer-events-none`} />

          {/* Fila 1 – Contador (izq): flecha ↑, número centrado, flecha ↓ */}
          <div className="flex flex-col items-center min-h-[220px]">
            <button
              onClick={increment}
              disabled={units >= 20}
              className={`p-4 -m-2 rounded-full ${theme.hover} transition-colors disabled:opacity-20 flex items-center justify-center shrink-0`}
              aria-label="Aumentar unidades"
            >
              <ChevronUp size={32} strokeWidth={1.5} />
            </button>
            <div className="flex-1 w-full flex items-center justify-center relative min-h-[5rem]">
              <AnimatePresence initial={false}>
                <motion.span
                  key={units}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="text-6xl font-light absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  {units}
                </motion.span>
              </AnimatePresence>
            </div>
            <button
              onClick={decrement}
              disabled={units <= 2}
              className={`p-4 -m-2 rounded-full ${theme.hover} transition-colors disabled:opacity-20 flex items-center justify-center shrink-0`}
              aria-label="Disminuir unidades"
            >
              <ChevronDown size={32} strokeWidth={1.5} />
            </button>
          </div>

          {/* Fila 1 – Precio (der) */}
          <div className="flex flex-col items-center justify-center min-h-[220px] relative">
            <AnimatePresence initial={false}>
              <motion.div
                key={totalPrice}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.15 }}
                className={`text-7xl font-light ${theme.accent} transition-colors duration-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
              >
                {totalPrice}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Fila 2 – Etiquetas a la misma altura */}
          <div className="flex items-end justify-center pt-1">
            <span className={`text-[10px] uppercase tracking-widest ${theme.muted} font-sans`}>Unidades</span>
          </div>
          <div className="flex items-end justify-center pt-1">
            <span className={`text-[10px] uppercase tracking-widest ${theme.muted} font-sans`}>Valor Total</span>
          </div>
        </div>

        <div className="text-center mb-12">
          <p className={`${isNight ? 'text-stone-400' : 'text-stone-500'} italic text-sm transition-colors duration-700`}>
            Eficiencia por cantidad: + es -
          </p>
        </div>

        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWhatsAppClick}
            className={`w-16 h-16 ${isNight ? 'bg-[#128C7E]' : 'bg-[#25D366]'} text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:shadow-green-500/40`}
            aria-label="Enviar por WhatsApp"
          >
            <MessageCircle size={32} strokeWidth={1.2} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
