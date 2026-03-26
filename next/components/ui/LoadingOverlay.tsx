'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

const panels = [
  { id: 'panel-top', className: 'bg-[#0a1628]' },        // darker blue
  { id: 'panel-bottom', className: 'bg-[#d4a84b]' },     // gold
];

const MESSAGES = [
  'Loading your experience...',
  'Preparing amazing universities...',
  'Connecting you to success...',
  'Almost ready...',
];

export default function LoadingOverlay() {
  const [loaded, setLoaded] = useState(false);
  const [minTimePassed, setMinTimePassed] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const onReady = () => setLoaded(true);
    if (document.readyState === 'complete') onReady();
    else window.addEventListener('load', onReady);
    return () => window.removeEventListener('load', onReady);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMinTimePassed(true), 1200);
    return () => clearTimeout(t);
  }, []);

  // Cycle through messages
  useEffect(() => {
    if (!minTimePassed && loaded) {
      const interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
      }, 800);
      return () => clearInterval(interval);
    }
  }, [minTimePassed, loaded]);

  const ready = loaded && minTimePassed;

  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => {
      (window as any).__appReady = true;
      window.dispatchEvent(new Event('app:ready'));
    }, 500);

    return () => clearTimeout(timer);
  }, [ready]);

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          {/* Background panels (stacked) */}
          {panels.map((panel, idx) => (
            <motion.div
              key={panel.id}
              className={`absolute inset-0 ${panel.className}`}
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              exit={{ y: idx === 0 ? '-110%' : '110%' }}
              transition={{
                duration: 0.8,
                ease: 'easeInOut',
                delay: idx * 0.12,
              }}
            />
          ))}

          {/* Loading content - centered */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Logo with pulse effect */}
            <motion.div
              className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center"
              animate={{
                scale: [1, 1.05, 1],
                filter: ['drop-shadow(0 0 0px rgba(212, 168, 75, 0))', 'drop-shadow(0 0 20px rgba(212, 168, 75, 0.6))', 'drop-shadow(0 0 0px rgba(212, 168, 75, 0))'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Image
                src="/NopecaFooterLogo.png"
                alt="Nopeca"
                width={128}
                height={128}
                priority
                className="w-full h-full object-contain"
              />
            </motion.div>

            {/* Animated spinner rings */}
            <div className="relative w-16 h-16">
              {/* Outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#d4a84b] border-r-[#d4a84b]"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              {/* Middle ring */}
              <motion.div
                className="absolute inset-2 rounded-full border-2 border-transparent border-b-[#d4a84b]/60 border-l-[#d4a84b]/60"
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              {/* Inner dot */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="w-1.5 h-1.5 bg-[#d4a84b] rounded-full" />
              </motion.div>
            </div>

            {/* Dynamic loading message */}
            <div className="h-8 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={messageIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="text-center text-sm md:text-base font-medium text-white"
                >
                  {MESSAGES[messageIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Animated dots */}
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 bg-[#d4a84b] rounded-full"
                  animate={{
                    opacity: [0.4, 1, 0.4],
                    scale: [0.8, 1.1, 0.8],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>

            {/* Reassurance text */}
            <motion.p
              className="text-xs md:text-sm text-white/40 text-center max-w-xs mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              This won't take long. Your gateway to top universities awaits! ✨
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}