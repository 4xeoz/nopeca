'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

const panels = [
  { id: 'panel-top', className: 'bg-[#0a1628]' },
  { id: 'panel-bottom', className: 'bg-[#d4a84b]' },
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
    const t = setTimeout(() => setMinTimePassed(true), 1500);
    return () => clearTimeout(t);
  }, []);

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
          className="fixed inset-0 z-[9999] overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0f1f35] to-[#0a1628]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, #d4a84b 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, #d4a84b 0%, transparent 50%)',
                'radial-gradient(circle at 50% 20%, #d4a84b 0%, transparent 50%)',
                'radial-gradient(circle at 50% 80%, #d4a84b 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, #d4a84b 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Panel transitions */}
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

          {/* Main content container */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Floating orbiting elements */}
            <div className="relative w-40 h-40 md:w-56 md:h-56 flex items-center justify-center">
              {/* Center circle */}
              <motion.div
                className="absolute w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#d4a84b] to-[#c49a3d] shadow-2xl shadow-[#d4a84b]/50 flex items-center justify-center"
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    '0 0 30px 0px rgba(212, 168, 75, 0.3)',
                    '0 0 50px 15px rgba(212, 168, 75, 0.6)',
                    '0 0 30px 0px rgba(212, 168, 75, 0.3)',
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Image
                  src="/NopecaFooterLogo.png"
                  alt="Nopeca"
                  width={80}
                  height={80}
                  priority
                  className="w-14 h-14 md:w-20 md:h-20 object-contain"
                />
              </motion.div>

              {/* Orbiting dots - 3 planets */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 md:w-4 md:h-4 bg-[#d4a84b] rounded-full"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    top: '50%',
                    left: '50%',
                    originX: (80 + (i + 1) * 25) / 2 + 'px',
                    originY: '50%',
                  }}
                />
              ))}

              {/* Orbital rings */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`ring-${i}`}
                  className="absolute rounded-full border border-[#d4a84b]/20"
                  style={{
                    width: 80 + (i + 1) * 50,
                    height: 80 + (i + 1) * 50,
                  }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>

            {/* Animated text */}
            <motion.div
              className="mt-12 md:mt-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-4xl font-black text-white mb-2 tracking-tight">
                <motion.span
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Nopeca
                </motion.span>
              </h2>
              <motion.p
                className="text-[#d4a84b] text-sm md:text-base font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Your Gateway Awaits
              </motion.p>
            </motion.div>

            {/* Loading bars */}
            <div className="mt-10 md:mt-14 flex gap-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 md:w-2 h-8 md:h-10 bg-gradient-to-t from-[#d4a84b] to-[#e8c06a] rounded-full"
                  animate={{
                    scaleY: [0.3, 1, 0.3],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-[#d4a84b] rounded-full"
                animate={{
                  x: [0, Math.random() * 100 - 50, 0],
                  y: [0, Math.random() * 100 - 50, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeInOut',
                }}
                style={{
                  top: `${30 + Math.random() * 40}%`,
                  left: `${20 + Math.random() * 60}%`,
                }}
              />
            ))}

            {/* Bottom text */}
            <motion.div
              className="absolute bottom-8 md:bottom-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-white/50 text-xs md:text-sm font-medium">
                <motion.span
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  ✨ Loading
                </motion.span>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}