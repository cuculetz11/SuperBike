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
      <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#F5A623]/0 group-hover:bg-[#F5A623]/5 rounded-full blur-3xl transition-all duration-700" />
      <span className="font-display text-[#F5A623]/20 text-[4rem] leading-none select-none group-hover:text-[#F5A623]/40 transition-colors duration-700 relative z-10">
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
    number: '30+',
    title: 'Ani de\nExperiență',
    body: 'Facem asta de o viață. Cunoaștem bicicletele ca pe propriile buzunare și te ajutăm să alegi exact ce ți se potrivește.',
  },
  {
    number: '%',
    title: 'Prețuri\nSub Piață',
    body: 'Spațiul e al nostru, nu avem angajați. Asta înseamnă că putem garanta prețuri reale, mult sub media pieței, la branduri de top.',
  },
  {
    number: '∞',
    title: 'Gamă\nVariată',
    body: 'Cross, DHS, Devron, Specialized, Haibike, Kross. Oferim biciclete electrice la prețuri super, triciclete pentru adulți, trotinete și o gamă largă de accesorii și piese.',
  },
  {
    number: '★',
    title: 'Oameni\nPasionați',
    body: 'Suntem oameni normali care iubesc bicicletele. Vii, râdem, glumim, îți dai seama ce îți trebuie și pleci mulțumit. Simplu.',
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
      className="relative py-24 md:py-44 px-5 sm:px-8 md:px-16 lg:px-28 bg-[#080808] overflow-hidden"
    >
      {/* Background decorative text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display text-[22vw] text-white/[0.015] whitespace-nowrap">
          FOCȘANI
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
            className="text-[#F5A623] text-[10px] md:text-xs tracking-[0.35em] md:tracking-[0.5em] uppercase font-light mb-5"
          >
            Despre Noi
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-display text-[clamp(2.5rem,8vw,8rem)] text-[#FFF8F0] leading-[0.9] tracking-wide"
          >
            MAI MULT DECÂT
            <br />
            <span className="text-brand-gradient">UN MAGAZIN</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-8 font-body text-[#FFF8F0]/50 text-sm md:text-lg leading-relaxed max-w-3xl font-light"
          >
            Suntem o echipă deschisă, cu experiență de peste 30 de ani și un singur obiectiv: să pleci mulțumit.
            Vino la noi, spune-ne ce îți trebuie și îți găsim exact ce cauți, la prețul corect, garantat sub piață.
          </motion.p>
        </div>

        {/* Story cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4">
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
        <div ref={storeRef} className="mt-20 md:mt-36 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 to-transparent" />
            <div className="absolute bottom-4 left-4 bg-[#080808]/80 backdrop-blur-sm px-4 py-2 border border-[#F5A623]/10">
              <p className="text-[#F5A623] text-[9px] tracking-[0.4em] uppercase font-light">Bd. Independenței · Focșani</p>
            </div>
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0, x: 40 }}
            animate={storeInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="border-l-2 border-[#F5A623]/30 pl-5 md:pl-8"
          >
            <p
              className="text-lg md:text-2xl text-[#FFF8F0]/80 italic leading-relaxed"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              „Toată Vrancea ne cunoaște. Și noi cunoaștem fiecare client pe care l-am ajutat
              să găsească bicicleta perfectă. Vino și tu."
            </p>
            <footer className="mt-6 flex items-center gap-4">
              <div className="h-px w-8 bg-[#F5A623]/40" />
              <span className="text-[#F5A623] text-[10px] tracking-[0.4em] uppercase font-light">
                Echipa Superbike
              </span>
            </footer>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}
