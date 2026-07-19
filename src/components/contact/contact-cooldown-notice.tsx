type ContactCooldownNoticeProps = {
  remainingSeconds: number;
};

export function ContactCooldownNotice({ remainingSeconds }: ContactCooldownNoticeProps) {
  return (
    <p className="mt-2 text-xs text-red-300">
      You can send another message in {remainingSeconds} seconds.
    </p>
  );
}
