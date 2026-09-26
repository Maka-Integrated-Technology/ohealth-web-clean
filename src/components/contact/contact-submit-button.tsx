'use client';

import { ArrowRight, Loader2 } from 'lucide-react';
import { useSyncExternalStore } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { ContactCooldownNotice } from './contact-cooldown-notice';

const subscribeToHydration = () => () => undefined;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

type ContactSubmitButtonProps = {
  isCoolingDown: boolean;
  remainingSeconds: number;
};

export function ContactSubmitButton({
  isCoolingDown,
  remainingSeconds,
}: ContactSubmitButtonProps) {
  const { pending } = useFormStatus();
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    getClientSnapshot,
    getServerSnapshot,
  );

  if (isCoolingDown) {
    return <ContactCooldownNotice remainingSeconds={remainingSeconds} />;
  }

  return (
    <Button
      disabled={pending || !isHydrated}
      type="submit"
      variant="marketingOnDark"
      size="form-submit">
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
