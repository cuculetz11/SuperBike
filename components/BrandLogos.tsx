'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const BRANDS = [
  { name: 'Specialized', logo: '/logos/specialized.png' },
  { name: 'Cross', logo: '/logos/cross.png' },
  { name: 'DHS', logo: '/logos/dhs.png' },
  { name: 'Devron', logo: '/logos/devron.svg' },
  { name: 'Haibike', logo: '/logos/haibike.svg' },
  { name: 'Shimano', logo: '/logos/shimano.png' },
];

export default function BrandLogos() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  // Duplicate for seamless infinite scroll
  const allBrands = [...BRANDS, ...BRANDS];

  return (
    <section ref={ref} className="py-24 bg-[#0D0D0D] border-y border-[#2A2A2A] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-14 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-[#C9A84C] text-[10px] tracking-[0.5em] uppercase font-light"
        >
          Partenerii noștri de încredere
        </motion.p>
      </div>

      {/* Infinite scrolling logos */}
      <div className="relative">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <motion.div
            className="flex gap-20 items-center"
            animate={{ x: [0, '-50%'] }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {allBrands.map((brand, i) => (
              <div
                key={i}
                className="flex-shrink-0 opacity-30 hover:opacity-80 transition-opacity duration-500 grayscale hover:grayscale-0 transition-all"
              >
                <div className="relative w-32 h-12">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain"
                    sizes="128px"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
