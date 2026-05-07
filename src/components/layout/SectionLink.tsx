import { forwardRef } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

interface SectionLinkProps extends Omit<LinkProps, 'to'> {
  /** Target id on the home page, with or without leading "#". */
  section: string;
}

/**
 * Anchors a section on the home route. Works from any page —
 * navigates to "/" then a route-aware ScrollManager scrolls to the id.
 */
export const SectionLink = forwardRef<HTMLAnchorElement, SectionLinkProps>(
  ({ section, ...rest }, ref) => {
    const hash = section.replace(/^#/, '');
    return <Link ref={ref} to={{ pathname: '/', hash }} {...rest} />;
  },
);
SectionLink.displayName = 'SectionLink';
