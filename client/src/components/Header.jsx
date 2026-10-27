import { useSession, signOut } from '../lib/auth-client'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Trainer Bio', href: '#bio' },
  { label: 'Class Schedule', href: '#class-schedule' },
  { label: 'Membership Tiers', href: '#membership' },
  { label: 'Contact', href: '#contact' },
]

const authButtonClass =
  'ml-1 rounded-md border border-primary bg-primary px-3 py-2 text-sm font-bold text-[#101010] transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-[#d8ff4d] hover:shadow-[0_0_15px_rgba(200,255,0,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60'

export function Header({ onShowLogin }) {
  const { data: session, isPending } = useSession()

  async function handleSignOut() {
    await signOut()
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-[#101010]/95 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex min-h-[76px] w-full max-w-[1100px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3 sm:px-6 lg:px-0 max-[520px]:justify-center"
      >
        <a
          href="#home"
          aria-label="FitZone home"
          className="shrink-0 whitespace-nowrap text-2xl font-extrabold tracking-[-1px] text-text"
        >
          Fit<span className="text-primary">Zone</span>
        </a>

        <ul className="flex flex-wrap items-center justify-end gap-1 max-[520px]:justify-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block rounded-md px-2 py-2 text-sm font-semibold text-text-muted transition-colors duration-300 hover:bg-surface hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-3"
              >
                {link.label}
              </a>
            </li>
          ))}

          <li>
            {!isPending && session ? (
              <button
                type="button"
                onClick={handleSignOut}
                className={authButtonClass}
              >
                Logout
              </button>
            ) : (
              <button
                type="button"
                onClick={onShowLogin}
                disabled={isPending}
                className={authButtonClass}
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}
