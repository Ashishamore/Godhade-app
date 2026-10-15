/* ---------------------------------------------------------------------------
   Admin panel dataset.

   Deliberately shaped the way Godhade sir would actually read it: who applied,
   where they are from (the distance rule), what they bought, and what is still
   waiting on him.
--------------------------------------------------------------------------- */

export const admin = { name: 'Gajanan Godhade', role: 'Owner', unit: 'Murgud, Kolhapur' }

/* ------------------------------------------------------------------- KPIs --- */

export const kpis = [
  { id: 'revenue', label: { en: 'Revenue this month', hi: 'इस माह आय', mr: 'या महिन्याची आय' }, value: 486500, money: true, delta: 18.4, spark: [210, 265, 240, 310, 352, 338, 412, 486] },
  { id: 'students', label: { en: 'Registered students', hi: 'पंजीकृत विद्यार्थी', mr: 'नोंदणीकृत विद्यार्थी' }, value: 1284, delta: 6.1, spark: [820, 905, 962, 1020, 1090, 1152, 1221, 1284] },
  { id: 'online', label: { en: 'Online course sales', hi: 'ऑनलाइन कोर्स बिक्री', mr: 'ऑनलाइन कोर्स विक्री' }, value: 164, delta: 24.3, spark: [62, 78, 85, 101, 118, 132, 147, 164] },
  { id: 'pending', label: { en: 'Applications to review', hi: 'समीक्षा हेतु आवेदन', mr: 'तपासायचे अर्ज' }, value: 7, delta: -12.5, tone: 'warning', spark: [12, 10, 14, 9, 11, 8, 9, 7] },
]

export const revenueSplit = [
  { id: 'offline', label: { en: 'Residential batches', hi: 'आवासीय बैच', mr: 'निवासी बॅच' }, value: 310000, tint: '#c2410c' },
  { id: 'courses', label: { en: 'Online courses', hi: 'ऑनलाइन कोर्स', mr: 'ऑनलाइन कोर्स' }, value: 148000, tint: '#1b4f8a' },
  { id: 'recipes', label: { en: 'Written recipes', hi: 'लिखित रेसिपी', mr: 'लिखित रेसिपी' }, value: 28500, tint: '#8a5a08' },
]

export const monthlyRevenue = [
  { m: 'Mar', offline: 180000, online: 42000 },
  { m: 'Apr', offline: 220000, online: 56000 },
  { m: 'May', offline: 190000, online: 61000 },
  { m: 'Jun', offline: 260000, online: 78000 },
  { m: 'Jul', offline: 240000, online: 96000 },
  { m: 'Aug', offline: 290000, online: 118000 },
  { m: 'Sep', offline: 270000, online: 142000 },
  { m: 'Oct', offline: 310000, online: 176500 },
]

export const courseSales = [
  { id: 'paneer', label: 'पनीर', value: 42 },
  { id: 'khawa', label: 'खवा', value: 38 },
  { id: 'tup', label: 'तूप', value: 29 },
  { id: 'shrikhand', label: 'श्रीखंड', value: 24 },
  { id: 'dahi', label: 'दही', value: 19 },
  { id: 'basundi', label: 'बासुंदी', value: 12 },
]

/* Where enquiries come from — drives the distance rule. */
export const districtSplit = [
  { district: 'Pune', count: 186, avgKm: 215 },
  { district: 'Satara', count: 142, avgKm: 120 },
  { district: 'Sangli', count: 98, avgKm: 85 },
  { district: 'Solapur', count: 86, avgKm: 240 },
  { district: 'Kolhapur', count: 74, avgKm: 28 },
  { district: 'Nashik', count: 61, avgKm: 420 },
]

/* --------------------------------------------------------- applications --- */

export const applications = [
  { id: 'A-2219', name: 'Sunita Patil', phone: '+91 98220 11223', district: 'Pune', distanceKm: 215, batch: 'B-18', applied: '2026-09-30', aadhaar: 'uploaded', status: 'pending', repeater: false },
  { id: 'A-2220', name: 'Ramesh Jadhav', phone: '+91 98220 44556', district: 'Kolhapur', distanceKm: 22, batch: 'B-18', applied: '2026-09-30', aadhaar: 'uploaded', status: 'pending', repeater: false, flag: 'tooClose' },
  { id: 'A-2221', name: 'Pooja Deshmukh', phone: '+91 98220 77889', district: 'Nashik', distanceKm: 420, batch: 'B-18', applied: '2026-10-01', aadhaar: 'uploaded', status: 'pending', repeater: false },
  { id: 'A-2222', name: 'Imran Shaikh', phone: '+91 98220 33441', district: 'Solapur', distanceKm: 240, batch: 'B-19', applied: '2026-10-01', aadhaar: 'pending', status: 'pending', repeater: false },
  { id: 'A-2223', name: 'Vaishali Kamble', phone: '+91 98220 99001', district: 'Satara', distanceKm: 118, batch: 'B-19', applied: '2026-10-02', aadhaar: 'uploaded', status: 'pending', repeater: true },
  { id: 'A-2217', name: 'Nitin Gaikwad', phone: '+91 98220 22110', district: 'Ahmednagar', distanceKm: 310, batch: 'B-18', applied: '2026-09-27', aadhaar: 'uploaded', status: 'approved', repeater: false },
  { id: 'A-2216', name: 'Shital More', phone: '+91 98220 55667', district: 'Pune', distanceKm: 198, batch: 'B-18', applied: '2026-09-26', aadhaar: 'uploaded', status: 'confirmed', repeater: false },
  { id: 'A-2215', name: 'Balasaheb Shinde', phone: '+91 98220 88776', district: 'Kolhapur', distanceKm: 14, batch: 'B-18', applied: '2026-09-25', aadhaar: 'uploaded', status: 'rejected', repeater: false, flag: 'tooClose' },
]

/* -------------------------------------------------------------- students --- */

export const students = [
  {
    id: 'S-1042', name: 'Ashish Ashokmore', phone: '+91 98765 43210', district: 'Pune', distanceKm: 210,
    joined: '2026-07-18', courses: ['khawa', 'dahi'], recipes: ['r-basundi'], offline: null, spend: 4500,
    repeater: false, status: 'active',
    timeline: [
      { at: '2026-07-18', what: 'Signed up from Instagram campaign' },
      { at: '2026-08-02', what: 'Bought Khawa course — ₹2,000' },
      { at: '2026-08-14', what: 'Completed Khawa course' },
      { at: '2026-08-21', what: 'Bought Dahi course — ₹2,000' },
      { at: '2026-09-09', what: 'Bought Basundi written recipe — ₹500' },
      { at: '2026-09-28', what: 'Support query about khawa browning — resolved' },
    ],
  },
  {
    id: 'S-1038', name: 'Shital More', phone: '+91 98220 55667', district: 'Pune', distanceKm: 198,
    joined: '2026-06-02', courses: ['paneer', 'khawa', 'tup'], recipes: ['r-paneer'], offline: 'B-18', spend: 16500,
    repeater: false, status: 'active',
    timeline: [
      { at: '2026-06-02', what: 'Signed up from YouTube' },
      { at: '2026-06-20', what: 'Bought Paneer course — ₹2,000' },
      { at: '2026-07-11', what: 'Bought Khawa course — ₹2,000' },
      { at: '2026-08-30', what: 'Bought Pure ghee course — ₹2,500' },
      { at: '2026-09-26', what: 'Applied for Batch 18' },
      { at: '2026-09-28', what: 'Advance paid — seat confirmed' },
    ],
  },
  {
    id: 'S-1021', name: 'Vaishali Kamble', phone: '+91 98220 99001', district: 'Satara', distanceKm: 118,
    joined: '2026-03-14', courses: ['dahi', 'shrikhand'], recipes: [], offline: 'B-14', spend: 14500,
    repeater: true, status: 'active',
    timeline: [
      { at: '2026-03-14', what: 'Signed up from paid lead campaign' },
      { at: '2026-04-08', what: 'Attended Batch 14 — completed' },
      { at: '2026-05-22', what: 'Bought Dahi course — ₹2,000' },
      { at: '2026-07-30', what: 'Bought Shrikhand course — ₹2,500' },
      { at: '2026-10-02', what: 'Applied for Batch 19 (repeat attendee)' },
    ],
  },
  {
    id: 'S-1009', name: 'Nitin Gaikwad', phone: '+91 98220 22110', district: 'Ahmednagar', distanceKm: 310,
    joined: '2026-05-09', courses: ['khawa'], recipes: ['r-khawa'], offline: null, spend: 2500,
    repeater: false, status: 'active',
    timeline: [
      { at: '2026-05-09', what: 'Signed up from Facebook' },
      { at: '2026-06-18', what: 'Bought Khawa course — ₹2,000' },
      { at: '2026-09-27', what: 'Applied for Batch 18 — approved, advance pending' },
    ],
  },
  {
    id: 'S-0994', name: 'Imran Shaikh', phone: '+91 98220 33441', district: 'Solapur', distanceKm: 240,
    joined: '2026-08-25', courses: [], recipes: [], offline: null, spend: 0,
    repeater: false, status: 'lead',
    timeline: [
      { at: '2026-08-25', what: 'Signed up from paid lead campaign' },
      { at: '2026-10-01', what: 'Applied for Batch 19 — Aadhaar not uploaded' },
    ],
  },
  {
    id: 'S-0961', name: 'Sunita Patil', phone: '+91 98220 11223', district: 'Pune', distanceKm: 215,
    joined: '2026-09-12', courses: ['paneer'], recipes: [], offline: null, spend: 2000,
    repeater: false, status: 'active',
    timeline: [
      { at: '2026-09-12', what: 'Signed up from Instagram reel' },
      { at: '2026-09-19', what: 'Bought Paneer course — ₹2,000' },
      { at: '2026-09-30', what: 'Applied for Batch 18' },
    ],
  },
]

/* --------------------------------------------------------------- payments --- */

export const payments = [
  { id: 'pay_RZ8841', student: 'Shital More', item: 'Batch 18 — advance', amount: 5000, method: 'UPI', status: 'captured', at: '2026-09-28' },
  { id: 'pay_RZ8836', student: 'Sunita Patil', item: 'Paneer course', amount: 2000, method: 'Card', status: 'captured', at: '2026-09-19' },
  { id: 'pay_RZ8829', student: 'Ashish Ashokmore', item: 'Basundi recipe', amount: 500, method: 'UPI', status: 'captured', at: '2026-09-09' },
  { id: 'pay_RZ8814', student: 'Shital More', item: 'Pure ghee course', amount: 2500, method: 'UPI', status: 'captured', at: '2026-08-30' },
  { id: 'pay_RZ8802', student: 'Ashish Ashokmore', item: 'Dahi course', amount: 2000, method: 'Netbanking', status: 'captured', at: '2026-08-21' },
  { id: 'pay_RZ8791', student: 'Vaishali Kamble', item: 'Shrikhand course', amount: 2500, method: 'UPI', status: 'captured', at: '2026-07-30' },
  { id: 'pay_RZ8777', student: 'Nitin Gaikwad', item: 'Batch 18 — advance', amount: 5000, method: 'UPI', status: 'failed', at: '2026-09-27' },
  { id: 'pay_RZ8765', student: 'Ashish Ashokmore', item: 'Khawa course', amount: 2000, method: 'UPI', status: 'captured', at: '2026-08-02' },
]

/* ------------------------------------------------------- support & locks --- */

export const supportQueue = [
  { id: 'T-301', student: 'Sunita Patil', studentId: 'S-0961', subject: 'Paneer block breaking while cutting', last: 'My block crumbles when I cut it into pieces.', at: '2026-10-02T09:20:00', unread: true },
  { id: 'T-300', student: 'Nitin Gaikwad', studentId: 'S-1009', subject: 'Advance payment failed', last: 'Payment got debited but seat not confirmed.', at: '2026-10-01T18:05:00', unread: true },
  { id: 'T-298', student: 'Ashish Ashokmore', studentId: 'S-1042', subject: 'Khawa turning brown', last: 'Understood sir, I will try again tomorrow. Thank you.', at: '2026-09-28T15:02:00', unread: false },
  { id: 'T-295', student: 'Vaishali Kamble', studentId: 'S-1021', subject: 'Shrikhand shelf life', last: 'Thank you, the sugar ratio worked.', at: '2026-09-24T11:40:00', unread: false },
]

export const lockedSessions = [
  { id: 'L-18', student: 'Rohit Pawar', studentId: 'S-0877', course: 'khawa', reason: 'Screen capture attempted twice', at: '2026-10-01T20:14:00' },
  { id: 'L-17', student: 'Ganesh Mane', studentId: 'S-0812', course: 'paneer', reason: 'Screen capture attempted twice', at: '2026-09-29T21:02:00' },
]

/* --------------------------------------------------- WhatsApp templates --- */

export const waTemplates = [
  { id: 'w1', event: { en: 'Registration complete', hi: 'पंजीकरण पूर्ण', mr: 'नोंदणी पूर्ण' }, body: 'Namaskar {{name}}, welcome to Godhade Dairy training. Your account is ready.', sent: 412, active: true },
  { id: 'w2', event: { en: 'Application approved', hi: 'आवेदन मंज़ूर', mr: 'अर्ज मंजूर' }, body: 'Namaskar {{name}}, your seat for {{batch}} is approved. Pay the advance to confirm.', sent: 148, active: true },
  { id: 'w3', event: { en: 'Seat confirmed', hi: 'सीट पक्की', mr: 'जागा निश्चित' }, body: 'Your seat for {{batch}} is confirmed. Reporting at Murgud on {{date}}, 9 AM.', sent: 131, active: true },
  { id: 'w4', event: { en: 'Course completed', hi: 'कोर्स पूर्ण', mr: 'कोर्स पूर्ण' }, body: 'Congratulations {{name}}! You completed {{course}}. See which products this unlocks.', sent: 286, active: true },
  { id: 'w5', event: { en: 'Batch reminder', hi: 'बैच रिमाइंडर', mr: 'बॅच स्मरण' }, body: 'Reminder: {{batch}} starts in 2 days. Carry your ID and an apron.', sent: 97, active: false },
]

/* --------------------------------------------- dashboard suggestion cards --- */

export const suggestions = [
  {
    id: 'sg1',
    tone: 'warning',
    title: { en: '2 applicants are inside your 60 km rule', hi: '2 आवेदक आपके 60 किमी नियम के अंदर', mr: '२ अर्जदार तुमच्या ६० किमी नियमात' },
    body: { en: 'Ramesh Jadhav (22 km) and one more are from Kolhapur. Review before approving.', hi: 'रमेश जाधव (22 किमी) और एक और कोल्हापुर से हैं।', mr: 'रमेश जाधव (२२ किमी) व आणखी एक कोल्हापूरचे आहेत.' },
    action: { en: 'Review applications', hi: 'आवेदन देखें', mr: 'अर्ज पाहा' },
    to: '/admin/web/admissions',
  },
  {
    id: 'sg2',
    tone: 'info',
    title: { en: '38 students finished 2+ courses', hi: '38 विद्यार्थियों ने 2+ कोर्स पूरे किए', mr: '३८ विद्यार्थ्यांनी २+ कोर्स पूर्ण केले' },
    body: { en: 'They now see the residential upsell video. Last month this converted 11 seats.', hi: 'उन्हें अब आवासीय अपसेल वीडियो दिखता है। पिछले माह 11 सीटें बिकीं।', mr: 'त्यांना आता निवासी अपसेल व्हिडिओ दिसतो. गेल्या महिन्यात ११ जागा विकल्या.' },
    action: { en: 'Send WhatsApp nudge', hi: 'व्हाट्सएप भेजें', mr: 'व्हॉट्सअ‍ॅप पाठवा' },
    to: '/admin/web/marketing',
  },
  {
    id: 'sg3',
    tone: 'positive',
    title: { en: 'Paneer is your best seller', hi: 'पनीर सबसे ज़्यादा बिका', mr: 'पनीर सर्वाधिक विकला' },
    body: { en: '42 sales this month. A written recipe for it is not published yet.', hi: 'इस माह 42 बिक्री। इसकी लिखित रेसिपी अभी प्रकाशित नहीं।', mr: 'या महिन्यात ४२ विक्री. याची लिखित रेसिपी अजून प्रकाशित नाही.' },
    action: { en: 'Open recipes', hi: 'रेसिपी खोलें', mr: 'रेसिपी उघडा' },
    to: '/admin/web/recipes',
  },
]

export const money = (n) => '₹' + Number(n).toLocaleString('en-IN')

export const compactMoney = (n) => {
  if (n >= 10000000) return '₹' + (n / 10000000).toFixed(2) + ' Cr'
  if (n >= 100000) return '₹' + (n / 100000).toFixed(2) + ' L'
  if (n >= 1000) return '₹' + Math.round(n / 1000) + 'K'
  return '₹' + n
}
