/** Log server errors without serializing full request/user payloads. */
export function logServerError(context: string, error: unknown): void {
  if (error instanceof Error) {
    console.error(`${context}: ${error.name} — ${error.message}`);
    return;
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    const message = (error as { message: unknown }).message;
    console.error(`${context}: ${String(message)}`);
    return;
  }

  console.error(`${context}: unknown error`);
}
