import { useCallback } from 'react'
import {
  Link as RouterLink,
  NavLink as RouterNavLink,
  useNavigate as useRouterNavigate,
} from 'react-router-dom'
import { useAppBase } from '../hooks/useViewMode'

export { useLocation, useParams, useSearchParams } from 'react-router-dom'

/* ---------------------------------------------------------------------------
   Student-app routing helpers.

   The student app is mounted twice — /student/mobile (phone frame) and /student/web
   (full width). Screens keep writing app-absolute paths like '/courses'; these
   wrappers put the current prefix in front so a link never drops you out of
   the view you are in.
--------------------------------------------------------------------------- */
export function useAppPath() {
  const base = useAppBase()
  return useCallback(
    (to) => {
      if (typeof to !== 'string' || !to.startsWith('/')) return to
      return to === '/' ? base : base + to
    },
    [base],
  )
}

export function Link({ to, ...props }) {
  return <RouterLink to={useAppPath()(to)} {...props} />
}

export function NavLink({ to, ...props }) {
  return <RouterNavLink to={useAppPath()(to)} {...props} />
}

export function useNavigate() {
  const navigate = useRouterNavigate()
  const path = useAppPath()
  return useCallback(
    (to, options) => (typeof to === 'number' ? navigate(to) : navigate(path(to), options)),
    [navigate, path],
  )
}
