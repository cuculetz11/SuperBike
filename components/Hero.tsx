'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const HERO_VIDEOS = [
  '/videos/hero1.mp4',
  '/videos/hero2.mp4',
  '/videos/hero3.mp4',
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoIndex, setVideoIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleVideoEnd = () => {
    setVideoIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
  };

  // Letter stagger animation
  const title = 'SUPERBIKE';
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.07, delayChildren: 0.6 },
    },
  };
  const letterVariants = {
    hidden: { y: 120, opacity: 0, rotateX: -40 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: 'easeOut', delay: 1.4 },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.2 },
    },
  };

  const scrollIndicatorVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 2.5, duration: 1 },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Video background with parallax */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y, scale }}
      >
        <AnimatePresence mode="wait">
          <motion.video
            key={videoIndex}
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <source src={HERO_VIDEOS[videoIndex]} type="video/mp4" />
          </motion.video>
        </AnimatePresence>

        {/* Multi-layer cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/40 via-transparent to-[#0A0A0A]/20" />
        <div className="video-grain" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center px-6"
        style={{ opacity }}
      >
        {/* Top line decoration */}
        <motion.div
          className="w-px h-16 bg-gradient-to-b from-transparent to-[#C9A84C] mb-10 origin-top"
          variants={lineVariants}
          initial="hidden"
          animate="visible"
        />

        {/* Label */}
        <motion.p
          className="text-[#C9A84C] font-body text-xs tracking-[0.5em] uppercase mb-6 font-light"
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          style={{ transitionDelay: '0.4s' }}
        >
          Focșani · Vrancea · Est. 1995
        </motion.p>

        {/* Giant title with letter-by-letter animation */}
        <motion.div
          className="flex overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ perspective: '800px' }}
        >
          {title.split('').map((letter, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              className="font-display text-[clamp(5rem,15vw,14rem)] leading-none tracking-[0.05em] text-[#F5F0E8] inline-block"
              style={{ transformOrigin: 'top center' }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        {/* Gold line below title */}
        <motion.div
          className="h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent origin-center mt-4 mb-8"
          style={{ width: 'clamp(200px, 40vw, 600px)' }}
          variants={lineVariants}
          initial="hidden"
          animate="visible"
        />

        {/* Subtitle */}
        <motion.p
          className="font-body text-[#F5F0E8]/60 text-sm md:text-base tracking-[0.25em] uppercase font-light text-center max-w-md"
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
        >
          30 de ani de pasiune · Calitate fără compromis
        </motion.p>

        {/* CTA scroll button */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer"
          variants={scrollIndicatorVariants}
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
          onClick={() => {
            document.getElementById('brand-story')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[#C9A84C]/60 text-[10px] tracking-[0.4em] uppercase font-light">
            Descoperă
          </span>
          <motion.div
            className="w-[1px] h-10 bg-gradient-to-b from-[#C9A84C] to-transparent"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>

      {/* Video dots indicator */}
      <div className="absolute bottom-10 right-8 flex gap-2 z-10">
        {HERO_VIDEOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setVideoIndex(i)}
            className={`w-1 h-1 rounded-full transition-all duration-500 ${
              i === videoIndex ? 'bg-[#C9A84C] w-6' : 'bg-white/30'
            }`}
            aria-label={`Video ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
