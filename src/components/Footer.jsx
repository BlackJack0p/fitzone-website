export function Footer() {
  return (
    <footer id="contact" className="mt-3 border-t border-line bg-[#0b0b0b] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto grid w-full max-w-[1100px] gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold text-text">Contact FitZone</h2>
          <p className="mt-3 text-text-muted">Questions about our classes or memberships?</p>
          <p className="mt-1 text-text-muted">Our team is here to help.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-text">Get in Touch</h3>

          <ul className="mt-3 space-y-3 text-text-muted">
            <li><span className="font-semibold text-text">Email: </span>
              <a href="mailto:juan.steyn.bbp@gmail.com" className="break-words transition-colors duration-300 hover:text-primary">
                juan.steyn.bbp@gmail.com
              </a>
            </li>

            <li><span className="font-semibold text-text">Phone: </span> <a href="tel:+27000000000" className="transition-colors duration-300 hover:text-primary">+27 00 000 0000</a></li>

            <li><span className="font-semibold text-text">Address: </span> 123 Fitness Street, Ballito</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-8 w-full max-w-[1100px] border-t border-line pt-6 text-center text-sm text-text-muted">
        <p>© 2026 FitZone Fitness Studio. All rights reserved.</p>
      </div>
    </footer>
  )
}
