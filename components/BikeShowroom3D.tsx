'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';

// ─── PERSPECTIVE DATA ──────────────────────────────────────────────────────────
interface Perspective {
  id: number;
  image: string;
  label: string;
  angle: string;
  title: string;
  subtitle: string;
  description: string;
  specs: { label: string; value: string }[];
  rotateY: number;
}

const PERSPECTIVES: Perspective[] = [
  {
    id: 0,
    image: '/images/showroom/status-side.jpg',
    label: 'PROFIL LATERAL',
    angle: '90°',
    title: 'Geometrie Agresivă',
    subtitle: 'Viziunea de ansamblu',
    description:
      'Cadru M5 Alloy cu geometrie agresivă. 160mm cursă față-spate. Creat pentru cei care transformă fiecare coborâre într-un spectacol.',
    specs: [
      { label: 'Cursă', value: '160mm' },
      { label: 'Cadru', value: 'M5 Alloy' },
      { label: 'Roți', value: '29"' },
    ],
    rotateY: 0,
  },
  {
    id: 1,
    image: '/images/showroom/status-front.jpg',
    label: 'PERSPECTIVĂ 3/4',
    angle: '45°',
    title: 'Prezență Dominantă',
    subtitle: 'Forță și eleganță',
    description:
      'Din acest unghi, vezi puterea reală. Furca FOX Performance, discuri hidraulice SRAM și anvelope Butcher GRID, totul spune agresivitate controlată.',
    specs: [
      { label: 'Furcă', value: 'FOX 36' },
      { label: 'Frâne', value: 'SRAM' },
      { label: 'Anvelope', value: 'Butcher' },
    ],
    rotateY: -45,
  },
  {
    id: 2,
    image: '/images/showroom/status-rear.jpg',
    label: 'SPATE 3/4',
    angle: '315°',
    title: 'Mecanismul din Spate',
    subtitle: 'Inginerie la superlativ',
    description:
      'Amortizorul spate FOX Float, transmisia SRAM NX Eagle 12v și pivotul HORST Link, combinația perfectă pentru tracțiune și control total.',
    specs: [
      { label: 'Amortizor', value: 'FOX Float' },
      { label: 'Transmisie', value: 'NX Eagle' },
      { label: 'Viteze', value: '12' },
    ],
    rotateY: 45,
  },
];

// ─── FLOATING PARTICLES ────────────────────────────────────────────────────────
function Particles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `rgba(245, 166, 35, ${Math.random() * 0.3 + 0.05})`,
          }}
          animate={{
            y: [0, -30 - Math.random() * 60, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ─── PROGRESS RING ─────────────────────────────────────────────────────────────
function ProgressRing({ current, total }: { current: number; total: number }) {
  const circumference = 2 * Math.PI * 18;
  const progress = ((current + 1) / total) * circumference;

  return (
    <svg width="44" height="44" className="rotate-[-90deg]">
      <circle
        cx="22"
        cy="22"
        r="18"
        fill="none"
        stroke="rgba(245,166,35,0.1)"
        strokeWidth="1.5"
      />
      <motion.circle
        cx="22"
        cy="22"
        r="18"
        fill="none"
        stroke="url(#ringGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray={circumference}
        animate={{ strokeDashoffset: circumference - progress }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD080" />
          <stop offset="100%" stopColor="#F5A623" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function BikeShowroom3D() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const lastWheelTime = useRef(0);
  const isInView = useInView(containerRef, { once: false, margin: '-40%' });

  const perspective = PERSPECTIVES[activeIndex];

  const navigate = useCallback(
    (dir: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setDirection(dir);
      setActiveIndex((prev) => {
        const next = prev + dir;
        if (next < 0) return PERSPECTIVES.length - 1;
        if (next >= PERSPECTIVES.length) return 0;
        return next;
      });
      setTimeout(() => setIsTransitioning(false), 900);
    },
    [isTransitioning]
  );

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      const deltaY = e.changedTouches[0].clientY - touchStartX.current;
      if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
        navigate(deltaX > 0 ? -1 : 1);
      }
    },
    [navigate]
  );

  // Wheel handler (with throttle)
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime.current < 1200) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 30) {
        lastWheelTime.current = now;
        navigate(e.deltaX > 0 ? 1 : -1);
      }
    },
    [navigate]
  );

  // Keyboard handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Animation variants
  const imageVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      scale: 0.8,
      rotateY: dir > 0 ? -25 : 25,
      opacity: 0,
      filter: 'blur(10px)',
    }),
    center: {
      x: 0,
      scale: 1,
      rotateY: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-60%' : '60%',
      scale: 0.7,
      rotateY: dir > 0 ? 15 : -15,
      opacity: 0,
      filter: 'blur(8px)',
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 1, 1],
      },
    }),
  };

  const textVariants = {
    enter: (dir: number) => ({
      y: 60,
      opacity: 0,
      x: dir > 0 ? 40 : -40,
    }),
    center: {
      y: 0,
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2,
      },
    },
    exit: {
      y: -40,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const staggerContainer = {
    center: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const staggerItem = {
    enter: { y: 30, opacity: 0 },
    center: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
    exit: { y: -20, opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100dvh] bg-[#050505] overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      style={{ perspective: '1200px' }}
      id="showroom-3d"
    >
      {/* ═══ BACKGROUND GRID ═══ */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,166,35,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,166,35,0.3) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* ═══ AMBIENT GLOW ═══ */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full z-[1]"
        style={{
          background:
            'radial-gradient(circle, rgba(245,166,35,0.04) 0%, rgba(224,60,49,0.02) 40%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Particles />

      {/* ═══ SECTION HEADER ═══ */}
      <div className="relative z-10 pt-16 md:pt-20 px-6 md:px-16 lg:px-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-2"
        >
          <div className="h-px w-8 bg-gradient-to-r from-[#F5A623] to-transparent" />
          <span className="text-[#F5A623] text-[10px] md:text-xs tracking-[0.5em] uppercase font-light">
            Showroom Interactiv
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-display text-[clamp(2rem,6vw,5rem)] text-[#FFF8F0] leading-[0.9] tracking-wide"
        >
          CROSS
          <br />
          <span className="text-brand-gradient">BIKES</span>
        </motion.h2>
      </div>

      {/* ═══ MAIN CONTENT AREA ═══ */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-12 px-6 md:px-16 lg:px-28 py-8 md:py-12 min-h-[70vh]">
        {/* ─── BIKE IMAGE ─── */}
        <div
          className="relative w-full lg:w-[60%] aspect-[4/3] max-w-3xl"
          style={{ perspective: '1000px' }}
        >
          {/* Glow underneath bike */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[2px] z-[3]"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(245,166,35,0.5), transparent)',
              boxShadow: '0 0 40px 10px rgba(245,166,35,0.08)',
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scaleX: [0.8, 1, 0.8],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Shadow beneath bike */}
          <div
            className="absolute bottom-[-5%] left-[15%] right-[15%] h-[20%] z-[1]"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />

          {/* Bike images with perspective animation */}
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 z-[2]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Image
                src={perspective.image}
                alt={`Specialized Status 160 - ${perspective.label}`}
                fill
                className="object-contain object-center drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                sizes="(max-width: 1024px) 90vw, 55vw"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Angle indicator - floating badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`angle-${activeIndex}`}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute top-4 right-4 z-[5] glass-card rounded-full px-4 py-2 flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse" />
              <span className="text-[#F5A623] text-xs font-display tracking-wider">
                {perspective.angle}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ─── TEXT CONTENT ─── */}
        <div className="w-full lg:w-[40%] max-w-md">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={`text-${activeIndex}`}
              custom={direction}
              variants={staggerContainer}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {/* View label */}
              <motion.div variants={staggerItem} className="flex items-center gap-3 mb-4">
                <div className="h-px w-6 bg-[#F5A623]/40" />
                <span className="text-[#F5A623] text-[10px] tracking-[0.5em] uppercase font-light">
                  {perspective.label}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h3
                variants={staggerItem}
                className="font-display text-[clamp(1.8rem,4vw,3.5rem)] text-[#FFF8F0] leading-[0.95] tracking-wide mb-2"
              >
                {perspective.title}
              </motion.h3>

              {/* Subtitle */}
              <motion.p
                variants={staggerItem}
                className="text-[#FFF8F0]/60 text-base md:text-lg italic font-light mb-5"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {perspective.subtitle}
              </motion.p>

              {/* Orange divider */}
              <motion.div
                variants={staggerItem}
                className="h-[2px] w-14 bg-gradient-to-r from-[#F5A623] to-transparent mb-5"
              />

              {/* Description */}
              <motion.p
                variants={staggerItem}
                className="text-[#FFF8F0]/35 text-sm leading-relaxed font-light mb-8"
              >
                {perspective.description}
              </motion.p>

              {/* Specs grid */}
              <motion.div variants={staggerItem} className="grid grid-cols-3 gap-3 mb-8">
                {perspective.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="glass-card rounded-lg p-3 text-center border-glow"
                  >
                    <p className="text-[#F5A623] font-display text-lg md:text-xl tracking-wide">
                      {spec.value}
                    </p>
                    <p className="text-[#FFF8F0]/30 text-[9px] tracking-[0.2em] uppercase mt-1">
                      {spec.label}
                    </p>
                  </div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.a
                variants={staggerItem}
                href="#contact"
                className="inline-flex items-center gap-4 text-[#F5A623] text-[10px] tracking-[0.4em] uppercase font-light group/link relative"
              >
                <span className="relative z-10">Întreabă în magazin</span>
                <span className="h-px w-6 bg-[#F5A623] inline-block transition-all duration-500 group-hover/link:w-14" />
                <span className="absolute -inset-x-4 -inset-y-2 bg-[#F5A623]/0 group-hover/link:bg-[#F5A623]/5 rounded transition-colors duration-500" />
              </motion.a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ═══ BOTTOM CONTROLS ═══ */}
      <div className="relative z-10 flex items-center justify-between px-6 md:px-16 lg:px-28 pb-12 md:pb-16">
        {/* Navigation arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 rounded-full border border-[#F5A623]/20 flex items-center justify-center text-[#F5A623]/60 hover:text-[#F5A623] hover:border-[#F5A623]/50 hover:bg-[#F5A623]/5 transition-all duration-500 group/btn"
            aria-label="Perspectiva anterioară"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform duration-300 group-hover/btn:-translate-x-0.5"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => navigate(1)}
            className="w-12 h-12 rounded-full border border-[#F5A623]/20 flex items-center justify-center text-[#F5A623]/60 hover:text-[#F5A623] hover:border-[#F5A623]/50 hover:bg-[#F5A623]/5 transition-all duration-500 group/btn"
            aria-label="Perspectiva următoare"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Perspective dots with labels */}
        <div className="flex items-center gap-6">
          {PERSPECTIVES.map((p, i) => (
            <button
              key={p.id}
              onClick={() => {
                if (i !== activeIndex && !isTransitioning) {
                  setDirection(i > activeIndex ? 1 : -1);
                  setIsTransitioning(true);
                  setActiveIndex(i);
                  setTimeout(() => setIsTransitioning(false), 900);
                }
              }}
              className="flex flex-col items-center gap-2 group/dot"
              aria-label={p.label}
            >
              <motion.div
                className="relative"
                animate={{
                  scale: i === activeIndex ? 1 : 0.8,
                }}
                transition={{ duration: 0.4 }}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-700 ${
                    i === activeIndex
                      ? 'bg-[#F5A623] shadow-[0_0_12px_rgba(245,166,35,0.5)]'
                      : 'bg-white/15 group-hover/dot:bg-white/30'
                  }`}
                />
                {i === activeIndex && (
                  <motion.div
                    className="absolute -inset-1.5 rounded-full border border-[#F5A623]/30"
                    layoutId="activeDot"
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </motion.div>
              <span
                className={`text-[8px] tracking-[0.3em] uppercase transition-colors duration-500 hidden md:block ${
                  i === activeIndex ? 'text-[#F5A623]/70' : 'text-white/15'
                }`}
              >
                {p.angle}
              </span>
            </button>
          ))}
        </div>

        {/* Progress ring with counter */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <ProgressRing current={activeIndex} total={PERSPECTIVES.length} />
            <span className="absolute text-[#F5A623] text-xs font-display tracking-wider">
              {activeIndex + 1}/{PERSPECTIVES.length}
            </span>
          </div>
        </div>
      </div>

      {/* ═══ SWIPE HINT (appears briefly) ═══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          className="flex items-center gap-2 text-white/20 text-[9px] tracking-[0.3em] uppercase"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: 3, ease: 'easeInOut' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <span>Swipe sau click</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </motion.div>
      </motion.div>

      {/* ═══ DECORATIVE CORNER FRAMES ═══ */}
      <div className="absolute top-6 left-6 w-10 h-10 border-l border-t border-[#F5A623]/10 z-[3]" />
      <div className="absolute top-6 right-6 w-10 h-10 border-r border-t border-[#F5A623]/10 z-[3]" />
      <div className="absolute bottom-6 left-6 w-10 h-10 border-l border-b border-[#F5A623]/10 z-[3]" />
      <div className="absolute bottom-6 right-6 w-10 h-10 border-r border-b border-[#F5A623]/10 z-[3]" />

      {/* ═══ LARGE WATERMARK TEXT ═══ */}
      <div className="absolute bottom-[15%] right-[-5%] z-[1] pointer-events-none select-none">
        <AnimatePresence mode="wait">
          <motion.span
            key={`watermark-${activeIndex}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 0.02, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 1 }}
            className="font-display text-[clamp(6rem,15vw,20rem)] text-[#FFF8F0] leading-none whitespace-nowrap"
          >
            CROSS
          </motion.span>
        </AnimatePresence>
      </div>
    </section>
  );
}
