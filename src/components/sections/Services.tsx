import { Cloud, LayoutDashboard, Network, Server } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHead } from '@/components/layout/SectionHead';
import { StaggerGroup, StaggerItem } from '@/components/animations/StaggerGroup';
import type { Service } from '@/types';

const SERVICES: Service[] = [
  {
    icon: <Server size={20} aria-hidden="true" />,
    title: 'Backend Development',
    description:
      'Scalable backend systems in Java and Spring Boot — RESTful APIs, microservices architecture, and service decoupling that handles high-traffic workloads.',
  },
  {
    icon: <Cloud size={20} aria-hidden="true" />,
    title: 'Cloud & DevOps',
    description:
      'AWS infrastructure — S3, Lambda, DynamoDB, Cognito, IAM, EC2. Docker containers, CI/CD pipelines, and cloud-optimized deployments.',
  },
  {
    icon: <LayoutDashboard size={20} aria-hidden="true" />,
    title: 'Full-stack Delivery',
    description:
      'React frontends with REST API integration, responsive design, and clean component architecture. End-to-end from database schema to deployed UI.',
  },
  {
    icon: <Network size={20} aria-hidden="true" />,
    title: 'System Design',
    description:
      'Microservices architecture, database optimization, distributed systems, and infrastructure that scales — built from real production experience at Amazon.',
  },
];

export const Services = () => (
  <Section id="services">
    <Container>
      <SectionHead
        eyebrow="What I do"
        title={
          <>
            Engineering that moves <span className="hl">the business</span> forward.
          </>
        }
        description="4 years of working with founders and product teams who need more than code — architecture, trade-offs, and delivery velocity."
      />

      <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-line">
        {SERVICES.map((service) => (
          <StaggerItem
            key={service.title}
            className="px-7 py-9 sm:px-8 border-r border-b border-line bg-bg relative overflow-hidden transition-colors duration-[350ms] ease-brand hover:bg-surface"
          >
            <div className="w-11 h-11 bg-accent text-text inline-flex items-center justify-center mb-7">
              {service.icon}
            </div>
            <h3
              className="text-lg font-semibold leading-[1.2] mb-2.5 text-text"
              style={{ letterSpacing: '-0.32px' }}
            >
              {service.title}
            </h3>
            <p
              className="text-[14.5px] leading-[1.55] text-text-dim font-normal"
              style={{ letterSpacing: '-0.32px' }}
            >
              {service.description}
            </p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Container>
  </Section>
);
