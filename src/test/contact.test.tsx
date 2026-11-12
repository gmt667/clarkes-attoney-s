import { beforeEach, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '@/components/contact-form';
import { environment } from '@/config/environment';
import { submitEnquiry } from '@/services/contact';

vi.mock('@/config/environment', () => ({ environment: { contactApiUrl: '', siteUrl: '' } }));
beforeEach(() => { environment.contactApiUrl = ''; vi.stubGlobal('fetch', vi.fn()); });
const values = { name: 'Test Client', email: 'client@example.com', phone: '+265999000000', subject: 'Test enquiry', legalService: 'Litigation', message: 'Please help with this test legal enquiry.', company: '', startedAt: '0' };
async function completeForm() {
  const user = userEvent.setup();
  for (const [label, value] of [['Full name', values.name], ['Email address', values.email], ['Phone number', values.phone], ['Subject', values.subject], ['Message', values.message]]) await user.type(screen.getByLabelText(label), value);
  await user.selectOptions(screen.getByLabelText('Legal service required'), 'Litigation');
  return user;
}
it('shows direct contact fallback without making a request when no API is configured', () => {
  render(<ContactForm />);
  expect(screen.getByRole('status').textContent).toContain('Online enquiries are currently unavailable');
  expect(screen.getByRole('button', { name: 'Send enquiry' }).hasAttribute('disabled')).toBe(true);
  expect(screen.getByRole('link', { name: 'Email the firm' }).getAttribute('href')).toContain('mailto:info@clarkesattorneys.mw');
  expect(screen.getByRole('link', { name: 'Call the firm' }).getAttribute('href')).toContain('tel:');
  expect(fetch).not.toHaveBeenCalled();
});
it('validates fields without sending invalid data', async () => {
  environment.contactApiUrl = '/api/contact'; render(<ContactForm />);
  await userEvent.click(screen.getByRole('button', { name: 'Send enquiry' }));
  expect(screen.getByRole('alert').textContent).toContain('highlighted fields');
  expect(screen.getByLabelText('Full name').getAttribute('aria-invalid')).toBe('true');
  expect(fetch).not.toHaveBeenCalled();
});
it('shows loading and success only after a positive JSON API response', async () => {
  environment.contactApiUrl = '/api/contact';
  let resolveResponse!: (response: Response) => void;
  vi.mocked(fetch).mockImplementation(() => new Promise(resolve => { resolveResponse = resolve; }));
  render(<ContactForm />); const user = await completeForm();
  await user.click(screen.getByRole('button', { name: 'Send enquiry' }));
  expect(screen.getByRole('button', { name: /sending/i }).hasAttribute('disabled')).toBe(true);
  resolveResponse(Response.json({ ok: true, message: 'Accepted for delivery.' }));
  await screen.findByRole('heading', { name: 'Enquiry accepted' });
  expect(fetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({ method: 'POST', credentials: 'omit' }));
});
it.each(['network', 'html', 'server', 'malformed'])('preserves drafts and email fallback on %s failures', async mode => {
  environment.contactApiUrl = '/api/contact';
  if (mode === 'network') vi.mocked(fetch).mockRejectedValue(new Error('offline'));
  if (mode === 'html') vi.mocked(fetch).mockResolvedValue(new Response('<html>Not found</html>', { headers: { 'Content-Type': 'text/html' } }));
  if (mode === 'server') vi.mocked(fetch).mockResolvedValue(Response.json({ ok: false, error: 'Service unavailable' }, { status: 503 }));
  if (mode === 'malformed') vi.mocked(fetch).mockResolvedValue(Response.json({ status: 'unknown' }));
  render(<ContactForm />); const user = await completeForm();
  await user.click(screen.getByRole('button', { name: 'Send enquiry' }));
  await screen.findByRole('alert');
  expect((screen.getByLabelText('Message') as HTMLTextAreaElement).value).toBe(values.message);
  expect(decodeURIComponent(screen.getByRole('link', { name: /email the firm with your draft/i }).getAttribute('href')!)).toContain(values.message);
  expect(screen.queryByRole('heading', { name: 'Enquiry accepted' })).toBeNull();
  await waitFor(() => expect(screen.getByRole('button', { name: 'Send enquiry' }).hasAttribute('disabled')).toBe(false));
});
it('never accepts an HTTP failure as successful even if its JSON says ok', async () => {
  environment.contactApiUrl = '/api/contact';
  vi.mocked(fetch).mockResolvedValue(Response.json({ ok: true }, { status: 500 }));
  expect((await submitEnquiry(values, 'test')).ok).toBe(false);
});
