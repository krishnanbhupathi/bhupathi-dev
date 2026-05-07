import { useState, type FormEvent } from 'react';
import { CheckCircle2, Clock, Globe, Linkedin, Mail, Send } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHead } from '@/components/layout/SectionHead';
import { SectionLink } from '@/components/layout/SectionLink';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SITE } from '@/utils/constants';

interface TrustStat {
  icon: typeof CheckCircle2;
  label: string;
}

const TRUST_STATS: TrustStat[] = [
  { icon: CheckCircle2, label: 'Production-grade delivery' },
  { icon: Clock, label: 'Reply within 24 hours, weekdays' },
  { icon: Globe, label: 'US · UK · UAE time zones' },
];

export const Contact = () => {
  const [submitLabel, setSubmitLabel] = useState('Send message');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
    setSubmitLabel('Opening mail…');
    const subject = encodeURIComponent(`New project inquiry — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    window.setTimeout(() => setSubmitLabel('Message sent ✓'), 600);
  };

  return (
    <Section id="contact">
      <Container>
        <SectionHead
          eyebrow="Let's build"
          title={
            <>
              Have a project <span className="hl">in mind?</span>
            </>
          }
          description="Share a few lines about what you're building and the outcome you want. I'll reply within 24 hours with honest feedback on scope, timeline, and whether I'm the right fit."
        />

        <ScrollReveal className="mb-8">
          <ul
            className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] font-medium text-text-mute"
            style={{ letterSpacing: '-0.32px' }}
          >
            {TRUST_STATS.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2">
                <Icon size={14} className="text-accent" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* INFO */}
          <ScrollReveal>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-3.5 px-5 py-4 border border-line bg-bg text-text hover:border-text hover:translate-x-1 hover:bg-surface transition-[border-color,transform,background] duration-200 ease-brand"
              >
                <div className="w-10 h-10 bg-accent text-text flex items-center justify-center flex-shrink-0">
                  <Mail size={18} aria-hidden="true" />
                </div>
                <div>
                  <div
                    className="text-xs text-text-mute uppercase"
                    style={{ letterSpacing: '0.06em' }}
                  >
                    Email
                  </div>
                  <div className="text-[15px] font-medium mt-1" style={{ letterSpacing: '-0.32px' }}>
                    {SITE.email}
                  </div>
                </div>
              </a>

              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 px-5 py-4 border border-line bg-bg text-text hover:border-text hover:translate-x-1 hover:bg-surface transition-[border-color,transform,background] duration-200 ease-brand"
              >
                <div className="w-10 h-10 bg-accent text-text flex items-center justify-center flex-shrink-0">
                  <Linkedin size={18} aria-hidden="true" />
                </div>
                <div>
                  <div
                    className="text-xs text-text-mute uppercase"
                    style={{ letterSpacing: '0.06em' }}
                  >
                    LinkedIn
                  </div>
                  <div className="text-[15px] font-medium mt-1" style={{ letterSpacing: '-0.32px' }}>
                    {SITE.linkedinHandle}
                  </div>
                </div>
              </a>

              <SectionLink
                section="work"
                className="flex items-center gap-3.5 px-5 py-4 border border-line bg-bg text-text hover:border-text hover:translate-x-1 hover:bg-surface transition-[border-color,transform,background] duration-200 ease-brand"
              >
                <div className="w-10 h-10 bg-accent text-text flex items-center justify-center flex-shrink-0">
                  <Clock size={18} aria-hidden="true" />
                </div>
                <div>
                  <div
                    className="text-xs text-text-mute uppercase"
                    style={{ letterSpacing: '0.06em' }}
                  >
                    Response time
                  </div>
                  <div className="text-[15px] font-medium mt-1" style={{ letterSpacing: '-0.32px' }}>
                    Under 24 hours, weekdays
                  </div>
                </div>
              </SectionLink>
            </div>
          </ScrollReveal>

          {/* FORM */}
          <ScrollReveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden p-9 sm:p-9 max-2xs:p-6 border border-line bg-bg"
            >
              <div
                aria-hidden="true"
                className="absolute -top-20 -right-20 w-60 h-60"
                style={{
                  background:
                    'radial-gradient(circle, rgba(178,230,89,0.35), transparent 60%)',
                  filter: 'blur(40px)',
                }}
              />

              <div className="mb-5 relative">
                <label
                  htmlFor="name"
                  className="block text-[13px] font-medium text-text mb-2"
                  style={{ letterSpacing: '-0.32px' }}
                >
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Alex Morgan"
                  className="w-full px-4 py-3.5 bg-bg border border-line text-text placeholder:text-text-mute focus:border-text outline-none transition-colors duration-200 ease-brand min-h-[44px]"
                  style={{ letterSpacing: '-0.32px' }}
                />
              </div>

              <div className="mb-5 relative">
                <label
                  htmlFor="email"
                  className="block text-[13px] font-medium text-text mb-2"
                  style={{ letterSpacing: '-0.32px' }}
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="alex@acme.co"
                  className="w-full px-4 py-3.5 bg-bg border border-line text-text placeholder:text-text-mute focus:border-text outline-none transition-colors duration-200 ease-brand min-h-[44px]"
                  style={{ letterSpacing: '-0.32px' }}
                />
              </div>

              <div className="mb-5 relative">
                <label
                  htmlFor="message"
                  className="block text-[13px] font-medium text-text mb-2"
                  style={{ letterSpacing: '-0.32px' }}
                >
                  Tell me about your project
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Hi Krishna — we're a Series A SaaS team in London planning an API rebuild before our Q3 launch. Need a senior backend engineer for ~6 weeks, $25–45k range. When are you free for a call?"
                  className="w-full px-4 py-3.5 bg-bg border border-line text-text placeholder:text-text-mute focus:border-text outline-none transition-colors duration-200 ease-brand resize-y min-h-[130px]"
                  style={{ letterSpacing: '-0.32px' }}
                />
              </div>

              <button type="submit" className="btn btn-primary w-full justify-center">
                <span>{submitLabel}</span>
                <Send size={17} aria-hidden="true" />
              </button>
            </form>
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
};
