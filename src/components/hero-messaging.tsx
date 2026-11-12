import { useEffect, useState, useSyncExternalStore } from 'react';
import { Pause, Play } from 'lucide-react';
import './hero-messaging.css';

export const heroHeadlines = [
  ['SOLVING COMPLEX LEGAL CHALLENGES ', 'WITH CONFIDENCE'],
  ['PROTECTING YOUR RIGHTS. ', 'ADVANCING YOUR INTERESTS.'],
  ['CLEAR LEGAL GUIDANCE. ', 'CONFIDENT DECISIONS.'],
  ['STRATEGIC COUNSEL. ', 'TRUSTED REPRESENTATION.'],
] as const;

const motionQuery = '(prefers-reduced-motion: reduce)';
function subscribeMotion(callback: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}
function reducedMotion() { return window.matchMedia(motionQuery).matches; }

export function HeroMessaging() {
  const reduced = useSyncExternalStore(subscribeMotion, reducedMotion, () => true);
  const [paused, setPaused] = useState(false);
  const [headline, setHeadline] = useState(0);
  const [year, setYear] = useState(2017);

  useEffect(() => {
    if (paused || reduced) return;
    // Six seconds fully visible, followed by a 600ms crossfade.
    const timer = window.setInterval(() => setHeadline(value => (value + 1) % heroHeadlines.length), 6600);
    return () => window.clearInterval(timer);
  }, [paused, reduced]);

  useEffect(() => {
    if (paused || reduced) return;
    const delay = year === 2017 ? 3000 : year === 2027 ? 1500 : 150;
    const timer = window.setTimeout(() => setYear(value => value === 2027 ? 2017 : value + 1), delay);
    return () => window.clearTimeout(timer);
  }, [paused, reduced, year]);

  const active = reduced ? 0 : headline;
  return <>
    <div className={`hero-establishment${paused ? ' hero-journey-paused' : ''}`}>
      <span>ESTABLISHED 2017 · LILONGWE, MALAWI</span>
      <span className="hero-journey" aria-label="Journey to 2027: 2017 to 2027">
        <span aria-hidden="true">Journey to 2027 <span className={`hero-journey-year${!reduced && year === 2017 ? ' hero-journey-return' : ''}`}>{reduced ? '2017–2027' : year}</span></span>
      </span>
    </div>
    <h1 className={`tn-hero-headline hero-rotating-headline${paused || reduced ? ' hero-motion-paused' : ''}`}>
      <span className="hero-accessible-heading">{heroHeadlines[0].join('')}</span>
      {heroHeadlines.map(([primary, accent], index) => <span key={primary} aria-hidden="true"
        className={`hero-headline-slide${active === index ? ' is-current' : ''}`}>
        <span className="hero-headline-ink">{primary}<span className="hero-headline-accent">{accent}</span></span>
      </span>)}
    </h1>
    {!reduced ? <button type="button" className="hero-motion-toggle" aria-pressed={paused}
      aria-label={paused ? 'Play hero animations' : 'Pause hero animations'} onClick={() => setPaused(value => !value)}>
      {paused ? <Play size={14} /> : <Pause size={14} />}<span>{paused ? 'Play motion' : 'Pause motion'}</span>
    </button> : null}
  </>;
}
