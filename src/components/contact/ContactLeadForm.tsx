'use client';

import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';
import { useFormStatus } from 'react-dom';
import { ArrowRight, Loader2 } from 'lucide-react';

import { submitContactForm } from '@/app/contact/actions';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { contactFormInitialState } from '@/lib/contact/contact-form-state';
import { CONTACT_HONEYPOT_FIELD } from '@/lib/contact/contact-limits';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

/** Fields on the gradient contact card — extends shared Input/Textarea primitives */
const contactFieldClassName = cn(
  'mt-3 h-auto min-h-0 rounded-lg border-brand-neutral-200/25 bg-white/5 p-4 text-base leading-[120%] tracking-[-0.5px]',
  'text-white shadow-none outline-none transition-colors placeholder:text-white/50',
  'focus-visible:border-white/40 focus-visible:ring-2 focus-visible:ring-white/30',
  'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-white/5',
  'aria-invalid:border-red-300/80 aria-invalid:ring-red-200/40',
);

const THANK_YOU_VISIBLE_MS = 10_000;

type FormValues = {
  fullName: string;
  email: string;
  profession: string;
  message: string;
};

const emptyFormValues: FormValues = {
  fullName: '',
  email: '',
  profession: '',
  message: '',
};

function ContactFieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="font-semibold text-sm text-neutral-50 leading-[120%] tracking-[-0.5px]">
        {children}
      </span>
    </label>
  );
}

function ContactSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="marketingOnDark" size="form-submit" disabled={pending}>
      {pending ? (
        <>
          Sending...
          <Loader2 size={16} className="animate-spin" aria-hidden />
        </>
      ) : (
        <>
          Send Message
          <ArrowRight size={16} strokeWidth={2} aria-hidden />
        </>
      )}
    </Button>
  );
}

export function ContactLeadForm() {
  const [state, formAction] = useActionState(submitContactForm, contactFormInitialState);
  const [values, setValues] = useState<FormValues>(emptyFormValues);
  const [dismissedSuccessAt, setDismissedSuccessAt] = useState<number | null>(null);
  const clearedForSuccessAt = useRef<number | null>(null);

  const showThankYou = state.successAt != null && dismissedSuccessAt !== state.successAt;

  useEffect(() => {
    if (state.successAt == null || clearedForSuccessAt.current === state.successAt)
      return;

    clearedForSuccessAt.current = state.successAt;
    setValues(emptyFormValues);
  }, [state.successAt]);

  useEffect(() => {
    if (state.successAt == null) return;

    const successAt = state.successAt;
    const timer = window.setTimeout(() => {
      setDismissedSuccessAt(successAt);
    }, THANK_YOU_VISIBLE_MS);

    return () => window.clearTimeout(timer);
  }, [state.successAt]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData();
    formData.set('fullName', values.fullName);
    formData.set('email', values.email);
    formData.set('profession', values.profession);
    formData.set('message', values.message);

    const honeypot = event.currentTarget.querySelector<HTMLInputElement>(
      `input[name="${CONTACT_HONEYPOT_FIELD}"]`,
    );
    if (honeypot?.value) {
      formData.set(CONTACT_HONEYPOT_FIELD, honeypot.value);
    }

    startTransition(() => {
      formAction(formData);
    });
  }

  return (
    <ScrollReveal
      variant="slideInRight"
      delay={0.06}
      className="grid w-full gap-6 rounded-3xl bg-linear-to-b from-[#063595] to-[#254991] px-4 py-6 shadow-xl md:gap-7 md:p-7 lg:gap-12.5 xl:px-10 xl:py-12.5">
      <div>
        <p className="text-center text-sm font-medium uppercase leading-[110%] tracking-[-0.8px] text-brand-accent-100 lg:text-base">
          Contact us
        </p>
        <h2 className="mt-3 text-center text-4xl font-semibold leading-none text-white">
          Tell us how we can help.
        </h2>
      </div>

      <form onSubmit={handleSubmit} noValidate className="grid gap-12">
        <input
          type="text"
          name={CONTACT_HONEYPOT_FIELD}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />
        <div className="grid gap-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <ContactFieldLabel htmlFor="fullName">Full Name *</ContactFieldLabel>
              <Input
                id="fullName"
                name="fullName"
                required
                aria-required
                autoComplete="name"
                placeholder="Jane Doe"
                value={values.fullName}
                onChange={event =>
                  setValues(current => ({ ...current, fullName: event.target.value }))
                }
                className={contactFieldClassName}
                aria-invalid={!!state.fieldErrors.fullName}
                aria-describedby={
                  state.fieldErrors.fullName ? 'fullName-error' : undefined
                }
              />
              {state.fieldErrors.fullName ? (
                <p
                  id="fullName-error"
                  role="alert"
                  className="mt-1.5 text-xs text-red-300">
                  {state.fieldErrors.fullName}
                </p>
              ) : null}
            </div>
            <div>
              <ContactFieldLabel htmlFor="email">Email Address *</ContactFieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                required
                aria-required
                autoComplete="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={event =>
                  setValues(current => ({ ...current, email: event.target.value }))
                }
                className={contactFieldClassName}
                aria-invalid={!!state.fieldErrors.email}
                aria-describedby={state.fieldErrors.email ? 'email-error' : undefined}
              />
              {state.fieldErrors.email ? (
                <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-300">
                  {state.fieldErrors.email}
                </p>
              ) : null}
            </div>
          </div>

          <div>
            <ContactFieldLabel htmlFor="profession">
              Profession (optional)
            </ContactFieldLabel>
            <Input
              id="profession"
              name="profession"
              autoComplete="organization-title"
              placeholder="Profession"
              value={values.profession}
              onChange={event =>
                setValues(current => ({ ...current, profession: event.target.value }))
              }
              className={contactFieldClassName}
            />
          </div>

          <div>
            <ContactFieldLabel htmlFor="message">Message *</ContactFieldLabel>
            <Textarea
              id="message"
              name="message"
              required
              aria-required
              rows={6}
              placeholder="How can we help?"
              value={values.message}
              onChange={event =>
                setValues(current => ({ ...current, message: event.target.value }))
              }
              className={cn(
                contactFieldClassName,
                'field-sizing-fixed min-h-40 resize-y',
              )}
              aria-invalid={!!state.fieldErrors.message}
              aria-describedby={state.fieldErrors.message ? 'message-error' : undefined}
            />
            {state.fieldErrors.message ? (
              <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-300">
                {state.fieldErrors.message}
              </p>
            ) : null}
          </div>

          {state.error && Object.keys(state.fieldErrors).length === 0 ? (
            <p className="text-center text-sm text-red-200" role="alert">
              {state.error}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col items-center gap-0 pt-2">
          <ContactSubmitButton />
          {showThankYou ? (
            <p
              className="mt-8 max-w-md animate-in fade-in duration-300 text-center text-base leading-relaxed text-white/95"
              role="status"
              aria-live="polite">
              Thanks — we&apos;ve received your message. Our team will get back to you
              soon.
            </p>
          ) : null}
        </div>
      </form>
    </ScrollReveal>
  );
}
