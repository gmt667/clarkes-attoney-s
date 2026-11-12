function publicEndpoint(value: string | undefined) {
  const trimmed = value?.trim() ?? '';
  if (!trimmed) return '';
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return trimmed;
  try {
    const url = new URL(trimmed);
    if (url.username || url.password) return '';
    if (url.protocol === 'https:' || (import.meta.env.DEV && url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname))) return url.href;
  } catch { /* Invalid endpoints use the direct contact fallback. */ }
  return '';
}

export const environment = {
  contactApiUrl: publicEndpoint(import.meta.env.VITE_CONTACT_API_URL),
  siteUrl: publicEndpoint(import.meta.env.VITE_SITE_URL).replace(/\/$/, ''),
};
