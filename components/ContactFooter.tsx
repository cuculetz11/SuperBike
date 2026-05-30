'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function ContactFooter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  // Parallax for ghost text
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const ghostX = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);

  // Animated year counter
  const [yearsCount, setYearsCount] = useState(0);
  const yearsTarget = new Date().getFullYear() - 2005; // years since founding

  useEffect(() => {
    if (!isInView) return;
    let frame: number;
    let start: number | null = null;
    const duration = 1800;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setYearsCount(Math.floor(progress * yearsTarget));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isInView, yearsTarget]);

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  };
  const scaleIn = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <footer
      id="contact"
      ref={ref}
      className="relative bg-[#080808] border-t border-[#222222] overflow-hidden"
    >
      {/* ── Animated gradient divider at the top ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5A623] to-transparent origin-center"
      />

      {/* ── Ghost text – contained, parallax ── */}
      <motion.div
        style={{ x: ghostX }}
        className="absolute inset-0 flex items-end justify-center pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-display whitespace-nowrap leading-none translate-y-[18%]"
          style={{
            fontSize: 'clamp(6rem, 18vw, 16rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(245,166,35,0.03)',
          }}
        >
          FOCȘANI
        </span>
      </motion.div>

      {/* ── Ambient glow ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#F5A623]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 md:px-16 lg:px-28 pt-24 sm:pt-28 md:pt-36 pb-14 md:pb-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
        >
          {/* ─── Left: Address + CTA ─── */}
          <div className="flex flex-col gap-6">
            <motion.p
              variants={fadeUp}
              className="text-[#F5A623] text-[9px] md:text-[10px] tracking-[0.5em] uppercase font-light"
            >
              Unde ne găsești
            </motion.p>

            {/* ── Title – properly sized per breakpoint ── */}
            <motion.h2
              variants={fadeUp}
              className="font-display text-[#FFF8F0] leading-[0.9] tracking-wide break-words"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
            >
              SUPER<span className="text-brand-gradient">BIKE</span>
              <br />
              <span className="text-brand-gradient">FOCȘANI</span>
            </motion.h2>

            {/* ── Experience counter ── */}
            <motion.div variants={fadeUp} className="flex items-baseline gap-3">
              <span className="font-display text-[#F5A623] text-4xl md:text-5xl leading-none">
                {yearsCount}+
              </span>
              <span className="text-[#FFF8F0]/30 text-xs tracking-wider uppercase font-light">
                ani de experiență
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-1.5">
              <p className="text-[#FFF8F0]/50 text-sm font-light tracking-wide">
                Bd. Independenței, Focșani
              </p>
              <p className="text-[#FFF8F0]/50 text-sm font-light tracking-wide">
                Județ Vrancea, România
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="h-px w-16 bg-gradient-to-r from-[#F5A623]/60 to-transparent"
            />

            {/* ── Contact links ── */}
            <motion.div variants={fadeUp} className="space-y-4">
              <div className="flex flex-col gap-3">
                <a
                  href="tel:+40766425329"
                  className="flex items-center gap-4 text-[#FFF8F0]/40 hover:text-[#F5A623] transition-colors duration-400 text-sm font-light group"
                >
                  <span className="text-[#F5A623] text-[10px] tracking-[0.3em] uppercase w-16">
                    Tel 1
                  </span>
                  <span>0766 425 329</span>
                  <span className="h-px w-0 group-hover:w-6 bg-[#F5A623] transition-all duration-500" />
                </a>
                <a
                  href="tel:+40761857003"
                  className="flex items-center gap-4 text-[#FFF8F0]/40 hover:text-[#F5A623] transition-colors duration-400 text-sm font-light group"
                >
                  <span className="text-[#F5A623] text-[10px] tracking-[0.3em] uppercase w-16">
                    Tel 2
                  </span>
                  <span>0761 857 003</span>
                  <span className="h-px w-0 group-hover:w-6 bg-[#F5A623] transition-all duration-500" />
                </a>
                <a
                  href="https://www.facebook.com/superbikefocsani.ro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-[#FFF8F0]/40 hover:text-[#F5A623] transition-colors duration-400 text-sm font-light group"
                >
                  <span className="text-[#F5A623] text-[10px] tracking-[0.3em] uppercase w-20 shrink-0">
                    Facebook
                  </span>
                  <span>@superbikefocsani.ro</span>
                  <span className="h-px w-0 group-hover:w-6 bg-[#F5A623] transition-all duration-500" />
                </a>
                <a
                  href="https://www.instagram.com/superbikefocsani/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-[#FFF8F0]/40 hover:text-[#F5A623] transition-colors duration-400 text-sm font-light group"
                >
                  <span className="text-[#F5A623] text-[10px] tracking-[0.3em] uppercase w-20 shrink-0">
                    Insta
                  </span>
                  <span>@superbikefocsani</span>
                  <span className="h-px w-0 group-hover:w-6 bg-[#F5A623] transition-all duration-500" />
                </a>
              </div>
            </motion.div>

            {/* ── CTA Button with pulse glow ── */}
            <motion.div variants={fadeUp} className="mt-2">
              <a
                href="https://maps.google.com/?q=Bd+Independentei+Focsani"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 border border-[#F5A623] text-[#F5A623] px-8 sm:px-10 py-4 text-[10px] md:text-xs tracking-[0.4em] uppercase font-light hover:bg-[#F5A623] hover:text-[#080808] transition-all duration-500 pulse-glow group"
              >
                <span>Vino în Magazin</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* ─── Right: Map with glowing pin ─── */}
          <motion.div
            variants={scaleIn}
            className="relative h-72 sm:h-80 lg:h-full min-h-[280px] overflow-hidden border border-[#222222] rounded-sm group"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2766.3!2d27.177!3d45.697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b5bb9e!2sFoc%C8%99ani%2C+Bulevardul+Independen%C8%9Bei!5e0!3m2!1sro!2sro!4v1"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: 'grayscale(100%) contrast(0.85) brightness(0.35) sepia(0.15)',
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Superbike Focșani locație"
            />

            {/* ── Orange tint overlay ── */}
            <div className="absolute inset-0 bg-[#F5A623]/[0.03] pointer-events-none" />

            {/* ── Hover border glow ── */}
            <div className="absolute inset-0 border border-[#F5A623]/0 group-hover:border-[#F5A623]/20 transition-all duration-700 pointer-events-none rounded-sm" />

            {/* ── Animated location pin ── */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="relative flex items-center justify-center">
                {/* Pulse rings */}
                <span className="absolute w-8 h-8 rounded-full border border-[#F5A623]/30 animate-ping" />
                <span
                  className="absolute w-14 h-14 rounded-full border border-[#F5A623]/10"
                  style={{ animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite 0.5s' }}
                />
                {/* Pin dot */}
                <span className="relative w-3 h-3 rounded-full bg-[#F5A623] shadow-[0_0_12px_rgba(245,166,35,0.6)]" />
              </div>
            </div>

            {/* ── Label ── */}
            <div className="absolute bottom-3 left-3 bg-[#080808]/90 backdrop-blur-sm px-4 py-2.5 border border-[#F5A623]/10 rounded-sm">
              <p className="text-[#F5A623] text-[9px] tracking-[0.4em] uppercase font-light">
                Locație
              </p>
              <p className="text-[#FFF8F0] text-xs font-light mt-0.5">
                Bd. Independenței · Focșani
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ─── Bottom bar ─── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-14 pt-6 border-t border-[#222222] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <Image
              src="/logos/superbike-logo.png"
              alt="Superbike"
              width={24}
              height={24}
              className="w-5 h-5 object-contain opacity-40"
            />
            <p className="text-[#FFF8F0]/20 text-xs font-light tracking-wider">
              © {new Date().getFullYear()} Superbike Focșani
            </p>
          </div>
          <p className="text-[#FFF8F0]/15 text-[10px] font-light tracking-wider">
            Specialized · Cross · DHS · Devron · Haibike
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
