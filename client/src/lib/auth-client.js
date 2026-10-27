import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_AUTH_URL || window.location.origin,
})

// Export the authentication functions used by the frontend.
export const {
  signIn,
  signUp,
  signOut,
  useSession,
} = authClient
