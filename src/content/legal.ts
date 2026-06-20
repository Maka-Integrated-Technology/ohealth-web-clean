export type PolicyBlock = {
  id?: string;
  number: number;
  title: string;
  paragraphs: string[];
};

export const termsSections: PolicyBlock[] = [
  {
    number: 1,
    title: 'Acceptance of Terms',
    paragraphs: [
      'By accessing and using OHealth+, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.',
    ],
  },
  {
    number: 2,
    title: 'Use of Services',
    paragraphs: [
      'OHealth+ provides a platform to connect patients with healthcare professionals. You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account information.',
    ],
  },
  {
    number: 3,
    title: 'Medical Disclaimer',
    paragraphs: [
      'OHealth+ is not a healthcare provider. The platform facilitates connections between patients and licensed healthcare professionals. Any medical advice, diagnosis, or treatment you receive is provided by independent healthcare professionals, not by OHealth+.',
    ],
  },
  {
    number: 4,
    title: 'Privacy and Data Protection',
    paragraphs: [
      'Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal and health information. We comply with all applicable healthcare privacy regulations including HIPAA.',
    ],
  },
  {
    number: 5,
    title: 'Appointment Booking and Cancellations',
    paragraphs: [
      'You may book, reschedule, or cancel appointments through the platform. Cancellation policies may vary by healthcare provider. Late cancellations or no-shows may result in charges as determined by the individual healthcare provider.',
    ],
  },
  {
    number: 6,
    title: 'Payment Terms',
    paragraphs: [
      'You agree to pay all fees associated with your use of OHealth+ services. Payment is due at the time of service unless otherwise arranged. We accept various payment methods as displayed in the app.',
    ],
  },
  {
    number: 7,
    title: 'Limitation of Liability',
    paragraphs: [
      'OHealth+ shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service, or for the cost of procurement of substitute services.',
    ],
  },
  {
    number: 8,
    title: 'Changes to Terms',
    paragraphs: [
      'We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the "Last Updated" date. Your continued use of the service constitutes acceptance of the modified terms.',
    ],
  },
];

export const privacySections: PolicyBlock[] = [
  {
    number: 1,
    title: 'Information We Collect',
    paragraphs: [
      'We collect information you provide directly to us, including your name, email address, phone number, date of birth, medical history, and health-related information. We also collect information automatically, such as device information, usage data, and location information when you use our services.',
    ],
  },
  {
    number: 2,
    title: 'How We Use Your Information',
    paragraphs: [
      'We use the information we collect to provide, maintain, and improve our services; to process your appointments and payments; to communicate with you; to monitor and analyze trends and usage; and to protect the security and integrity of our services.',
    ],
  },
  {
    number: 3,
    title: 'Information Sharing and Disclosure',
    paragraphs: [
      'We share your information with healthcare professionals you choose to consult, with service providers who assist us in operating our platform, and when required by law. We do not sell your personal information to third parties.',
    ],
  },
  {
    number: 4,
    id: 'data-security',
    title: 'Data Security',
    paragraphs: [
      'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We use encryption, secure servers, and regular security assessments to safeguard your data.',
    ],
  },
  {
    number: 5,
    title: 'HIPAA Compliance',
    paragraphs: [
      'OHealth+ is committed to complying with the Health Insurance Portability and Accountability Act (HIPAA). Your protected health information is handled in accordance with HIPAA privacy and security rules.',
    ],
  },
  {
    number: 6,
    title: 'Your Rights and Choices',
    paragraphs: [
      'You have the right to access, update, or delete your personal information. You can also control communication preferences and opt-out of certain data collection. Contact us to exercise these rights.',
    ],
  },
  {
    number: 7,
    title: 'Data Retention',
    paragraphs: [
      'We retain your information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. Medical records are retained in accordance with applicable healthcare regulations.',
    ],
  },
  {
    number: 8,
    title: "Children's Privacy",
    paragraphs: [
      'Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.',
    ],
  },
  {
    number: 9,
    title: 'Changes to Privacy Policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.',
    ],
  },
];
