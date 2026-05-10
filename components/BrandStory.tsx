'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface StoryCardProps {
  number: string;
  title: string;
  body: string;
  index: number;
}

function StoryCard({ number, title, body, index }: StoryCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
      className="flex flex-col gap-4 group"
    >
      <span className="font-display text-[#C9A84C]/20 text-[5rem] leading-none select-none group-hover:text-[#C9A84C]/40 transition-colors duration-700">
        {number}
      </span>
      <div className="h-px w-12 bg-[#C9A84C]/50 transition-all duration-700 group-hover:w-24 group-hover:bg-[#C9A84C]" />
      <h3 className="font-display text-3xl md:text-4xl text-[#F5F0E8] tracking-wide leading-tight">
        {title}
      </h3>
      <p className="font-body text-[#F5F0E8]/50 text-sm leading-relaxed font-light max-w-xs">
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
    title: 'Calitate\nFără Preț Ascuns',
    body: 'Am renunțat la chinezăriile ieftine. Vindem Specialized, Cross, DHS, Devron, Haibike — branduri care nu te lasă baltă.',
  },
  {
    number: '0',
    title: 'Compromis\nAcceptat',
    body: 'Spațiul e al nostru, nu avem angajați. Cele mai mici prețuri la modele de top. Simplu, cinstit, direct.',
  },
];

export default function BrandStory() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: '-100px' });

  return (
    <section
      id="brand-story"
      className="relative py-36 px-6 md:px-16 lg:px-28 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Background decorative text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display text-[20vw] text-white/[0.02] whitespace-nowrap">
          EXPERIENȚĂ
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div ref={titleRef} className="mb-24">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[#C9A84C] text-xs tracking-[0.5em] uppercase font-light mb-4"
          >
            Povestea noastră
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-display text-[clamp(3rem,8vw,8rem)] text-[#F5F0E8] leading-none tracking-wide"
          >
            UN MAGAZIN
            <br />
            <span className="text-gold-gradient bg-gradient-to-r from-[#E8C97A] via-[#C9A84C] to-[#8B6914] bg-clip-text text-transparent">
              CU SUFLET
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-8 font-body text-[#F5F0E8]/50 text-base md:text-lg leading-relaxed max-w-2xl font-light"
          >
            Tatăl meu a construit ceva mai mult decât un magazin. A construit un loc unde oamenii 
            vin și doar pentru o vorbă bună și o glumă. Asta nu se cumpără — se câștigă în 30 de ani.
          </motion.p>
        </div>

        {/* Story cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
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

        {/* Cinematic quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-32 border-l border-[#C9A84C]/40 pl-8 max-w-3xl"
        >
          <p className="font-playfair text-2xl md:text-3xl text-[#F5F0E8]/80 italic leading-relaxed"
             style={{ fontFamily: 'var(--font-playfair, Georgia)' }}>
            „Toată Vrancea ne cunoaște. Și noi cunoaștem fiecare client pe care l-am ajutat 
            să găsească bicicleta perfectă."
          </p>
          <footer className="mt-6 text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-light">
            — Superbike Focșani
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
