'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ContactFooter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <footer
      id="contact"
      ref={ref}
      className="relative bg-[#0A0A0A] border-t border-[#2A2A2A] overflow-hidden"
    >
      {/* Giant ghost text background */}
      <div className="absolute inset-0 flex items-end justify-center pb-0 pointer-events-none select-none overflow-hidden">
        <span className="font-display text-[22vw] text-white/[0.025] whitespace-nowrap leading-none">
          FOCȘANI
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 lg:px-28 pt-32 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-20"
        >
          {/* Left column: address & CTA */}
          <div className="flex flex-col gap-8">
            <motion.p variants={itemVariants} className="text-[#C9A84C] text-[10px] tracking-[0.5em] uppercase font-light">
              Unde ne găsești
            </motion.p>

            <motion.h2
              variants={itemVariants}
              className="font-display text-[clamp(3rem,7vw,7rem)] text-[#F5F0E8] leading-none tracking-wide"
            >
              SUPERBIKE
              <br />
              <span className="bg-gradient-to-r from-[#E8C97A] via-[#C9A84C] to-[#8B6914] bg-clip-text text-transparent">
                FOCȘANI
              </span>
            </motion.h2>

            <motion.div variants={itemVariants} className="space-y-2">
              <p className="font-body text-[#F5F0E8]/60 text-sm font-light tracking-wide">
                Bd. Independenței, Focșani
              </p>
              <p className="font-body text-[#F5F0E8]/60 text-sm font-light tracking-wide">
                Județ Vrancea, România
              </p>
            </motion.div>

            {/* Gold line */}
            <motion.div
              variants={itemVariants}
              className="h-px w-20 bg-gradient-to-r from-[#C9A84C] to-transparent"
            />

            {/* Contact details */}
            <motion.div variants={itemVariants} className="space-y-3">
              <a
                href="tel:+40xxxx"
                className="flex items-center gap-4 text-[#F5F0E8]/50 hover:text-[#C9A84C] transition-colors duration-300 text-sm font-light group"
              >
                <span className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase">Tel</span>
                <span>Sună-ne pentru detalii</span>
                <span className="h-px w-0 group-hover:w-8 bg-[#C9A84C] transition-all duration-500" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-[#F5F0E8]/50 hover:text-[#C9A84C] transition-colors duration-300 text-sm font-light group"
              >
                <span className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase">Social</span>
                <span>Facebook · Instagram</span>
                <span className="h-px w-0 group-hover:w-8 bg-[#C9A84C] transition-all duration-500" />
              </a>
            </motion.div>

            {/* Primary CTA button */}
            <motion.div variants={itemVariants} className="mt-4">
              <a
                href="https://maps.google.com/?q=Bd+Independentei+Focsani"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 border border-[#C9A84C] text-[#C9A84C] px-10 py-4 text-xs tracking-[0.4em] uppercase font-light hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all duration-500 group"
              >
                <span>Vino în Magazin</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Right column: map embed */}
          <motion.div
            variants={itemVariants}
            className="relative h-80 lg:h-full min-h-[320px] border border-[#2A2A2A] overflow-hidden"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2766.3!2d27.177!3d45.697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b5bb9e!2sFoc%C8%99ani%2C+Bulevardul+Independen%C8%9Bei!5e0!3m2!1sro!2sro!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(100%) contrast(0.9) brightness(0.4)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Superbike Focșani locație"
            />
            {/* Map overlay with location pin text */}
            <div className="absolute bottom-4 left-4 bg-[#0A0A0A]/90 backdrop-blur px-4 py-3 border border-[#2A2A2A]">
              <p className="text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase font-light">Locație</p>
              <p className="text-[#F5F0E8] text-xs font-light mt-1">Bd. Independenței · Focșani</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-20 pt-8 border-t border-[#2A2A2A] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="font-body text-[#F5F0E8]/20 text-xs font-light tracking-wider">
            © {new Date().getFullYear()} Superbike Focșani. Toate drepturile rezervate.
          </p>
          <div className="flex gap-6">
            <span className="text-[#F5F0E8]/20 text-xs font-light tracking-wider">
              Specialized · Cross · DHS · Devron · Haibike
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
