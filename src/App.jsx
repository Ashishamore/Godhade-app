import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { Compass } from 'lucide-react'

import AppShell from './components/AppShell'
import DeviceFrame from './components/DeviceFrame'
import ViewToolbar from './components/ViewToolbar'
import AdminShell from './components/admin/AdminShell'
import { Button, EmptyState } from './components/ui'

import Home from './screens/student/Home'
import Courses from './screens/student/Courses'
import CourseDetail from './screens/student/CourseDetail'
import Player from './screens/student/Player'
import Calculator from './screens/student/Calculator'
import Learning from './screens/student/Learning'
import Profile from './screens/student/Profile'
import Batch from './screens/student/Batch'
import {
  Contacts, Documents, Purchases, RecipeDetail, Support, Welcome,
} from './screens/student/Misc'

import Dashboard from './screens/admin/Dashboard'
import Admissions from './screens/admin/Admissions'
import { StudentDetail, Students, Support as AdminSupport } from './screens/admin/People'
import { Batches, Courses as AdminCourses, Recipes as AdminRecipes } from './screens/admin/Content'
import { Marketing, Payments, Settings } from './screens/admin/Business'

function NotFound() {
  return (
    <EmptyState
      icon={<Compass className="size-6" strokeWidth={1.9} />}
      title="Page not found"
      body="That link does not lead anywhere in the app."
      action={
        <Button as={Link} to="/" size="sm">
          Go home
        </Button>
      }
    />
  )
}

/* The student app lives inside the device frame; the admin console is web-only
   and always takes the full window. */
function StudentApp() {
  return (
    <DeviceFrame>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="course/:id" element={<CourseDetail />} />
          <Route path="course/:id/play/:lessonId" element={<Player />} />
          <Route path="recipe/:id" element={<RecipeDetail />} />
          <Route path="batch/:id" element={<Batch />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="learning" element={<Learning />} />
          <Route path="profile" element={<Profile />} />
          <Route path="purchases" element={<Purchases />} />
          <Route path="documents" element={<Documents />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="support" element={<Support />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </DeviceFrame>
  )
}

export default function App() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <>
      <Routes>
        <Route path="/admin" element={<AdminShell />}>
          <Route index element={<Dashboard />} />
          <Route path="admissions" element={<Admissions />} />
          <Route path="batches" element={<Batches />} />
          <Route path="students" element={<Students />} />
          <Route path="students/:id" element={<StudentDetail />} />
          <Route path="support" element={<AdminSupport />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="recipes" element={<AdminRecipes />} />
          <Route path="payments" element={<Payments />} />
          <Route path="marketing" element={<Marketing />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="/*" element={<StudentApp />} />
      </Routes>

      {/* The student app renders its own toolbar inside DeviceFrame. */}
      {isAdmin && <ViewToolbar />}
    </>
  )
}
