import { BookOpen, Calculator, GraduationCap, Home, User } from 'lucide-react'

/* Student app bottom tabs. Five, in the order a student actually uses them. */
export const TABS = [
  { to: '/', label: 'nav.home', icon: Home, end: true },
  { to: '/courses', label: 'nav.courses', icon: BookOpen },
  { to: '/calculator', label: 'nav.calculator', icon: Calculator },
  { to: '/learning', label: 'nav.learning', icon: GraduationCap },
  { to: '/profile', label: 'nav.profile', icon: User },
]
