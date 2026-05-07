import { StaggerGroup, StaggerItem } from '@/components/animations/StaggerGroup';
import { PROOF_ITEMS } from '@/utils/constants';

export const SocialProof = () => (
  <div className="border-t border-b border-line bg-bg relative z-[2]">
    <StaggerGroup className="flex max-[720px]:flex-wrap">
      {PROOF_ITEMS.map((item, idx) => (
        <StaggerItem
          key={item.label}
          className={`flex-1 max-[720px]:basis-1/2 max-[480px]:basis-full flex flex-col items-center justify-center text-center px-6 py-8 group relative overflow-hidden transition-colors duration-300 ease-brand hover:bg-surface ${
            idx === PROOF_ITEMS.length - 1 ? '' : 'border-r border-line'
          } max-[720px]:border-b max-[720px]:border-line max-[720px]:[&:nth-child(even)]:border-r-0 max-[720px]:[&:nth-last-child(-n+2)]:border-b-0 max-[480px]:!border-r-0 max-[480px]:last:!border-b-0`}
        >
          <div
            className="font-semibold text-text leading-none mb-1.5"
            style={{ fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '-0.04em' }}
          >
            {item.num}
            {item.accent && <span className="text-accent">{item.accent}</span>}
          </div>
          <div
            className="text-[13px] text-text-mute leading-[1.4] whitespace-pre-line"
            style={{ letterSpacing: '-0.32px' }}
          >
            {item.label}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent scale-x-0 origin-left transition-transform duration-500 ease-brand group-hover:scale-x-100" />
        </StaggerItem>
      ))}
    </StaggerGroup>
  </div>
);
