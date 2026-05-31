'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const HERO_VIDEOS = [
  '/videos/hero1.mp4',
  '/videos/hero2.mp4',
  '/videos/hero3.mp4',
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoIndex, setVideoIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 8]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoEnd = () => {
    setVideoIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
  };

  // ─── Stagger reveal animations ────────────────────────────────────────────
  const title = 'SUPERBIKE';

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.06, delayChildren: 0.8 },
    },
  };

  const letterVariants = {
    hidden: { y: 140, opacity: 0, rotateX: -60, scale: 0.7 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      scale: 1,
      transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const fadeUp = (delay: number) => ({
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay },
    },
  });

  const lineGrow = (delay: number) => ({
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay },
    },
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100dvh] overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* ═══ VIDEO BACKGROUND ═══ */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y, scale }}
      >
        <AnimatePresence mode="wait">
          <motion.video
            key={videoIndex}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          >
            <source src={HERO_VIDEOS[videoIndex]} type="video/mp4" />
          </motion.video>
        </AnimatePresence>

        {/* Multi-layer cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/70 via-[#080808]/20 to-[#080808]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/50 via-transparent to-[#080808]/30" />
        <div className="vignette" />

        {/* Warm orange haze at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#F5A623]/[0.04] to-transparent pointer-events-none" />
      </motion.div>

      {/* ═══ FLOATING PARTICLES / GLOW ═══ */}
      <div className="absolute inset-0 pointer-events-none z-[5]">
        {/* Ambient orange orb - top right */}
        <motion.div
          className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)',
          }}
          animate={{ y: [0, 30, 0], x: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Ambient red orb - bottom left */}
        <motion.div
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(224,60,49,0.04) 0%, transparent 70%)',
          }}
          animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* ═══ CONTENT ═══ */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center px-6"
        style={{ opacity }}
      >
        {/* Logo above title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={isLoaded ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mb-6"
        >
          <Image
            src="/logos/superbike-logo.png"
            alt="Superbike Logo"
            width={100}
            height={100}
            className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_0_30px_rgba(245,166,35,0.3)]"
            priority
          />
        </motion.div>

        {/* Micro-label above title */}
        <motion.p
          variants={fadeUp(0.5)}
          initial="hidden"
          animate="visible"
          className="text-[#F5A623] text-[10px] md:text-xs tracking-[0.6em] uppercase font-light mb-5"
        >
          Focșani · Vrancea · Din 1995
        </motion.p>

        {/* ─── GIANT TITLE ─── */}
        <motion.div
          className="flex flex-nowrap justify-center overflow-hidden w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ perspective: '1000px' }}
        >
          {title.split('').map((letter, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              className="font-display text-[clamp(2.8rem,10.5vw,13rem)] leading-[0.85] tracking-[0.01em] inline-block text-glow flex-shrink-0"
              style={{
                transformOrigin: 'bottom center',
                color: i < 5 ? '#FFF8F0' : undefined, // SUPER = white
                WebkitTextFillColor: i >= 5 ? 'transparent' : undefined, // BIKE = gradient
                background: i >= 5
                  ? 'linear-gradient(135deg, #FFD080 0%, #F5A623 50%, #E03C31 100%)'
                  : undefined,
                WebkitBackgroundClip: i >= 5 ? 'text' : undefined,
                backgroundClip: i >= 5 ? 'text' : undefined,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        {/* Animated orange gradient line */}
        <motion.div
          className="h-[2px] mt-4 mb-6 origin-center"
          style={{ width: 'clamp(180px, 35vw, 500px)' }}
          variants={lineGrow(1.3)}
          initial="hidden"
          animate="visible"
        >
          <div className="h-full w-full bg-gradient-to-r from-transparent via-[#F5A623] to-transparent" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={fadeUp(1.5)}
          initial="hidden"
          animate="visible"
          className="text-[#FFF8F0]/50 text-xs md:text-sm tracking-[0.3em] uppercase font-light text-center max-w-lg"
        >
          30 de ani de pasiune · Calitate fără compromis
        </motion.p>

        {/* Subtitle - italic poetic line */}
        <motion.p
          variants={fadeUp(1.8)}
          initial="hidden"
          animate="visible"
          className="mt-4 text-[#FFF8F0]/30 text-sm md:text-base font-light italic text-center max-w-md"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Magazin de biciclete premium
        </motion.p>
      </motion.div>

      {/* ═══ SCROLL INDICATOR ═══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 3, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer z-20"
        onClick={() =>
          document.getElementById('brand-story')?.scrollIntoView({ behavior: 'smooth' })
        }
      >
        <span className="text-[#F5A623]/50 text-[9px] tracking-[0.5em] uppercase font-light">
          Descoperă
        </span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-[#F5A623] to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* ═══ VIDEO DOTS ═══ */}
      <div className="absolute bottom-8 right-6 flex gap-2 z-20">
        {HERO_VIDEOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setVideoIndex(i)}
            className={`h-[3px] rounded-full transition-all duration-700 ${
              i === videoIndex
                ? 'bg-[#F5A623] w-8'
                : 'bg-white/20 w-2 hover:bg-white/40'
            }`}
            aria-label={`Video ${i + 1}`}
          />
        ))}
      </div>

      {/* ═══ CORNER FRAMES (decorative) ═══ */}
      <div className="absolute top-6 left-6 w-12 h-12 border-l border-t border-[#F5A623]/15 z-20" />
      <div className="absolute top-6 right-6 w-12 h-12 border-r border-t border-[#F5A623]/15 z-20" />
      <div className="absolute bottom-6 left-6 w-12 h-12 border-l border-b border-[#F5A623]/15 z-20" />
    </section>
  );
}
