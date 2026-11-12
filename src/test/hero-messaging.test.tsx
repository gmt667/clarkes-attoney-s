import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { HeroMessaging, heroHeadlines } from '@/components/hero-messaging';

beforeEach(() => {
  vi.useFakeTimers();
  vi.spyOn(window, 'matchMedia').mockImplementation(query => ({ matches: false, media: query, addEventListener() {}, removeEventListener() {} } as unknown as MediaQueryList));
});
afterEach(() => { cleanup(); vi.useRealTimers(); });
const current = () => document.querySelector('.hero-headline-slide.is-current')?.textContent;

it('starts with the exact requested heading and keeps a stable accessible H1', () => {
  render(<HeroMessaging />);
  expect(current()).toBe(heroHeadlines[0].join(''));
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  expect(screen.getByRole('heading', { level: 1 }).getAttribute('aria-live')).toBeNull();
  act(() => vi.advanceTimersByTime(6600));
  expect(current()).toBe(heroHeadlines[1].join(''));
  expect(screen.getByRole('heading', { name: heroHeadlines[0].join('') })).toBeTruthy();
});
it('holds the initial message and cycles all four without removing height-reserving slides', () => {
  render(<HeroMessaging />);
  act(() => vi.advanceTimersByTime(6000));
  expect(current()).toBe(heroHeadlines[0].join(''));
  act(() => vi.advanceTimersByTime(600));
  for (let index = 1; index <= 4; index++) {
    expect(current()).toBe(heroHeadlines[index % 4].join(''));
    expect(document.querySelectorAll('.hero-headline-slide')).toHaveLength(4);
    act(() => vi.advanceTimersByTime(6600));
  }
});
it('keeps founding text fixed and follows the journey timing and sequential years', () => {
  render(<HeroMessaging />);
  const year = () => document.querySelector('.hero-journey-year')?.textContent;
  expect(screen.getByText('ESTABLISHED 2017 · LILONGWE, MALAWI')).toBeTruthy();
  act(() => vi.advanceTimersByTime(2999)); expect(year()).toBe('2017');
  act(() => vi.advanceTimersByTime(1)); expect(year()).toBe('2018');
  for (let expected = 2019; expected <= 2027; expected++) {
    act(() => vi.advanceTimersByTime(150)); expect(year()).toBe(String(expected));
  }
  act(() => vi.advanceTimersByTime(1499)); expect(year()).toBe('2027');
  act(() => vi.advanceTimersByTime(1)); expect(year()).toBe('2017');
  expect(screen.getByText('ESTABLISHED 2017 · LILONGWE, MALAWI')).toBeTruthy();
});
it('pauses both animations and resumes from the preserved state', () => {
  render(<HeroMessaging />);
  act(() => vi.advanceTimersByTime(3000));
  const before = document.querySelector('.hero-journey-year')?.textContent;
  act(() => screen.getByRole('button', { name: 'Pause hero animations' }).click());
  act(() => vi.advanceTimersByTime(20000));
  expect(current()).toBe(heroHeadlines[0].join(''));
  expect(document.querySelector('.hero-journey-year')?.textContent).toBe(before);
  expect(screen.getByRole('button', { name: 'Play hero animations' }).getAttribute('aria-pressed')).toBe('true');
  act(() => screen.getByRole('button', { name: 'Play hero animations' }).click());
  act(() => vi.advanceTimersByTime(150));
  expect(document.querySelector('.hero-journey-year')?.textContent).toBe('2019');
});
it('uses the original static heading and timeline for reduced motion with no timers', () => {
  vi.mocked(window.matchMedia).mockImplementation(query => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} } as unknown as MediaQueryList));
  render(<HeroMessaging />);
  expect(screen.getByText('2017–2027')).toBeTruthy();
  expect(screen.queryByRole('button')).toBeNull();
  expect(vi.getTimerCount()).toBe(0);
  act(() => vi.advanceTimersByTime(40000));
  expect(current()).toBe(heroHeadlines[0].join(''));
});
it('cleans up every timer on unmount', () => {
  const { unmount } = render(<HeroMessaging />);
  expect(vi.getTimerCount()).toBe(2);
  unmount();
  expect(vi.getTimerCount()).toBe(0);
});
