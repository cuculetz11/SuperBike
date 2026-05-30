'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const BRANDS = [
  { name: 'Specialized', logo: '/logos/specialized.png', link: 'https://crossbike.ro/' },
  { name: 'Cross', logo: '/logos/cross.png', link: 'https://crossbike.ro/' },
  { name: 'DHS', logo: '/logos/dhs.png', link: 'https://afisport.ro/?utm_source=google&utm_medium=cpc&utm_campaign=&utm_id=21991970878&utm_term=&utm_content=&utm_feeditemid=&utm_device=c&utm_placement=&gad_source=1&gad_campaignid=21988080437&gclid=Cj0KCQjwlerQBhDMARIsAB16H-WuEH0Qg890wYTKySPe3Ib3L8a0O3XU8Nirl297s9a316lZNURxAXQaAuaNEALw_wcB' },
  { name: 'Devron', logo: '/logos/devron_logo.webp', link: 'https://afisport.ro/?utm_source=google&utm_medium=cpc&utm_campaign=&utm_id=21991970878&utm_term=&utm_content=&utm_feeditemid=&utm_device=c&utm_placement=&gad_source=1&gad_campaignid=21988080437&gclid=Cj0KCQjwlerQBhDMARIsAB16H-WuEH0Qg890wYTKySPe3Ib3L8a0O3XU8Nirl297s9a316lZNURxAXQaAuaNEALw_wcB' },
  { name: 'Haibike', logo: '/logos/haibike.png' },
  { name: 'Shimano', logo: '/logos/shimano.png' },
];

export default function BrandLogos() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  const allBrands = [...BRANDS, ...BRANDS, ...BRANDS]; // triple for seamless loop

  return (
    <section ref={ref} className="py-20 bg-[#0A0A0A] border-y border-[#222222] overflow-hidden relative">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[100px] bg-[#F5A623]/[0.02] blur-[60px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 mb-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-[#F5A623] text-[9px] md:text-[10px] tracking-[0.6em] uppercase font-light"
        >
          Parteneriate de încredere
        </motion.p>
      </div>

      {/* Infinite scrolling logos */}
      <div className="relative">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex gap-16 md:gap-24 items-center"
            animate={{ x: [0, '-33.33%'] }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {allBrands.map((brand, i) => (
              <div
                key={i}
                className="flex-shrink-0 opacity-25 hover:opacity-70 grayscale hover:grayscale-0 transition-all duration-700"
              >
                {brand.link ? (
                  <a href={brand.link} target="_blank" rel="noopener noreferrer" className="block relative w-28 md:w-36 h-10 md:h-12 cursor-pointer">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className="object-contain"
                      sizes="144px"
                    />
                  </a>
                ) : (
                  <div className="relative w-28 md:w-36 h-10 md:h-12 cursor-default">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className="object-contain"
                      sizes="144px"
                    />
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
