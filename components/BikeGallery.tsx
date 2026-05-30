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
  specs: string[];
  image_url: string;
  bgAccent: string; // subtle color accent behind bike
}

// ─── BIKE DATA ─────────────────────────────────────────────────────────────────
const BIKES: Bike[] = [
  {
    id: 1,
    name: 'Cross RTX FS',
    brand: 'Cross',
    tagline: '"Vedeta noastră absolută! Trece peste bolovani de zici că mergi pe asfalt."',
    description:
      'Dacă vrei distracție și adrenalină pe coborâri — asta e bicicleta ta.',
    specs: [
      'Suspensii: RockShox Psylo & Deluxe (160mm)',
      'Transmisie: Shimano Deore XT (1×12)',
      'Frâne: Hidraulice Shimano (203/180mm)',
      'Roți: 29"  •  Schwalbe Nobby Nic',
    ],
    image_url:
      '/images/corss_rtx_khaki/BICICLETA-FULL-SUSPENSION-CROSS-RTX-FS-29-KHAKI-removebg-preview.png',
    bgAccent: 'from-[#1a2030] via-[#111418] to-[#080808]',
  },
  {
    id: 2,
    name: 'Cross GRX 1x Cues',
    brand: 'Cross',
    tagline: '"Raport preț-calitate imbatabil. O tură cinstită prin pădure, fără să spargi pușculița."',
    description:
      'Hardtail fiabil și accesibil, gata pentru orice potecă.',
    specs: [
      'Furcă: Suntour XCM (100mm)',
      'Transmisie: Shimano Cues (1×9)',
      'Frâne: Hidraulice Clarks M2 (180/160mm)',
      'Roți: 29"  •  Schwalbe Rapid Rob',
    ],
    image_url:
      '/images/cross_fusion_pro/232367_138351_Bicicleta_Mtb_Cross_Grx_1x9_Cues_Dark_Green_1-removebg-preview.png',
    bgAccent: 'from-[#0f1a14] via-[#0d1210] to-[#080808]',
  },
  {
    id: 3,
    name: 'Cross Causa SL1',
    brand: 'Cross',
    tagline: '"Concepută special pentru ele — comodă, elegantă și gata de aventură."',
    description:
      'Geometrie feminină, manevrabilitate perfectă, stil inconfundabil.',
    specs: [
      'Furcă: Suntour XCE (100mm)',
      'Transmisie: Shimano Alivio (3×9)',
      'Frâne: Hidraulice Clarks M2 (160mm)',
      'Roți: 27.5"  •  Kenda',
    ],
    image_url:
      '/images/cross_causa_sl1_albastru_dama/229590_137563_Bicicleta_Mtb_Dama_Cross_Causa_SL_1_27.5_Blue_1-removebg-preview.png',
    bgAccent: 'from-[#0d1520] via-[#0e1018] to-[#080808]',
  },
  {
    id: 4,
    name: 'Cross Dexter HDB',
    brand: 'Cross',
    tagline: '"Pentru puștii cu temperament ridicat. Sarituri, manevre și distracție maximă."',
    description:
      'Construită pentru bike park și dirt — rezistentă, agilă, fără compromisuri.',
    specs: [
      'Furcă: Zoom 595S AMS (100mm)',
      'Transmisie: Shimano Altus/Alivio (3×9)',
      'Frâne: Hidraulice Clarks M2 (160mm)',
      'Roți: 26"  •  Kenda 2.30"',
    ],
    image_url:
      '/images/cross_dexter/241036_139685_Bicicleta_Mtb_Dirt_Cross_Dexter_Army_Green_1-removebg-preview.png',
    bgAccent: 'from-[#161208] via-[#111008] to-[#080808]',
  },
];

// ─── SINGLE BIKE CARD ──────────────────────────────────────────────────────────
function BikeCard({ bike, index }: { bike: Bike; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['3%', '-3%']);

  const isEven = index % 2 === 0;

  return (
    <motion.article
      ref={ref}
      className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[auto] lg:min-h-[85vh] border-b border-[#1a1a1a] group overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* ─── Image column ─── */}
      <div
        className={`relative overflow-hidden ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
        style={{ minHeight: 'min(55vh, 500px)' }}
      >
        {/* Gradient background behind bike */}
        <div className={`absolute inset-0 bg-gradient-to-br ${bike.bgAccent}`} />

        {/* Subtle radial glow at center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,166,35,0.04)_0%,transparent_65%)]" />

        {/* Grid lines - very subtle */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Bike image with parallax */}
        <motion.div className="absolute inset-0 flex items-center justify-center p-6 md:p-10 z-10" style={{ y: imgY }}>
          <div className="relative w-full h-full">
            <Image
              src={bike.image_url}
              alt={bike.name}
              fill
              className="object-contain object-center transition-transform duration-[2000ms] ease-out group-hover:scale-[1.05]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </motion.div>

        {/* Shadow under bike */}
        <div
          className="absolute bottom-0 left-[10%] right-[10%] h-[15%] z-[5] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 70%)',
            filter: 'blur(15px)',
          }}
        />

        {/* Gradient blending into text side */}
        <div
          className={`absolute inset-0 z-[6] ${
            isEven
              ? 'bg-gradient-to-r from-transparent via-transparent to-[#080808]/80'
              : 'bg-gradient-to-l from-transparent via-transparent to-[#080808]/80'
          }`}
        />

        {/* Brand watermark */}
        <div className="absolute bottom-5 left-5 z-10">
          <span className="font-display text-[10px] tracking-[0.5em] text-white/15 uppercase">
            {bike.brand}
          </span>
        </div>

        {/* Index number */}
        <div className="absolute top-5 right-5 z-10 flex items-center gap-2">
          <div className="w-6 h-px bg-[#F5A623]/30" />
          <span className="font-display text-4xl text-[#F5A623]/10 select-none">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* ─── Text column ─── */}
      <motion.div
        className={`flex flex-col justify-center px-6 md:px-14 lg:px-20 py-10 md:py-16 lg:py-20 bg-[#080808] relative ${
          isEven ? 'lg:order-2' : 'lg:order-1'
        }`}
        style={{ y: textY }}
      >
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#F5A623]/[0.015] rounded-full blur-[80px] pointer-events-none" />

        {/* Brand label */}
        <motion.p
          initial={{ opacity: 0, x: isEven ? -20 : 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[#F5A623] text-[10px] tracking-[0.5em] uppercase font-light mb-4 relative z-10"
        >
          {bike.brand}
        </motion.p>

        {/* Bike name */}
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="font-display text-[clamp(2rem,5vw,4rem)] text-[#FFF8F0] leading-[0.95] tracking-wide mb-4 relative z-10"
        >
          {bike.name}
        </motion.h3>

        {/* Orange divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-[2px] w-14 bg-gradient-to-r from-[#F5A623] to-transparent origin-left mb-6"
        />

        {/* Tagline — italic quote */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-[#FFF8F0]/75 text-base md:text-lg italic font-light leading-snug mb-3 relative z-10"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {bike.tagline}
        </motion.p>

        {/* Short description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-[#FFF8F0]/35 text-sm leading-relaxed font-light mb-6 relative z-10"
        >
          {bike.description}
        </motion.p>

        {/* Specs list */}
        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="space-y-2 mb-8 relative z-10"
        >
          {bike.specs.map((spec, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-[#FFF8F0]/40 font-light">
              <span className="text-[#F5A623]/60 mt-0.5 shrink-0">›</span>
              <span>{spec}</span>
            </li>
          ))}
        </motion.ul>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-4 text-[#F5A623] text-[10px] tracking-[0.4em] uppercase font-light group/link relative"
          >
            <span className="relative z-10">Întreabă în magazin</span>
            <span className="h-px w-6 bg-[#F5A623] inline-block transition-all duration-500 group-hover/link:w-14" />
            <span className="absolute -inset-x-4 -inset-y-2 bg-[#F5A623]/0 group-hover/link:bg-[#F5A623]/5 rounded transition-colors duration-500" />
          </a>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

// ─── CROSS TRUST BANNER ────────────────────────────────────────────────────────
function CrossTrustBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="relative bg-[#080808] border-b border-[#1a1a1a] overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,166,35,0.03)_0%,transparent_70%)]" />

      <div className="relative z-10 px-6 md:px-16 lg:px-28 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* Left: Cross brand trust */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[#F5A623] text-[10px] tracking-[0.5em] uppercase font-light mb-3">
            Furnizorul nostru de încredere
          </p>
          <h3 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-[#FFF8F0] leading-[0.95] tracking-wide mb-4">
            CROSS.<br />
            <span className="text-[#FFF8F0]/40 text-[clamp(1rem,2vw,1.5rem)] tracking-widest font-light">De ani de zile.</span>
          </h3>
          <div className="h-[2px] w-10 bg-gradient-to-r from-[#F5A623] to-transparent mb-4" />
          <p className="text-[#FFF8F0]/35 text-sm leading-relaxed font-light max-w-sm">
            Cross este furnizorul de la care lucrăm de ani de zile. Fiabilitate dovedită, 
            cel mai bun raport calitate-preț de pe piață și un service impecabil — 
            de aceea le recomandăm cu toată încrederea.
          </p>
        </motion.div>

        {/* Right: Vrancea invite */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative"
        >
          {/* Card */}
          <div className="border border-[#F5A623]/15 rounded-xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#F5A623]/[0.02] rounded-xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full border border-[#F5A623]/30 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="1.5">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </div>
                <span className="text-[#F5A623] text-[10px] tracking-[0.4em] uppercase font-light">
                  Zona Vrancei
                </span>
              </div>
              <p className="text-[#FFF8F0]/70 text-base md:text-lg italic font-light leading-snug mb-3"
                style={{ fontFamily: 'var(--font-playfair)' }}>
                "Nu vă mai uitați pe site-uri la prețuri."
              </p>
              <p className="text-[#FFF8F0]/35 text-sm leading-relaxed font-light">
                Dacă ești din zona Vrancei, vino direct la noi în magazin. 
                Îți pregătim o surpriză bună la preț. Garantat.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 mt-5 text-[#F5A623] text-[10px] tracking-[0.4em] uppercase font-light group/link"
              >
                <span>Vino la noi</span>
                <span className="h-px w-5 bg-[#F5A623] inline-block transition-all duration-500 group-hover/link:w-10" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── GALLERY SECTION ───────────────────────────────────────────────────────────
export default function BikeGallery() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: '-80px' });

  return (
    <section id="gallery" className="bg-[#080808] relative">
      {/* Ambient glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#F5A623]/[0.015] rounded-full blur-[120px] pointer-events-none" />

      {/* Section header */}
      <div ref={titleRef} className="px-6 md:px-16 lg:px-28 pt-28 md:pt-36 pb-16 md:pb-24 relative z-10">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-[#F5A623] text-[10px] md:text-xs tracking-[0.5em] uppercase font-light mb-4"
        >
          Colecția noastră
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-display text-[clamp(3rem,8vw,8rem)] text-[#FFF8F0] leading-[0.85] tracking-wide"
        >
          THE
          <br />
          <span className="text-brand-gradient">SHOWROOM</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-[#FFF8F0]/35 text-sm max-w-xl font-light leading-relaxed"
        >
          Fiecare bicicletă de mai jos este o alegere, nu un compromis.
          Le puteți vedea și atinge la noi în magazin.
        </motion.p>
      </div>

      {/* Cross trust + Vrancea invite banner */}
      <CrossTrustBanner />

      {/* Bike list */}
      <div>
        {BIKES.map((bike, i) => (
          <BikeCard key={bike.id} bike={bike} index={i} />
        ))}
      </div>
    </section>
  );
}
