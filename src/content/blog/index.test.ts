import { describe, it, expect } from 'vitest';
import { BLOG_POSTS } from './index';

const SLUG_PATTERN = /^[a-z0-9-]+$/;

describe('BLOG_POSTS', () => {
  it('has at least one post', () => {
    expect(Object.keys(BLOG_POSTS).length).toBeGreaterThan(0);
  });

  it('every entry key matches its post.slug', () => {
    for (const [key, post] of Object.entries(BLOG_POSTS)) {
      expect(post.slug).toBe(key);
    }
  });

  it('every slug is URL-safe (lowercase + hyphens only)', () => {
    for (const slug of Object.keys(BLOG_POSTS)) {
      expect(slug).toMatch(SLUG_PATTERN);
    }
  });

  it('every post has non-empty title, date, category, content', () => {
    for (const post of Object.values(BLOG_POSTS)) {
      expect(post.title.length).toBeGreaterThan(0);
      expect(post.date.length).toBeGreaterThan(0);
      expect(post.category.length).toBeGreaterThan(0);
      expect(post.content.length).toBeGreaterThan(100);
    }
  });

  it('every post has a computed readTime in the form "N min read"', () => {
    for (const post of Object.values(BLOG_POSTS)) {
      expect(post.readTime).toMatch(/^\d+ min read$/);
    }
  });

  it('content has its leading title block stripped (no leading "# Title")', () => {
    for (const post of Object.values(BLOG_POSTS)) {
      expect(post.content.trimStart().startsWith('# ')).toBe(false);
    }
  });
});
