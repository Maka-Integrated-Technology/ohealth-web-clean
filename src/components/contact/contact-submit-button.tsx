'use client';

import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useFormStatus } from 'react-dom';
import { ContactCooldownNotice } from './contact-cooldown-notice';

type ContactSubmitButtonProps = {
  isCoolingDown: boolean;
  remainingSeconds: number;
};

export function ContactSubmitButton({
  isCoolingDown,
  remainingSeconds,
}: ContactSubmitButtonProps) {
  const { pending } = useFormStatus();

  if (isCoolingDown) {
    return <ContactCooldownNotice remainingSeconds={remainingSeconds} />;
  }

  return (
    <Button disabled={pending} type="submit" variant="marketingOnDark" size="form-submit">
      {pending ? (
        <>
          Sending...
          <Loader2 size={16} aria-hidden />
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
