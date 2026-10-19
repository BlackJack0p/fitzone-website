export function Footer() {
  return (
    <footer id="contact" className="border-t border-line bg-surface px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2">
        <div>
          <a href="#home" className="text-2xl font-bold text-text">Fit<span className="text-primary">Zone</span></a>
          <p className="mt-3 max-w-sm text-text-muted">Build strength, improve your fitness, and become stronger with FitZone.</p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-text">Contact Us</h2>
          <ul className="mt-3 space-y-2 text-text-muted">
            <li>Email:{' '}<a href="mailto:info@fitzone.com" className="hover:text-primary">info@fitzone.com</a></li>
            <li>Phone: <a href="tel:+27123456789" className="hover:text-primary">+27 12 345 6789</a></li>
            <li>Address: Your gym address here</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl border-t border-line pt-6 text-center text-sm text-text-muted">
        <p> © {new Date().getFullYear()} FitZone. All rights reserved.</p>
      </div>
    </footer>
  )
}
