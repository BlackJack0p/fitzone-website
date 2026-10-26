export function Header() {
  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Trainer Bio', href: '#bio' },
    { label: 'Class Schedule', href: '#class-schedule' },
    { label: 'Membership Tiers', href: '#membership' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-[#101010]/95 backdrop-blur-xl">
      <nav className="mx-auto flex min-h-[76px] w-full max-w-[1100px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3 sm:px-6 lg:px-0 max-[520px]:justify-center">
        <a href="#home" className="shrink-0 whitespace-nowrap text-2xl font-extrabold tracking-[-1px] text-text">
          Fit<span className="text-primary">Zone</span>
        </a>

        <ul className="flex flex-wrap items-center justify-end gap-1 max-[520px]:justify-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href}
                className="block rounded-md px-2 py-2 text-sm font-semibold text-text-muted transition-colors duration-300 hover:bg-surface hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-3">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

