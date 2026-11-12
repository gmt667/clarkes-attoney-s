import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes, aliases } from '@/routes/AppRoutes';
import { ThemeProvider } from '@/components/theme-provider';
import { attorneys, supportTeam, blogPosts, galleryImages } from '@/content/site-content';
import { existsSync } from 'node:fs';

function page(path = '/') { return render(<ThemeProvider><MemoryRouter initialEntries={[path]}><AppRoutes /></MemoryRouter></ThemeProvider>); }
const routes: Array<[string, string | RegExp]> = [
  ['/', /solving complex.*legal challenges.*with confidence/i], ['/about', /client-focused firm/i],
  ['/practice-areas', /comprehensive legal support/i], ['/our-team', /meet the people/i],
  ['/experience', /experience across public/i], ['/gallery', /visual archive/i],
  ['/blog', /practical legal insights/i], ['/contact', /discuss your matter/i],
  ...blogPosts.map(post => [`/blog/${post.slug}`, post.title] as [string, string]),
];

describe('public routes', () => {
  it.each(routes)('renders direct route %s with a single landmark and heading', (path, heading) => {
    const errors = vi.spyOn(console, 'error');
    page(path);
    expect(screen.getAllByRole('main')).toHaveLength(1);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeTruthy();
    expect(document.title).toContain('Clarkes Attorneys');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBeTruthy();
    expect(errors).not.toHaveBeenCalled();
    for (const img of document.querySelectorAll('img')) {
      expect(img.getAttribute('alt')).toBeTruthy();
      expect(img.getAttribute('src')?.startsWith('/')).toBe(true);
      expect(existsSync(`public${img.getAttribute('src')}`)).toBe(true);
    }
    const knownPaths = new Set([...routes.map(([path]) => path), ...Object.keys(aliases)]);
    for (const link of document.querySelectorAll('a[href^="/"]')) {
      expect(knownPaths.has(link.getAttribute('href')!.split(/[?#]/)[0])).toBe(true);
    }
  });
  it.each(Object.entries(aliases))('keeps legacy URL %s', (from, to) => {
    page(from);
    expect(screen.getByRole('main').querySelector('h1')?.textContent).toBeTruthy();
    const current = within(screen.getByRole('navigation', { name: 'Main navigation' })).getAllByRole('link').find(link => link.getAttribute('aria-current') === 'page');
    expect(current?.getAttribute('href')).toBe(to);
  });
  it.each(['/does-not-exist', '/blog/missing-article', '/studio'])('shows the not-found page for %s', path => {
    page(path);
    expect(screen.getByRole('heading', { level: 1, name: 'This page is not available.' })).toBeTruthy();
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toContain('noindex');
  });
  it('visits every primary page through navigation and blog links', async () => {
    const user = userEvent.setup(); page();
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    for (const label of ['About', 'Practice', 'Our Team', 'Experience', 'Gallery', 'Blog', 'Contact', 'Home']) {
      await user.click(within(nav).getByRole('link', { name: label }));
      expect(within(nav).getByRole('link', { name: label }).getAttribute('aria-current')).toBe('page');
      expect(screen.getByRole('heading', { level: 1 })).toBeTruthy();
    }
    await user.click(within(nav).getByRole('link', { name: 'Blog' }));
    for (const post of blogPosts) {
      const card = screen.getByRole('heading', { name: post.title }).closest('article')!;
      await user.click(within(card).getByRole('link', { name: /read article/i }));
      expect(screen.getByRole('heading', { level: 1, name: post.title })).toBeTruthy();
      await user.click(screen.getByRole('link', { name: /back to all articles/i }));
    }
  });
  it('preserves all people, opens profiles and returns keyboard focus', async () => {
    const user = userEvent.setup(); page('/our-team');
    for (const member of [...attorneys, ...supportTeam]) expect(screen.getByRole('heading', { level: 3, name: member.name })).toBeTruthy();
    const trigger = screen.getByRole('button', { name: `View profile: ${attorneys[0].name}` });
    await user.click(trigger);
    expect(screen.getByRole('dialog', { name: attorneys[0].name }).textContent).toContain(attorneys[0].bio);
    await user.click(screen.getByRole('button', { name: 'Close dialog' }));
    expect(document.activeElement).toBe(trigger);
  });
  it('opens every gallery image in a labelled lightbox', async () => {
    const user = userEvent.setup(); page('/gallery');
    for (const image of galleryImages) {
      await user.click(screen.getByRole('button', { name: `Enlarge ${image.title}` }));
      expect(screen.getByRole('dialog', { name: image.title }).querySelector('img')?.getAttribute('src')).toBe(image.image);
      await user.click(screen.getByRole('button', { name: 'Close dialog' }));
    }
  }, 15000);
  it.each([360, 768, 1024, 1440])('keeps controls and content functional at window width %s (DOM only)', async width => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: width });
    const user = userEvent.setup(); page();
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('button', { name: 'Close menu' }).getAttribute('aria-expanded')).toBe('true');
    await user.keyboard('{Escape}');
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Open menu' }));
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    await user.click(within(screen.getByRole('navigation', { name: 'Mobile navigation' })).getByRole('link', { name: 'Our Team' }));
    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).toBeNull();
    expect(screen.getByRole('heading', { level: 1, name: /meet the people/i })).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Switch to dark mode' }));
    expect(document.documentElement.dataset.theme).toBe('dark');
    await user.click(screen.getByRole('button', { name: 'Switch to light mode' }));
    expect(document.documentElement.dataset.theme).toBe('light');
  });
});
