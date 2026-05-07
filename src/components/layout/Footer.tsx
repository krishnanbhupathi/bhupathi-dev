import { Container } from './Container';
import { SectionLink } from './SectionLink';
import { SITE } from '@/utils/constants';

const FOOTER_LINKS = [
  { section: 'services', label: 'Services' },
  { section: 'work', label: 'Work' },
  { section: 'contact', label: 'Contact' },
] as const;

const dotClass = 'opacity-40';

export const Footer = () => (
  <footer className="border-t border-line py-8 relative z-[2]">
    <Container className="flex items-center justify-between gap-5 flex-wrap text-center sm:text-left">
      <p
        className="text-text-mute text-[13.5px] flex flex-wrap items-center gap-x-2 gap-y-1 justify-center sm:justify-start"
        style={{ letterSpacing: '-0.32px' }}
      >
        <span>{SITE.copyright}</span>
        <span aria-hidden="true" className={dotClass}>
          ·
        </span>
        <a
          href={`mailto:${SITE.email}`}
          className="hover:text-text transition-colors duration-200 ease-brand"
        >
          {SITE.email}
        </a>
        <span aria-hidden="true" className={dotClass}>
          ·
        </span>
        <a
          href={SITE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-text transition-colors duration-200 ease-brand"
        >
          LinkedIn
        </a>
      </p>
      <div className="flex gap-6 justify-center">
        {FOOTER_LINKS.map((link) => (
          <SectionLink
            key={link.section}
            section={link.section}
            className="text-text-mute text-[13.5px] hover:text-text transition-colors duration-200 ease-brand"
            style={{ letterSpacing: '-0.32px' }}
          >
            {link.label}
          </SectionLink>
        ))}
      </div>
    </Container>
  </footer>
);
