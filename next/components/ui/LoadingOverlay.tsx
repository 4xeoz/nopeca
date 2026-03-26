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
    const t = setTimeout(() => setMinTimePassed(true), 1200);
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
          className="fixed inset-0 z-[9999] overflow-hidden bg-[#0a1628]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
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

          {/* Loading content - centered */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Logo with simple pulse */}
            <motion.div
              className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center"
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Image
                src="/NopecaFooterLogo.png"
                alt="Nopeca"
                width={144}
                height={144}
                priority
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </motion.div>

            {/* Simple loading dots */}
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2.5 h-2.5 bg-[#d4a84b] rounded-full"
                  animate={{
                    opacity: [0.4, 1, 0.4],
                    scale: [0.8, 1, 0.8],
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}