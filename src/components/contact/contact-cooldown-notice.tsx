type ContactCooldownNoticeProps = {
  remainingSeconds: number;
};

export function ContactCooldownNotice({ remainingSeconds }: ContactCooldownNoticeProps) {
  return (
    <p className="mt-2 text-xs text-white/50">
      You can send another message in {remainingSeconds} seconds.
    </p>
  );
}
