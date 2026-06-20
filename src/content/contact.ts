export const CONTACT_SUPPORT_EMAIL = 'support@ohealthltd.com';

export type SupportCard = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
};

export const supportCards: SupportCard[] = [
  {
    title: 'Customer Support',
    description:
      'Need help with your account, bookings, or technical issues? Our support team is here to assist you.',
    href: `mailto:${CONTACT_SUPPORT_EMAIL}`,
    linkLabel: CONTACT_SUPPORT_EMAIL,
  },
  {
    title: 'Partnerships',
    description:
      'Interested in partnering with us as a hospital, lab, or organization? Reach out to explore collaboration opportunities.',
    href: 'mailto:partnerships@ohealthltd.com',
    linkLabel: 'partnerships@ohealthltd.com',
  },
  {
    title: 'General Inquiries',
    description:
      'For general questions about OHealth+, our services, or how the platform works.',
    href: 'mailto:info@ohealthltd.com',
    linkLabel: 'info@ohealthltd.com',
  },
  {
    title: 'Check Our FAQs First',
    description:
      'Take a look at our FAQs. It’s the fastest way to find answers to common questions about OHealth.',
    href: '/faq',
    linkLabel: 'Go to FAQs',
  },
];
