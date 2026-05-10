'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export interface Bike {
  id: number;
  name: string;
  brand: string;
  tagline: string;
  description: string;
  image_url: string;
  accent_color?: string;
}

// ─── MOCK DATA ─────────────────────────────────────────────────────────────────
// Replace image_url values with your Supabase Storage URLs when ready.
// Format: https://tyhkmczfmbvxrivetciq.supabase.co/storage/v1/object/public/showroom-media/YOUR_FILE
const BIKES: Bike[] = [
  {
    id: 1,
    name: 'Specialized Status 160',
    brand: 'Specialized',
    tagline: 'Domină orice coborâre.',
    description:
      'Un enduro machine construit pentru cei care nu au limite. 160mm de cursă față-spate, cadru din aluminiu M5 și componentele care redefinesc agresivitatea.',
    image_url: '/images/status160.jpg',
    accent_color: '#C9A84C',
  },
  {
    id: 2,
    name: 'Specialized Stumpjumper',
    brand: 'Specialized',
    tagline: 'Legendă vie pe orice trail.',
    description:
      'Cel mai iconic full-suspension trail bike din lume. Geometrie ultra-versatilă, componente de clasă mondială, plăcere pură de la primul rulaj.',
    image_url: '/images/stumpjumper.jpg',
    accent_color: '#E8C97A',
  },
  {
    id: 3,
    name: 'Cross GRX 9',
    brand: 'Cross',
    tagline: 'Gravel fără frontiere.',
    description:
      'Conceput pentru aventurieri. Cadru robust, geometrie relaxată pentru distanțe lungi, compatibil cu orice tip de teren. România nu mai are granițe.',
    image_url: '/images/crossgrx9.jpg',
    accent_color: '#C9A84C',
  },
  {
    id: 4,
    name: 'Haibike AllMtn CF 11',
    brand: 'Haibike',
    tagline: 'Muntele nu mai are secrete.',
    description:
      'E-MTB full carbon cu motor Bosch Performance CX. Putere electrică, agilitate de campion. Urci ce credeai că e imposibil.',
    image_url: '/images/haibike.jpg',
    accent_color: '#8B6914',
  },
  {
    id: 5,
    name: 'Specialized Tarmac SL8',
    brand: 'Specialized',
    tagline: 'Cel mai ușor gând pe asfalt.',
    description:
      'Bicicleta de șosea cu cel mai aerodinamic cadru din istoria Specialized. Carbon ultralight, rigiditate perfectă, viteza pe care o meriți.',
    image_url: '/images/tarmac.avif',
    accent_color: '#F5F0E8',
  },
  {
    id: 6,
    name: 'Cross Fusion Pro',
    brand: 'Cross',
    tagline: 'Urban. Elegant. Rapid.',
    description:
      'Bicicleta perfectă pentru orașul modern. Cadru ușor, componente fiabile, design curat care atrage privirile la fiecare semafor.',
    image_url: '/images/fusionpro.jpg',
    accent_color: '#C9A84C',
  },
];

// ─── SINGLE BIKE CARD ──────────────────────────────────────────────────────────
function BikeCard({ bike, index }: { bike: Bike; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  const isEven = index % 2 === 0;

  return (
    <motion.article
      ref={ref}
      id={`bike-${bike.id}`}
      className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[85vh] border-b border-[#2A2A2A] group"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Image column */}
      <div
        className={`relative overflow-hidden bg-[#111111] ${
          isEven ? 'lg:order-1' : 'lg:order-2'
        }`}
        style={{ minHeight: '60vh' }}
      >
        {/* Parallax image wrapper */}
        <motion.div className="absolute inset-0" style={{ y: imgY }}>
          <Image
            src={bike.image_url}
            alt={bike.name}
            fill
            className="object-cover object-center transition-transform duration-[2000ms] group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Image overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-${isEven ? 'r' : 'l'} from-transparent via-transparent to-[#0A0A0A]/60`}
          />
        </motion.div>

        {/* Brand watermark on image */}
        <div className="absolute bottom-6 left-6 z-10">
          <span className="font-display text-xs tracking-[0.4em] text-white/30 uppercase">
            {bike.brand}
          </span>
        </div>

        {/* Index number */}
        <div className="absolute top-6 right-6 z-10">
          <span className="font-display text-6xl text-white/10 select-none">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Text column */}
      <div
        className={`flex flex-col justify-center px-10 md:px-16 lg:px-20 py-20 bg-[#0A0A0A] ${
          isEven ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        {/* Brand label */}
        <motion.p
          initial={{ opacity: 0, x: isEven ? -20 : 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[#C9A84C] text-[10px] tracking-[0.5em] uppercase font-light mb-4"
        >
          {bike.brand}
        </motion.p>

        {/* Bike name */}
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="font-display text-[clamp(2.5rem,5vw,5rem)] text-[#F5F0E8] leading-none tracking-wide mb-5"
        >
          {bike.name}
        </motion.h3>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-px w-16 bg-gradient-to-r from-[#C9A84C] to-transparent origin-left mb-8"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-body text-[#F5F0E8]/90 text-xl md:text-2xl italic font-light leading-snug mb-6"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {bike.tagline}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="font-body text-[#F5F0E8]/40 text-sm leading-relaxed font-light max-w-sm"
        >
          {bike.description}
        </motion.p>

        {/* CTA link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 text-[#C9A84C] text-xs tracking-[0.4em] uppercase font-light group/link"
          >
            <span>Întreabă în magazin</span>
            <span className="h-px w-8 bg-[#C9A84C] inline-block transition-all duration-500 group-hover/link:w-16" />
          </a>
        </motion.div>
      </div>
    </motion.article>
  );
}

// ─── GALLERY SECTION ───────────────────────────────────────────────────────────
export default function BikeGallery() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: '-80px' });

  return (
    <section id="gallery" className="bg-[#0A0A0A]">
      {/* Section header */}
      <div ref={titleRef} className="px-6 md:px-16 lg:px-28 pt-32 pb-20">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-[#C9A84C] text-xs tracking-[0.5em] uppercase font-light mb-4"
        >
          Colecția noastră
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-display text-[clamp(3rem,8vw,8rem)] text-[#F5F0E8] leading-none tracking-wide"
        >
          THE
          <br />
          <span
            className="bg-gradient-to-r from-[#E8C97A] via-[#C9A84C] to-[#8B6914] bg-clip-text text-transparent"
          >
            SHOWROOM
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 font-body text-[#F5F0E8]/40 text-sm max-w-xl font-light leading-relaxed"
        >
          Fiecare bicicletă de mai jos este o alegere, nu un compromis. 
          Le puteți vedea și atinge la noi în magazin.
        </motion.p>
      </div>

      {/* Bike list */}
      <div>
        {BIKES.map((bike, i) => (
          <BikeCard key={bike.id} bike={bike} index={i} />
        ))}
      </div>
    </section>
  );
}
