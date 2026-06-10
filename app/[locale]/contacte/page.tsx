'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Globe,
  Instagram,
  Linkedin,
  Twitter,
  ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import Parallax from '@/components/ui/Parallax';

/* ─────────────────────────── animation variants ─────────────────────────── */
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const item = { hidden: { opacity: 0, y: 24, filter: 'blur(5px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } };

const inViewProps = { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-80px' } } as const;

/* ─────────────────────────── input style helper ─────────────────────────── */
const INPUT_CLASS = (err: boolean) =>
  `w-full bg-surface-container border rounded-lg px-4 py-3 text-on-surface placeholder-on-surface-variant/40 font-sans text-sm transition-all focus:outline-none ${
    err
      ? 'border-red-500 focus:ring-1 focus:ring-red-500'
      : 'border-outline-variant/30 focus:border-primary-container/60 focus:ring-1 focus:ring-primary-container/20'
  }`;

const SOCIAL = [
  { icon: Instagram, href: 'https://instagram.com/9bitinf',      label: 'Instagram' },
  { icon: Linkedin,  href: 'https://linkedin.com/company/9-bit', label: 'LinkedIn' },
  { icon: Twitter,   href: 'https://x.com/9bitinf',             label: 'X / Twitter' },
];

/* ═══════════════════════════ PAGE COMPONENT ═════════════════════════════ */
export default function ContactPage() {
  const t = useTranslations('contact_page');

  /* form state */
  const [form,      setForm]      = useState({ business: '', site: '', sector: '', name: '', email: '', phone: '', revenue: '', timeline: '', message: '', website: '' });
  const [errors,    setErrors]    = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  /* FAQ open state */
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* translated data */
  const INFO = [
    { icon: Mail,   label: t('info_email_label'),    value: 'hola@9-bit.com',     href: 'mailto:hola@9-bit.com' },
    { icon: Phone,  label: t('info_phone_label'),    value: '+34 637 400 350',    href: 'tel:+34637400350' },
    { icon: MapPin, label: t('info_location_label'), value: t('info_location_value'),  href: null },
    { icon: Clock,  label: t('info_hours_label'),    value: t('info_hours_value'), href: null },
  ];

  const PILLS = [
    { icon: Clock,       text: t('pill_response') },
    { icon: ShieldCheck, text: t('pill_confidential') },
    { icon: Globe,       text: t('pill_languages') },
  ];

  const FAQ = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
  ];

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.business.trim()) e.business = t('error_business_required');
    if (!form.sector.trim())   e.sector   = t('error_sector_required');
    if (!form.name.trim())    e.name    = t('error_name_required');
    if (!form.email.trim())   e.email   = t('error_email_required');
    else if (!form.email.includes('@')) e.email = t('error_email_invalid');
    if (!form.message.trim()) e.message = t('error_message_required');
    setErrors(e);
    return !Object.keys(e).length;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitError(null);
    setSubmitting(true);
    const composedMessage = [
      `Negocio: ${form.business}`,
      form.site ? `Web: ${form.site}` : null,
      `Sector: ${form.sector}`,
      form.revenue ? `Facturación: ${form.revenue}` : null,
      form.timeline ? `Plazo: ${form.timeline}` : null,
      '',
      form.message,
    ]
      .filter((l) => l !== null)
      .join('\n');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: composedMessage,
          website: form.website,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else if (res.status === 429) {
        setSubmitError(t('error_rate_limit'));
      } else {
        setSubmitError(t('error_generic'));
      }
    } catch {
      setSubmitError(t('error_generic'));
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({ business: '', site: '', sector: '', name: '', email: '', phone: '', revenue: '', timeline: '', message: '', website: '' });
    setSubmitted(false);
    setSubmitError(null);
  };

  /* ───────────────────────────── render ─────────────────────────────────── */
  return (
    <div className="min-h-screen">

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative -mt-20 pt-40 pb-12 px-6 lg:px-10">
        <div className="max-w-container-max mx-auto text-center">
          <motion.div variants={container} initial="hidden" animate="show">

            {/* Badge */}
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 mb-6 font-mono text-xs text-primary-container bg-primary-container/10 border border-primary-container/30 px-3 py-1 rounded-full uppercase tracking-widest"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
              {t('badge')}
            </motion.div>

            {/* Heading */}
            <Parallax speed={0.18}>
              <motion.h1
                variants={item}
                className="text-5xl md:text-7xl font-black tracking-tighter text-on-surface mb-5 leading-none"
              >
                {t('heading')}
              </motion.h1>
            </Parallax>

            {/* Subtitle */}
            <motion.p variants={item} className="text-on-surface-variant max-w-xl mx-auto text-lg mb-8">
              {t('subtitle')}
            </motion.p>

            {/* Feature pills */}
            <motion.div variants={item} className="flex flex-wrap justify-center gap-3">
              {PILLS.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="inline-flex items-center gap-2 glass-panel border border-outline-variant/20 rounded-full px-4 py-2 text-sm text-on-surface-variant"
                >
                  <Icon size={14} className="text-primary-container shrink-0" />
                  {text}
                </div>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ INFO + FORM ═══════════════════ */}
      <section className="pb-24 px-6 lg:px-10">
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* ── Left: info cards + blurb + socials ── */}
            <motion.div
              variants={container}
              {...inViewProps}
              className="lg:col-span-2 flex flex-col gap-5"
            >
              {INFO.map(({ icon: Icon, label, value, href }) => (
                <motion.div
                  key={label}
                  variants={item}
                  className="glass-panel glow-hover rounded-xl p-6 border border-outline-variant/20 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary-container/15 border border-primary-container/25 flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(0,102,255,0.2)]">
                    <Icon className="text-primary-container" size={28} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="font-sans font-semibold text-on-surface hover:text-primary-container transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="font-sans font-semibold text-on-surface">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Blurb + socials */}
              <motion.div variants={item} className="glass-panel rounded-xl p-6 border border-outline-variant/20 mt-2">
                <p className="text-sm text-on-surface-variant leading-relaxed mb-5">
                  {t('blurb')}
                </p>
                <div className="flex gap-3">
                  {SOCIAL.map(({ icon: Icon, href, label: ariaLabel }) => (
                    <a
                      key={ariaLabel}
                      href={href}
                      aria-label={ariaLabel}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glow-hover w-10 h-10 rounded-full bg-primary-container/10 border border-primary-container/25 flex items-center justify-center text-primary-container hover:bg-primary-container/20 transition-all hover:shadow-[0_0_16px_rgba(0,102,255,0.35)]"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* ── Right: form ── */}
            <motion.div variants={container} {...inViewProps} className="lg:col-span-3">
              <motion.div variants={item}>
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3 }}
                      className="glass-panel rounded-xl border border-outline-variant/25 p-8 md:p-10"
                    >
                      <h3 className="text-lg font-semibold text-on-surface mb-1">{t('form_title')}</h3>
                      <p className="text-sm text-on-surface-variant mb-6">{t('form_subtitle')}</p>

                      <form onSubmit={onSubmit} className="space-y-5" noValidate>
                        {/* honeypot — bots fill this; humans don't see it */}
                        <input
                          type="text"
                          name="website"
                          value={form.website}
                          onChange={onChange}
                          tabIndex={-1}
                          autoComplete="off"
                          aria-hidden="true"
                          style={{ display: 'none' }}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block font-mono text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">{t('label_business')}</label>
                            <input type="text" name="business" value={form.business} onChange={onChange} placeholder={t('placeholder_business')} className={INPUT_CLASS(!!errors.business)} />
                            {errors.business && <p className="text-red-400 text-xs mt-1 font-mono">{errors.business}</p>}
                          </div>
                          <div>
                            <label className="block font-mono text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">{t('label_site')}</label>
                            <input type="text" name="site" value={form.site} onChange={onChange} placeholder={t('placeholder_site')} className={INPUT_CLASS(false)} />
                          </div>
                          <div>
                            <label className="block font-mono text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">{t('label_sector')}</label>
                            <input type="text" name="sector" value={form.sector} onChange={onChange} placeholder={t('placeholder_sector')} className={INPUT_CLASS(!!errors.sector)} />
                            {errors.sector && <p className="text-red-400 text-xs mt-1 font-mono">{errors.sector}</p>}
                          </div>
                          <div>
                            <label className="block font-mono text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">{t('label_name')}</label>
                            <input type="text" name="name" value={form.name} onChange={onChange} placeholder={t('placeholder_name')} className={INPUT_CLASS(!!errors.name)} />
                            {errors.name && <p className="text-red-400 text-xs mt-1 font-mono">{errors.name}</p>}
                          </div>
                          <div>
                            <label className="block font-mono text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">{t('label_email')}</label>
                            <input type="email" name="email" value={form.email} onChange={onChange} placeholder={t('placeholder_email')} className={INPUT_CLASS(!!errors.email)} />
                            {errors.email && <p className="text-red-400 text-xs mt-1 font-mono">{errors.email}</p>}
                          </div>
                          <div>
                            <label className="block font-mono text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">{t('label_phone')}</label>
                            <input type="tel" name="phone" value={form.phone} onChange={onChange} placeholder={t('placeholder_phone')} className={INPUT_CLASS(false)} />
                          </div>
                          <div>
                            <label className="block font-mono text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">{t('label_revenue')}</label>
                            <input type="text" name="revenue" value={form.revenue} onChange={onChange} placeholder={t('placeholder_revenue')} className={INPUT_CLASS(false)} />
                          </div>
                          <div>
                            <label className="block font-mono text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">{t('label_timeline')}</label>
                            <input type="text" name="timeline" value={form.timeline} onChange={onChange} placeholder={t('placeholder_timeline')} className={INPUT_CLASS(false)} />
                          </div>
                        </div>

                        <div>
                          <label className="block font-mono text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">{t('label_objective')}</label>
                          <textarea name="message" value={form.message} onChange={onChange} rows={4} placeholder={t('placeholder_objective')} className={`${INPUT_CLASS(!!errors.message)} resize-none`} />
                          {errors.message && <p className="text-red-400 text-xs mt-1 font-mono">{errors.message}</p>}
                        </div>

                        <p className="text-on-surface-variant/60 text-xs">{t('privacy_note')}</p>

                        <Button
                          variant="primary"
                          type="submit"
                          disabled={submitting}
                          className="w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          <Send size={16} />
                          {submitting ? t('submitting') : t('submit')}
                        </Button>
                        {submitError && (
                          <p className="text-red-400 text-sm mt-1 text-center font-mono">{submitError}</p>
                        )}
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35 }}
                      className="glass-panel rounded-xl border border-primary-container/40 p-16 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
                        className="w-16 h-16 mx-auto mb-5 bg-primary-container/15 rounded-full flex items-center justify-center"
                      >
                        <CheckCircle2 className="text-primary-container" size={32} strokeWidth={1.5} />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-on-surface mb-2">{t('success_title')}</h3>
                      <p className="text-on-surface-variant font-mono text-sm mb-8">{t('success_sub')}</p>
                      <button
                        onClick={resetForm}
                        className="font-mono text-xs uppercase tracking-widest text-primary-container border border-primary-container/30 px-6 py-2 rounded-full hover:bg-primary-container/10 transition-all"
                      >
                        ← {t('reset_button')}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <section className="pb-24 px-6 lg:px-10">
        <div className="max-w-container-max mx-auto">

          {/* Section heading */}
          <motion.div variants={container} {...inViewProps} className="mb-10">
            <motion.h2 variants={item} className="text-3xl md:text-4xl font-black tracking-tighter text-on-surface mb-3">
              {t('faq_heading')}
            </motion.h2>
            <motion.p variants={item} className="text-on-surface-variant">
              {t('faq_subtitle')}
            </motion.p>
          </motion.div>

          {/* Accordion */}
          <motion.div variants={container} {...inViewProps} className="flex flex-col gap-3 max-w-3xl mx-auto">
            {FAQ.map(({ q, a }, idx) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div key={idx} variants={item}>
                  <div className="glass-panel rounded-lg border border-outline-variant/20 overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 group"
                      aria-expanded={isOpen}
                    >
                      <span className="font-sans font-semibold text-on-surface group-hover:text-primary-container transition-colors">
                        {q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="shrink-0 text-primary-container"
                      >
                        <ChevronDown size={18} />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-5 text-sm text-on-surface-variant leading-relaxed">
                            {a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
