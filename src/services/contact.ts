import { environment } from '@/config/environment';
import type { ContactResponse, ContactValues } from '@/types/contact';

// The frontend never imports email SDKs or database clients.
export async function submitEnquiry(values: ContactValues, source: string): Promise<ContactResponse> {
  if (!environment.contactApiUrl) return { ok: false, error: 'Online enquiries are unavailable. Please email or call the firm.' };
  try {
    const response = await fetch(environment.contactApiUrl, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      credentials: 'omit', body: JSON.stringify({ ...values, source }), signal: AbortSignal.timeout(20000),
    });
    if (!response.headers.get('content-type')?.includes('application/json')) {
      return { ok: false, error: 'The enquiry service is unavailable. Your draft is saved below; please email or call the firm.' };
    }
    const data: unknown = await response.json();
    if (typeof data !== 'object' || data === null || !('ok' in data) || typeof data.ok !== 'boolean') throw new Error('Invalid enquiry response');
    const result = data as Record<string, unknown>;
    const fieldNames = ['name', 'email', 'phone', 'subject', 'legalService', 'message', 'company', 'startedAt'];
    const details = typeof result.details === 'object' && result.details !== null
      ? Object.fromEntries(Object.entries(result.details).filter(([field, messages]) => fieldNames.includes(field) && Array.isArray(messages) && messages.every(message => typeof message === 'string')))
      : undefined;
    return {
      ok: response.ok && result.ok === true,
      message: typeof result.message === 'string' ? result.message : undefined,
      error: typeof result.error === 'string' ? result.error : undefined,
      details,
    };
  } catch {
    return { ok: false, error: 'We could not confirm submission. Your draft is saved below. Please contact the firm before trying again.' };
  }
}
