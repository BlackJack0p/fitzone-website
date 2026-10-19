export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background">
      <nav className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-4 sm:flex-row">
        
        {/* Logo */}
        <a href="#home" className="text-2xl font-bold text-text">Fit<span className="text-primary">Zone</span></a>

        {/* Navigation links */}
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm sm:gap-x-5">
          <li><a href="#home" className="text-text-muted transition-colors hover:text-primary">Home</a></li>
          <li><a href="#about" className="text-text-muted transition-colors hover:text-primary">About</a></li>
          <li><a href="#bio" className="text-text-muted transition-colors hover:text-primary">Trainers</a></li>
          <li><a href="#class-schedule" className="text-text-muted transition-colors hover:text-primary">Classes</a></li>
          <li><a href="#membership" className="text-text-muted transition-colors hover:text-primary">Membership</a></li>
          <li><a href="#contact" className="text-text-muted transition-colors hover:text-primary">Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}