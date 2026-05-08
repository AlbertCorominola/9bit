'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import TestimonialCard from '@/components/ui/TestimonialCard';

const TESTIMONIALS = [
  {
    name: 'Gerència',
    company: 'Restaurant Arest Estanyol',
    quote:
      "Ens van fer la web i ens han ajudat amb el SEO. Hem notat més visites i, sobretot, més reserves. Tot el procés va ser molt fàcil.",
  },
  {
    name: 'Elisabeth Oller',
    company: 'CEO Illes Medes Experience',
    quote:
      "Treballem amb ells per la web i el sistema de reserves. Ara gestionem millor les reserves i hem guanyat tranquil·litat en el dia a dia.",
  },
  {
    name: 'Ruben Oliver',
    company: 'CEO Mas Soles',
    quote:
      "Amb la nova web i el posicionament hem millorat la visibilitat. Cada cop ens troba més gent i això es nota en les reserves.",
  },
];

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');
  return (
    <section className="py-margin px-6 lg:px-10 max-w-container-max mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4 }}
        className="mb-12 max-w-2xl"
      >
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[1.05] bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-blue-200">
          {t('heading')}
        </h2>
      </motion.div>

      {/* Mobile: horizontal scroll. Desktop: grid */}
      <div className="md:hidden -mx-6 px-6 overflow-x-auto">
        <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
          {TESTIMONIALS.map((tt, i) => (
            <div key={i} className="w-[300px] shrink-0">
              <TestimonialCard {...tt} />
            </div>
          ))}
        </div>
      </div>

      <motion.div
        className="hidden md:grid grid-cols-3 gap-5"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.05 } },
        }}
      >
        {TESTIMONIALS.map((tt, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
          >
            <TestimonialCard {...tt} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
