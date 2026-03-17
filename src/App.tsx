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

  const totalPrice = useMemo(() => {
    let multiplier = 0;
    if (units >= 2 && units <= 4) multiplier = 12;
    else if (units >= 5 && units <= 9) multiplier = 10;
    else if (units >= 10 && units <= 14) multiplier = 9;
    else if (units >= 15 && units <= 20) multiplier = 8;
    
    return units * multiplier;
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
    accent: isNight ? 'text-[#E67E7E]' : 'text-[#A34343]',
    muted: isNight ? 'text-stone-500' : 'text-stone-400',
    divider: isNight ? 'bg-stone-800' : 'bg-stone-100',
    hover: isNight ? 'hover:bg-stone-800' : 'hover:bg-stone-50',
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} font-serif flex flex-col items-center justify-center p-6 transition-colors duration-700`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-md ${theme.card} rounded-[2rem] shadow-xl py-14 px-8 border transition-colors duration-700`}
      >
        <div className="grid grid-cols-2 gap-8 items-center mb-12 relative">
          {/* Vertical Divider */}
          <div className={`absolute left-1/2 top-4 bottom-4 w-px ${theme.divider} -translate-x-1/2 transition-colors duration-700`} />

          {/* Units Counter (Left) */}
          <div className="flex flex-col items-center space-y-6">
            <button 
              onClick={increment}
              disabled={units >= 20}
              className={`p-4 -m-2 rounded-full ${theme.hover} transition-colors disabled:opacity-20 flex items-center justify-center`}
              aria-label="Aumentar unidades"
            >
              <ChevronUp size={32} strokeWidth={1.5} />
            </button>
            
            <div className="relative h-24 w-full flex items-center justify-center">
              <AnimatePresence initial={false}>
                <motion.span
                  key={units}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="text-6xl font-light absolute"
                >
                  {units}
                </motion.span>
              </AnimatePresence>
            </div>

            <button 
              onClick={decrement}
              disabled={units <= 2}
              className={`p-4 -m-2 rounded-full ${theme.hover} transition-colors disabled:opacity-20 flex items-center justify-center`}
              aria-label="Disminuir unidades"
            >
              <ChevronDown size={32} strokeWidth={1.5} />
            </button>
            <span className={`text-[10px] uppercase tracking-widest ${theme.muted} font-sans`}>Unidades</span>
          </div>

          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="h-44 w-full flex flex-col items-center justify-center relative">
              <AnimatePresence initial={false}>
                <motion.div
                  key={totalPrice}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.15 }}
                  className={`text-7xl font-light ${theme.accent} transition-colors duration-700 absolute`}
                >
                  {totalPrice}
                </motion.div>
              </AnimatePresence>
            </div>
            <span className={`text-[10px] uppercase tracking-widest ${theme.muted} font-sans`}>Valor Total</span>
          </div>
        </div>

        <div className="text-center mb-12">
          <p className={`${isNight ? 'text-stone-400' : 'text-stone-500'} italic text-sm transition-colors duration-700`}>
            Criterio de eficiencia por cantidad
          </p>
        </div>

        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWhatsAppClick}
            className={`w-16 h-16 ${isNight ? 'bg-[#25D366]/90' : 'bg-[#25D366]'} text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:shadow-green-500/40`}
            aria-label="Enviar por WhatsApp"
          >
            <MessageCircle size={32} strokeWidth={1.2} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
