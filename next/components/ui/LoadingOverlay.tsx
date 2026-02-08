'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const panels = [
  { id: 'panel-top', className: 'bg-[--color-brand-primary] z-20' },        // darker blue
  { id: 'panel-bottom', className: 'bg-[--color-brand-secondary] z-10' },   // yellow/gold
];

export default function LoadingOverlay() {
  const [loaded, setLoaded] = useState(false);
  const [minTimePassed, setMinTimePassed] = useState(false);

  useEffect(() => {
    const onReady = () => setLoaded(true);
    if (document.readyState === 'complete') onReady();
    else window.addEventListener('load', onReady);
    return () => window.removeEventListener('load', onReady);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMinTimePassed(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const ready = loaded && minTimePassed;

  useEffect(() => {
    if (!ready) return;
    // Mark readiness globally after overlay exit delay so downstream animations start after the panels clear.
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
          {/* Panels (stacked) */}
          {panels.map((panel, idx) => (
            <motion.div
              key={panel.id}
              className={`absolute inset-0 ${panel.className}`}
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              exit={{ y: '-110%' }}
              transition={{
                duration: 0.7,
                ease: 'easeInOut',
                delay: idx * 0.15, // stagger upward
              }}
            />
          ))}

          
        </motion.div>
      )}
    </AnimatePresence>
  );
}