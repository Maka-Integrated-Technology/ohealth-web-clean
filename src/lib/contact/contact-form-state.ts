export type ContactFormState = {
  success: boolean;
  /** Set when a submission succeeds — used to auto-hide the thank-you message. */
  successAt: number | null;
  error: string | null;
  fieldErrors: {
    fullName?: string;
    email?: string;
    message?: string;
  };
};

export const contactFormInitialState: ContactFormState = {
  success: false,
  successAt: null,
  error: null,
  fieldErrors: {},
};
