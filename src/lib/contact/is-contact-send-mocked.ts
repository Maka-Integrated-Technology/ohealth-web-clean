/** True only in non-production test runs (Playwright / local E2E). */
export function isContactSendMocked(): boolean {
  if (process.env.NODE_ENV === 'production') {
    return false;
  }

  return process.env.E2E === 'true' || process.env.CONTACT_MOCK_SEND === 'true';
}
