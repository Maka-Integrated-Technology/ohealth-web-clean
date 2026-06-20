import { afterEach, describe, expect, it, vi } from 'vitest';

const sendMock = vi.fn();
const isContactSendMockedMock = vi.fn();

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: sendMock },
  })),
}));

vi.mock('@/lib/contact/is-contact-send-mocked', () => ({
  isContactSendMocked: () => isContactSendMockedMock(),
}));

const validInput = {
  fullName: 'Jane Doe',
  email: 'jane@example.com',
  profession: '',
  message: 'Hello team',
};

describe('sendContactMessage', () => {
  const envSnapshot = { ...process.env };

  afterEach(() => {
    process.env = { ...envSnapshot };
    sendMock.mockReset();
    isContactSendMockedMock.mockReset();
    vi.resetModules();
  });

  async function loadSender() {
    return import('@/lib/contact/send-contact-message');
  }

  it('short-circuits when contact send is mocked', async () => {
    isContactSendMockedMock.mockReturnValue(true);

    const { sendContactMessage } = await loadSender();
    const result = await sendContactMessage(validInput);

    expect(result).toEqual({ ok: true, data: { id: 'mock-contact-send' } });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('returns a configuration error when Resend env is missing', async () => {
    isContactSendMockedMock.mockReturnValue(false);
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_FROM_EMAIL;

    const { sendContactMessage } = await loadSender();
    const result = await sendContactMessage(validInput);

    expect(result).toEqual({ ok: false, error: 'Email service is not configured.' });
  });

  it('returns success when Resend accepts the message', async () => {
    isContactSendMockedMock.mockReturnValue(false);
    process.env.RESEND_API_KEY = 're_test';
    process.env.CONTACT_FROM_EMAIL = 'noreply@example.com';
    sendMock.mockResolvedValue({ data: { id: 'email_123' }, error: null });

    const { sendContactMessage } = await loadSender();
    const result = await sendContactMessage(validInput);

    expect(result).toEqual({ ok: true, data: { id: 'email_123' } });
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'noreply@example.com',
        replyTo: 'jane@example.com',
        subject: 'Contact form: Jane Doe',
      }),
    );
  });

  it('omits replyTo for invalid email addresses', async () => {
    isContactSendMockedMock.mockReturnValue(false);
    process.env.RESEND_API_KEY = 're_test';
    process.env.CONTACT_FROM_EMAIL = 'noreply@example.com';
    sendMock.mockResolvedValue({ data: { id: 'email_123' }, error: null });

    const { sendContactMessage } = await loadSender();
    await sendContactMessage({ ...validInput, email: 'not-an-email' });

    expect(sendMock).toHaveBeenCalledWith(
      expect.not.objectContaining({ replyTo: expect.anything() }),
    );
  });

  it('returns a generic error when Resend reports failure', async () => {
    isContactSendMockedMock.mockReturnValue(false);
    process.env.RESEND_API_KEY = 're_test';
    process.env.CONTACT_FROM_EMAIL = 'noreply@example.com';
    sendMock.mockResolvedValue({ data: null, error: { message: 'rate limited' } });

    const { sendContactMessage } = await loadSender();
    const result = await sendContactMessage(validInput);

    expect(result).toEqual({
      ok: false,
      error: 'Unable to send your message. Please try again.',
    });
  });
});
