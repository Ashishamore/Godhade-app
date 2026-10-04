import { createContext, useContext } from 'react'

/* Overlays (bottom sheets, dialogs) portal into the app's root element rather
   than document.body, so that when the app runs inside the phone frame they
   stay inside the phone instead of covering the whole desktop. */
export const PortalContext = createContext(null)

export const usePortalHost = () => useContext(PortalContext)
