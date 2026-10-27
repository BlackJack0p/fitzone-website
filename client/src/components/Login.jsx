import { useState } from 'react'
import { signIn, signUp } from '../lib/auth-client'

export default function Login({ onLogin, onShowRegister }) {
  const [isRegistering, setIsRegistering] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = isRegistering
        ? await signUp.email({ name, email, password })
        : await signIn.email({ email, password })

      if (result.error) {
        setError(result.error.message || 'Something went wrong. Please try again.')
        return
      }

      onLogin?.()
    } catch {
      setError('Unable to connect to the server. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  function switchMode() {
    setIsRegistering((current) => !current)
    setError('')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#101010] px-4 py-12 text-white">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-[#333] bg-[#1c1c1c] shadow-2xl md:grid-cols-2">
        <section className="flex flex-col justify-center bg-[#c8ff00] p-8 text-[#101010] sm:p-12">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em]">
            FitZone
          </p>

          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
            {isRegistering ? 'Start your fitness journey.' : 'Your fitness journey starts here.'}
          </h1>

          <p className="mt-5 max-w-sm text-base leading-7">
            {isRegistering
              ? 'Create your account to get started with FitZone.'
              : 'Sign in to access your account and keep moving towards your goals.'}
          </p>
        </section>

        <section className="p-8 sm:p-12">
          <h2 className="text-3xl font-bold">
            {isRegistering ? 'Create account' : 'Welcome back'}
          </h2>

          <p className="mt-2 text-sm text-[#b0b0b0]">
            {isRegistering
              ? 'Enter your details to register.'
              : 'Sign in to your FitZone account.'}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {isRegistering && (
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  className="w-full rounded-lg border border-[#444] bg-[#101010] px-4 py-3 text-white outline-none transition focus:border-[#c8ff00] focus:ring-2 focus:ring-[#c8ff00]/20"
                  placeholder="Your full name"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full rounded-lg border border-[#444] bg-[#101010] px-4 py-3 text-white outline-none transition focus:border-[#c8ff00] focus:ring-2 focus:ring-[#c8ff00]/20"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium">
                Password
              </label>
              <div className="flex rounded-lg border border-[#444] bg-[#101010] focus-within:border-[#c8ff00] focus-within:ring-2 focus-within:ring-[#c8ff00]/20">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={isRegistering ? 'new-password' : 'current-password'}
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="min-w-0 flex-1 rounded-l-lg bg-transparent px-4 py-3 text-white outline-none"
                  placeholder={isRegistering ? 'At least 8 characters' : 'Enter your password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="px-4 text-sm font-semibold text-[#c8ff00] hover:text-[#d8ff4d]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-[#c8ff00] px-4 py-3 font-bold text-[#101010] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d8ff4d] hover:shadow-[0_0_15px_rgba(200,255,0,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading
                ? 'Please wait...'
                : isRegistering
                  ? 'Create account'
                  : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#b0b0b0]">
            {isRegistering
              ? 'Already have an account? '
              : "Don't have an account? "}
            <button
              type="button"
              onClick={switchMode}
              className="font-semibold text-[#c8ff00] hover:text-[#d8ff4d]"
            >
              {isRegistering ? 'Sign in' : 'Sign up'}
            </button>
          </p>

          {onShowRegister && !isRegistering && (
            <button
              type="button"
              onClick={onShowRegister}
              className="mt-3 w-full text-center text-sm text-[#b0b0b0] hover:text-white"
            >
              Other registration options
            </button>
          )}
        </section>
      </div>
    </main>
  )
}
