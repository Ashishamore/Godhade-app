/* ---------------------------------------------------------------------------
   The signed-in student. Purchases, progress and application state live here.

   `useStudent` layers live session state on top of this so the demo can be
   driven forward — buy a course, finish a lesson, submit an application — and
   the upsell rules react exactly as they would against a real backend.
--------------------------------------------------------------------------- */

export const student = {
  id: 'S-1042',
  name: 'Ashish Ashokmore',
  phone: '+91 98765 43210',
  maskedPhone: '98765 43210',
  email: 'ashishashokmore@gmail.com',
  district: 'Pune',
  state: 'Maharashtra',
  distanceKm: 210,
  joined: '2026-07-18',
  language: 'en',
}

/* Courses already paid for, with per-lesson progress. */
export const initialPurchases = [
  { id: 'ORD-9341', kind: 'course', itemId: 'khawa', amount: 2000, date: '2026-08-02', invoice: 'INV-2026-0411' },
  { id: 'ORD-9602', kind: 'course', itemId: 'dahi', amount: 2000, date: '2026-08-21', invoice: 'INV-2026-0478' },
  { id: 'ORD-9755', kind: 'recipe', itemId: 'r-basundi', amount: 500, date: '2026-09-09', invoice: 'INV-2026-0533' },
]

export const initialProgress = {
  khawa: { completed: ['k1', 'k2', 'k3', 'k4', 'k5'], locked: false, strikes: 0 },
  dahi: { completed: ['d1', 'd2'], locked: false, strikes: 0 },
}

/* The student has no residential seat yet — the demo starts before applying. */
export const initialApplication = null

export const consentDocs = [
  {
    id: 'terms',
    title: { en: 'Terms of use', hi: 'उपयोग की शर्तें', mr: 'वापराच्या अटी' },
    updated: '2026-06-01',
    accepted: true,
  },
  {
    id: 'privacy',
    title: { en: 'Privacy policy', hi: 'गोपनीयता नीति', mr: 'गोपनीयता धोरण' },
    updated: '2026-06-01',
    accepted: true,
  },
  {
    id: 'content',
    title: {
      en: 'Content protection agreement',
      hi: 'कंटेंट सुरक्षा समझौता',
      mr: 'कंटेंट संरक्षण करार',
    },
    updated: '2026-07-10',
    accepted: true,
  },
  {
    id: 'refund',
    title: { en: 'Refund & cancellation', hi: 'रिफ़ंड और रद्दीकरण', mr: 'परतावा व रद्दीकरण' },
    updated: '2026-06-01',
    accepted: false,
  },
]

export const initialSupportThread = [
  {
    id: 'm1',
    from: 'student',
    text: 'Namaskar sir. In the khawa course, my batch turned slightly brown. What should I correct?',
    at: '2026-09-28T10:12:00',
  },
  {
    id: 'm2',
    from: 'admin',
    text: 'Namaskar. Browning means the flame was too high in the last 10 minutes. Lower it once the mix starts leaving the sides, and keep stirring without a pause.',
    at: '2026-09-28T14:40:00',
  },
  {
    id: 'm3',
    from: 'student',
    text: 'Understood sir, I will try again tomorrow. Thank you.',
    at: '2026-09-28T15:02:00',
  },
]
