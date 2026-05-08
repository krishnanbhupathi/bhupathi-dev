import { ArrowUpRight, Image as ImageIcon, Lock, Play } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHead } from '@/components/layout/SectionHead';
import { StaggerGroup, StaggerItem } from '@/components/animations/StaggerGroup';
import { SectionLink } from '@/components/layout/SectionLink';
import { PROJECTS } from '@/components/projects/projectsData';

const isExternalHref = (href: string) => /^(https?:)?\/\//.test(href);

export const Projects = () => (
  <Section id="work">
    <Container>
      <SectionHead
        eyebrow="Selected work"
        title={
          <>
            Systems I&apos;ve designed <span className="hl">and shipped.</span>
          </>
        }
        description="Representative projects from production engagements. Client names anonymized — architecture and approach are real. Detailed walkthroughs available on request."
      />

      <StaggerGroup className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 max-lg:max-w-[640px] max-lg:mx-auto">
        {PROJECTS.map((project) => {
          const externalWalkthrough = isExternalHref(project.walkthroughHref);
          return (
            <StaggerItem
              key={project.title}
              className="group flex flex-col border border-line bg-bg overflow-hidden transition-[transform,border-color,box-shadow,background] duration-[350ms] ease-brand hover:-translate-y-1 hover:border-text hover:shadow-[0_24px_48px_rgba(16,44,38,0.08)] hover:bg-surface"
            >
              <div
                className="aspect-[16/7] relative overflow-hidden border-b border-line bg-bg"
                style={{
                  backgroundImage:
                    'radial-gradient(rgba(16, 44, 38, 0.07) 1px, transparent 1px)',
                  backgroundSize: '18px 18px',
                }}
              >
                <div className="absolute inset-0 p-5 [&_svg]:absolute [&_svg]:inset-0 [&_svg]:w-full [&_svg]:h-full [&_svg]:p-5">
                  {project.diagram}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                  <div
                    className="text-xs font-medium text-text uppercase opacity-65"
                    style={{ letterSpacing: '0.04em' }}
                  >
                    {project.category}
                  </div>
                </div>
                <h3
                  className="text-[20px] font-semibold leading-[1.2] mb-2 text-text"
                  style={{ letterSpacing: '-0.32px' }}
                >
                  {project.title}
                </h3>
                <div
                  className="inline-flex items-center gap-2 text-[12.5px] text-text-dim mb-3"
                  style={{ letterSpacing: '-0.32px' }}
                >
                  <strong className="text-text font-semibold">Role:</strong> {project.role}
                  <span className="opacity-35">·</span> {project.roleSecondary}
                </div>
                <p
                  className="text-[14px] leading-[1.55] text-text-dim mb-4 flex-1"
                  style={{ letterSpacing: '-0.32px' }}
                >
                  {project.description}
                </p>
                <div className="flex gap-7 py-3 border-t border-b border-line mb-4 flex-wrap">
                  {project.stats.map((stat) => (
                    <div key={stat.label} className="stat">
                      <div
                        className="text-base font-semibold leading-none text-text"
                        style={{ letterSpacing: '-0.32px' }}
                      >
                        {stat.value}
                      </div>
                      <div
                        className="text-[10.5px] text-text-mute uppercase mt-1"
                        style={{ letterSpacing: '0.06em' }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 bg-surface border border-line text-text font-medium"
                      style={{ letterSpacing: '-0.32px' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div
                  className="border-t border-line pt-3 mt-1 mb-3 flex flex-col gap-2 sm:grid sm:gap-x-4 sm:gap-y-2 sm:[grid-template-columns:1fr_auto] sm:[grid-template-areas:'code_watch'_'discuss_view']"
                  style={{ letterSpacing: '-0.32px' }}
                >
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-text-mute sm:[grid-area:code]">
                    <Lock size={14} aria-hidden="true" />
                    Code available on request
                  </span>
                  <a
                    href={project.walkthroughHref}
                    {...(externalWalkthrough
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium text-accent-ink hover:underline sm:[grid-area:watch] sm:justify-self-end"
                  >
                    <Play size={14} aria-hidden="true" />
                    Watch architecture walkthrough →
                  </a>
                  <a
                    href={project.fullDiagramSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium text-accent-ink hover:underline sm:[grid-area:view] sm:justify-self-end"
                  >
                    <ImageIcon size={14} aria-hidden="true" />
                    View full architecture diagram →
                  </a>
                  <SectionLink
                    section="contact"
                    className="inline-flex items-center gap-2 text-text text-sm font-medium py-1.5 transition-[gap] duration-200 ease-brand hover:gap-[14px] max-sm:mt-2 sm:[grid-area:discuss] sm:justify-self-start"
                  >
                    Discuss this project
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-200 ease-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </SectionLink>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Container>
  </Section>
);
