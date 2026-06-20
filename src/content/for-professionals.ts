export type ProStep = {
  n: number;
  title: string;
  body: string;
  tone: 'blue' | 'orange';
};

export type ProWhoCanItem = {
  title: string;
};

export type ProDesignedCard = {
  title: string;
  description: string;
  iconSrc: string;
};

export type ProWhyCard = {
  title: string;
  description: string;
};

export const proSteps: ProStep[] = [
  {
    n: 1,
    title: 'Create an Account',
    body: 'Sign up on the OHealth+ web platform and set up your professional profile.',
    tone: 'blue',
  },
  {
    n: 2,
    title: 'Get Verified',
    body: 'Submit your credentials for verification to ensure a trusted healthcare environment.',
    tone: 'orange',
  },
  {
    n: 3,
    title: 'Start Receiving Patients',
    body: 'Patients can find you, book consultations, and connect with you directly.',
    tone: 'orange',
  },
  {
    n: 4,
    title: 'Manage Care Seamlessly',
    body: 'Conduct consultations, add notes, and track patient progress—all from your dashboard.',
    tone: 'blue',
  },
];

export const whoCanItems: ProWhoCanItem[] = [
  { title: 'Doctors' },
  { title: 'Nurses' },
  { title: 'Therapists' },
  { title: 'Nutritionists' },
  { title: 'Hospitals, Pharmacies, and Laboratories' },
  { title: 'Other certified healthcare specialists' },
];

export const designedCards: ProDesignedCard[] = [
  {
    title: 'Patient Management Dashboard',
    description:
      'View and manage all your patients in one place with clear, structured records.',
    iconSrc: '/icons/dashboard-square-setting.svg',
  },
  {
    title: 'Consultation Tracking',
    description:
      'Keep a chronological history of consultations, notes, and patient interactions.',
    iconSrc: '/icons/mentoring.svg',
  },
  {
    title: 'Secure Communication',
    description: 'Interact with patients through a safe and reliable platform.',
    iconSrc: '/icons/message-secure.svg',
  },
];

export const whyCards: ProWhyCard[] = [
  {
    title: 'Reach More Patients',
    description:
      'Connect with patients beyond your physical location and grow your practice digitally.',
  },
  {
    title: 'Manage Consultations Easily',
    description:
      'Schedule, conduct, and track consultations all in one place—without unnecessary back and forth.',
  },
  {
    title: 'Centralised Patient Records',
    description:
      'Access patient history, lab results, and notes in a structured and organized way.',
  },
  {
    title: 'Save Time on Admin Work',
    description: 'Spend less time on manual processes and more time caring for patients.',
  },
];
