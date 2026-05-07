import { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { useScrollPast } from '@/hooks/useScrollPast';
import { SectionLink } from '@/components/layout/SectionLink';
import { NAV_LINKS, SITE } from '@/utils/constants';

export const Nav = () => {
  const [open, setOpen] = useState(false);
  const scrolled = useScrollPast(20);

  const closeMenu = () => setOpen(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-[border-color,background] duration-300',
        scrolled
          ? 'bg-bg border-b border-line'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <div className="max-w-container mx-auto px-5 lg:px-8 py-3 lg:py-4 flex items-center justify-between gap-6 relative">
        <Link
          to="/"
          aria-label="Krishna — home"
          className="inline-flex items-center gap-[10px] min-h-[44px] -mx-2 px-2 text-text font-semibold text-base"
          style={{ letterSpacing: '-0.32px' }}
        >
          <span className="w-2 h-2 bg-accent" aria-hidden="true" />
          Krishna
        </Link>

        <div className="hidden min-[721px]:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <SectionLink
              key={link.href}
              section={link.href}
              className="relative inline-flex items-center text-text text-sm font-medium px-3 py-2 min-h-[44px] opacity-80 hover:opacity-100 transition-opacity duration-200 ease-brand after:content-[''] after:absolute after:left-3 after:right-3 after:bottom-1 after:h-px after:bg-text after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-brand hover:after:scale-x-100"
              style={{ letterSpacing: '-0.32px' }}
            >
              {link.label}
            </SectionLink>
          ))}
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="inline-flex items-center justify-center w-11 h-11 ml-2 text-text-mute hover:text-text transition-colors duration-200 ease-brand"
          >
            <Linkedin size={20} aria-hidden="true" />
          </a>
          <SectionLink
            section="contact"
            className="inline-flex items-center gap-2 px-4 py-2.5 ml-1 min-h-[44px] bg-text text-accent text-sm font-medium hover:-translate-y-px transition-transform duration-200 ease-brand"
            style={{ letterSpacing: '-0.32px' }}
          >
            Let&apos;s talk →
          </SectionLink>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="min-[721px]:hidden inline-flex items-center justify-center w-11 h-11 border border-line text-text bg-transparent"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>

        {open && (
          <div
            id="mobile-nav"
            className="absolute top-full left-0 right-0 flex flex-col gap-4 px-6 pt-5 pb-6 bg-bg border-b border-line shadow-[0_12px_32px_rgba(16,44,38,0.06)] min-[721px]:hidden"
          >
            {NAV_LINKS.map((link) => (
              <SectionLink
                key={link.href}
                section={link.href}
                onClick={closeMenu}
                className="inline-flex items-center text-text text-base font-medium py-1.5 min-h-[44px]"
                style={{ letterSpacing: '-0.32px' }}
              >
                {link.label}
              </SectionLink>
            ))}
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="inline-flex items-center gap-2.5 self-start text-text-mute hover:text-text text-sm font-medium py-1.5 min-h-[44px] transition-colors duration-200 ease-brand"
              style={{ letterSpacing: '-0.32px' }}
            >
              LinkedIn
              <Linkedin size={18} aria-hidden="true" />
            </a>
            <SectionLink
              section="contact"
              onClick={closeMenu}
              className="inline-flex items-center gap-2 self-start px-4 py-2.5 bg-text text-accent text-sm font-medium min-h-[44px]"
              style={{ letterSpacing: '-0.32px' }}
            >
              Let&apos;s talk →
            </SectionLink>
          </div>
        )}
      </div>
    </motion.nav>
  );
};
