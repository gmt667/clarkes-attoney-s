import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => { cleanup(); vi.unstubAllEnvs(); vi.unstubAllGlobals(); });
Object.defineProperty(window, 'matchMedia', { writable: true, value: vi.fn((query: string) => ({ matches: query.includes('reduced-motion'), media: query, addEventListener() {}, removeEventListener() {} })) });
window.scrollTo = vi.fn();
HTMLElement.prototype.scrollIntoView = vi.fn();
const dialogTriggers = new WeakMap<HTMLDialogElement, Element | null>();
HTMLDialogElement.prototype.showModal = function () { dialogTriggers.set(this, document.activeElement); this.setAttribute('open', ''); this.querySelector<HTMLButtonElement>('button')?.focus(); };
HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); this.dispatchEvent(new Event('close')); (dialogTriggers.get(this) as HTMLElement)?.focus(); };
