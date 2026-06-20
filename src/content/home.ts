export type HomeStep = {
  n: number;
  title: string;
  body: string;
  tone: 'blue' | 'orange';
};

export type HomeWhoItsForItem = {
  title: string;
  description: string;
};

export type HomeWhatDoesCard = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export type HomeTrustedCard = {
  title: string;
  description: string;
  iconSrc: string;
};

export const homeSteps: HomeStep[] = [
  {
    n: 1,
    title: 'Create an Account',
    body: 'Sign up in minutes and set up your personal health profile.',
    tone: 'blue',
  },
  {
    n: 2,
    title: 'Connect with Professionals',
    body: 'Find and consult verified healthcare professionals that match your needs.',
    tone: 'orange',
  },
  {
    n: 3,
    title: 'Book Services',
    body: 'Schedule online consultations or book lab tests with trusted partners.',
    tone: 'orange',
  },
  {
    n: 4,
    title: 'Manage Your Health Data',
    body: 'Access test results, prescriptions, and medical records securely anytime.',
    tone: 'blue',
  },
];

export const whoItsForItems: HomeWhoItsForItem[] = [
  {
    title: 'Patients',
    description:
      'Access trusted healthcare professionals, book consultations and tests online, and take control of your health records.',
  },
  {
    title: 'Healthcare Professionals',
    description:
      'Reach more patients digitally, manage appointments efficiently, and deliver quality care without unnecessary administrative stress.',
  },
  {
    title: 'Hospitals, Pharmacies & Lab Partners',
    description:
      'Expand your digital presence, receive bookings seamlessly, and connect with patients looking for reliable diagnostic services.',
  },
];

export const whatDoesCards: HomeWhatDoesCard[] = [
  {
    title: 'Online Medical Consultations',
    description:
      'Connect with verified doctors, therapists, and specialists for virtual consultations from anywhere.',
    imageSrc: '/images/card-image-1.svg',
    imageAlt: 'Online consultation preview',
  },
  {
    title: 'Hospital, Pharmacy & Lab Partnerships',
    description:
      'Book diagnostic tests with registered hospitals, pharmacies and laboratories and receive results digitally.',
    imageSrc: '/images/card-image-2.svg',
    imageAlt: 'Hospital and lab partnerships preview',
  },
  {
    title: 'AI-Assisted Support',
    description:
      'Get guided support to help you navigate symptoms, appointments, and health information more easily.',
    imageSrc: '/images/card-mage-3.svg',
    imageAlt: 'AI-assisted support preview',
  },
];

export const trustedCards: HomeTrustedCard[] = [
  {
    title: 'Verified Healthcare Professionals',
    description:
      'All doctors, therapists, and specialists are properly verified before joining the platform.',
    iconSrc: '/icons/settings.svg',
  },
  {
    title: 'Secure & Private Data',
    description:
      'Your health information is protected with industry-standard security and privacy measures.',
    iconSrc: '/icons/lock.svg',
  },
  {
    title: 'Privacy & Compliance',
    description:
      'OHealth+ is built with patient confidentiality and regulatory compliance at its core.',
    iconSrc: '/icons/security-user.svg',
  },
  {
    title: 'Registered Hospitals, Pharmacies & Laboratories',
    description: 'We work only with recognised and trusted healthcare institutions.',
    iconSrc: '/icons/profile-add.svg',
  },
];
