export type ContactValues = {
  name: string; email: string; phone: string; subject: string;
  legalService: string; message: string; company: string; startedAt: string;
};
export type ContactResponse = {
  ok: boolean;
  message?: string;
  error?: string;
  details?: Partial<Record<keyof ContactValues, string[]>>;
};
