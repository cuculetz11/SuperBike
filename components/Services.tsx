'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ServiceCardProps {
  icon: string;
  title: string;
  body: string;
  accent?: string;
  index: number;
}

function ServiceCard({ icon, title, body, accent, index }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="relative p-8 md:p-10 glass-card rounded-sm group hover:border-[#F5A623]/25 transition-all duration-700 flex flex-col"
    >
      {/* Hover glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#F5A623]/0 group-hover:bg-[#F5A623]/[0.04] blur-3xl transition-all duration-700" />

      {/* Icon */}
      <span className="text-4xl md:text-5xl mb-6 block relative z-10">{icon}</span>

      {/* Title */}
      <h3 className="font-display text-2xl md:text-3xl text-[#FFF8F0] tracking-wide leading-tight mb-4 relative z-10">
        {title}
      </h3>

      {/* Divider */}
      <div className="h-[2px] w-10 bg-gradient-to-r from-[#F5A623]/60 to-transparent mb-5 transition-all duration-700 group-hover:w-16 group-hover:from-[#F5A623]" />

      {/* Body */}
      <p className="text-[#FFF8F0]/40 text-sm leading-relaxed font-light flex-1 relative z-10">
        {body}
      </p>

      {/* Accent label */}
      {accent && (
        <div className="mt-6 pt-5 border-t border-[#222222]">
          <span className="text-[#F5A623] text-[10px] tracking-[0.4em] uppercase font-light">
            {accent}
          </span>
        </div>
      )}
    </motion.div>
  );
}

const SERVICES = [
  {
    icon: '🔧',
    title: 'Service\nProfesional',
    body: 'Reparăm și întreținem bicicletele clienților noștri. Avem experiența și piesele originale. Prioritate pentru cine a cumpărat de la noi, dar ușa e deschisă pentru toți.',
    accent: 'Prioritate clienți Superbike',
  },
  {
    icon: '🔄',
    title: 'Buy-Back\nCopii',
    body: 'Cumperi bicicleta pentru copil. Crește? O aduci înapoi, o vindem noi, și îi dăm una mai mare. Plătești doar diferența. Funcționează doar cu produsele cumpărate de la noi.',
    accent: 'Plătești doar diferența',
  },
  {
    icon: '💰',
    title: 'Preț Special\nLa Comandă',
    body: 'Ți-a plăcut o bicicletă de la producătorii noștri? O putem aduce la un preț mai bun decât oriunde altundeva. Vorbește cu noi, găsim soluția perfectă.',
    accent: 'Prețuri imbatabile',
  },
  {
    icon: '♻️',
    title: 'Biciclete\nSecond-Hand',
    body: 'Avem și o selecție atent verificată de biciclete rulate, potrivite chiar pentru toate buzunarele. Revizie la zi, calitate garantată.',
    accent: 'Pentru toate buzunarele',
  },
];

export default function Services() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: '-80px' });

  return (
    <section
      id="services"
      className="relative py-28 md:py-40 px-6 md:px-16 lg:px-28 bg-[#080808] overflow-hidden"
    >
      {/* Giant ghost text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display text-[20vw] text-white/[0.012] whitespace-nowrap">
          SERVICII
        </span>
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#F5A623]/[0.02] rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div ref={titleRef} className="mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-[#F5A623] text-[10px] md:text-xs tracking-[0.5em] uppercase font-light mb-5"
          >
            Mai mult decât un magazin
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-display text-[clamp(2.5rem,7vw,7rem)] text-[#FFF8F0] leading-[0.9] tracking-wide"
          >
            DE CE
            <br />
            <span className="text-brand-gradient">SUPERBIKE?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-[#FFF8F0]/35 text-sm md:text-base max-w-xl font-light leading-relaxed"
          >
            Nu vindem doar biciclete. Oferim o experiență completă, de la sfat sincer,
            la service de încredere, la programe unice pe care nu le găsești în altă parte.
          </motion.p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={i}
              index={i}
              icon={service.icon}
              title={service.title}
              body={service.body}
              accent={service.accent}
            />
          ))}
        </div>

        {/* Bottom CTA line */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-16 md:mt-20 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-4 text-[#F5A623] text-[10px] md:text-xs tracking-[0.4em] uppercase font-light group"
          >
            <span className="h-px w-8 bg-[#F5A623]/30 group-hover:w-14 transition-all duration-500" />
            <span>Vorbește cu noi</span>
            <span className="h-px w-8 bg-[#F5A623]/30 group-hover:w-14 transition-all duration-500" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
