'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface StoryCardProps {
  number: string;
  title: string;
  body: string;
  index: number;
}

function StoryCard({ number, title, body, index }: StoryCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 70, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      className="relative flex flex-col gap-5 p-8 glass-card rounded-sm group hover:border-[#F5A623]/20 transition-all duration-700"
    >
      {/* Glow behind number on hover */}
      <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#F5A623]/0 group-hover:bg-[#F5A623]/5 rounded-full blur-3xl transition-all duration-700" />

      <span className="font-display text-[#F5A623]/20 text-[5rem] leading-none select-none group-hover:text-[#F5A623]/40 transition-colors duration-700 relative z-10">
        {number}
      </span>
      <div className="h-[2px] w-10 bg-gradient-to-r from-[#F5A623]/60 to-transparent transition-all duration-700 group-hover:w-20 group-hover:from-[#F5A623]" />
      <h3 className="font-display text-2xl md:text-3xl text-[#FFF8F0] tracking-wide leading-tight whitespace-pre-line">
        {title}
      </h3>
      <p className="font-body text-[#FFF8F0]/40 text-sm leading-relaxed font-light">
        {body}
      </p>
    </motion.div>
  );
}

const storyItems = [
  {
    number: '30',
    title: 'Ani de\nExperiență',
    body: 'Din 1995, suntem aceeași oameni, în același loc, cu aceeași pasiune. Vrancea ne cunoaște. Clienții ne știu pe nume.',
  },
  {
    number: '20',
    title: 'Ani în\nAceeași Locație',
    body: 'Bd. Independenței, Focșani. Nu ne-am mutat, nu ne-am schimbat. Stabilitate înseamnă încredere.',
  },
  {
    number: '∞',
    title: 'Calitate\nFără Compromis',
    body: 'Am renunțat la chinezăriile ieftine. Vindem Specialized, Cross, DHS, Devron, Haibike — branduri care nu te lasă baltă.',
  },
  {
    number: '0',
    title: 'Zero\nCompromituri',
    body: 'Spațiul e al nostru, nu avem angajați. Cele mai mici prețuri la modele de top. Simplu, cinstit, direct.',
  },
];

export default function BrandStory() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: '-100px' });
  const storeRef = useRef<HTMLDivElement>(null);
  const storeInView = useInView(storeRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: storeRef,
    offset: ['start end', 'end start'],
  });
  const storeY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section
      id="brand-story"
      className="relative py-32 md:py-44 px-6 md:px-16 lg:px-28 bg-[#080808] overflow-hidden"
    >
      {/* Background decorative text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display text-[22vw] text-white/[0.015] whitespace-nowrap">
          EXPERIENȚĂ
        </span>
      </div>

      {/* Subtle ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#F5A623]/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div ref={titleRef} className="mb-20 md:mb-28">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[#F5A623] text-[10px] md:text-xs tracking-[0.5em] uppercase font-light mb-5"
          >
            Povestea noastră
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-display text-[clamp(3rem,8vw,8rem)] text-[#FFF8F0] leading-[0.9] tracking-wide"
          >
            UN MAGAZIN
            <br />
            <span className="text-brand-gradient">CU SUFLET</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-8 font-body text-[#FFF8F0]/40 text-base md:text-lg leading-relaxed max-w-2xl font-light"
          >
            Tatăl meu a construit ceva mai mult decât un magazin. A construit un loc unde oamenii
            vin și doar pentru o vorbă bună și o glumă. Asta nu se cumpără — se câștigă în 30 de ani.
          </motion.p>
        </div>

        {/* Story cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {storyItems.map((item, i) => (
            <StoryCard
              key={i}
              index={i}
              number={item.number}
              title={item.title}
              body={item.body}
            />
          ))}
        </div>

        {/* ─── STORE IMAGE + QUOTE ─── */}
        <div ref={storeRef} className="mt-28 md:mt-36 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Store photo with parallax */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={storeInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/3] overflow-hidden rounded-sm border border-[#222222]"
          >
            <motion.div className="absolute inset-0" style={{ y: storeY }}>
              <Image
                src="/images/store.jpg"
                alt="Magazinul Superbike Focșani"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
            {/* Warm overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 to-transparent" />
            {/* Label */}
            <div className="absolute bottom-4 left-4 bg-[#080808]/80 backdrop-blur-sm px-4 py-2 border border-[#F5A623]/10">
              <p className="text-[#F5A623] text-[9px] tracking-[0.4em] uppercase font-light">Bd. Independenței · Focșani</p>
            </div>
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0, x: 40 }}
            animate={storeInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="border-l-2 border-[#F5A623]/30 pl-8"
          >
            <p
              className="text-2xl md:text-3xl text-[#FFF8F0]/80 italic leading-relaxed"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              „Toată Vrancea ne cunoaște. Și noi cunoaștem fiecare client pe care l-am ajutat
              să găsească bicicleta perfectă."
            </p>
            <footer className="mt-6 flex items-center gap-4">
              <div className="h-px w-8 bg-[#F5A623]/40" />
              <span className="text-[#F5A623] text-[10px] tracking-[0.4em] uppercase font-light">
                Superbike Focșani
              </span>
            </footer>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}
