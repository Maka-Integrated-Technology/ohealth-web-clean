'use server';

import type { ContactFormState } from '@/lib/contact/contact-form-state';
import { getRequestIp } from '@/lib/contact/get-request-ip';
import { sendContactMessage } from '@/lib/contact/send-contact-message';
import { validateContactForm } from '@/lib/contact/validate-contact-form';
import { assertContactRateLimit } from '@/lib/rate-limit/contact-rate-limit';

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const validation = validateContactForm(formData);

  if (!validation.ok) {
    return {
      success: false,
      successAt: null,
      error: validation.error,
      fieldErrors: validation.fieldErrors,
    };
  }

  const ip = await getRequestIp();
  const rateLimit = await assertContactRateLimit(ip);

  if (!rateLimit.ok) {
    return {
      success: false,
      successAt: null,
      error: rateLimit.error,
      fieldErrors: {},
    };
  }

  const result = await sendContactMessage(validation.payload);

  if (!result.ok) {
    return {
      success: false,
      successAt: null,
      error: result.error,
      fieldErrors: {},
    };
  }

  return { success: true, successAt: Date.now(), error: null, fieldErrors: {} };
}
