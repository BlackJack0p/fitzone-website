export function Hero() {
  return (
    <section
      id="home"
      className="flex min-h-[70vh] items-center bg-background px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Small introduction */}
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-primary">
          Your fitness journey starts here
        </p>

        {/* Main heading */}
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-text sm:text-5xl lg:text-7xl">
          Build Strength.<span className="block text-primary">Become Stronger.</span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-base leading-7 text-text-muted sm:text-lg">
          Train with experienced instructors, join motivating fitness
          classes, and find a membership that suits your goals.
          Start building a stronger, healthier you with FitZone.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#membership" className="rounded-lg bg-primary px-6 py-3 font-bold text-background transition-colors hover:bg-primary-hover">
            View Memberships
          </a>

          <a href="#class-schedule" className="rounded-lg border border-line px-6 py-3 font-bold text-text transition-colors hover:border-primary hover:text-primary">
            View Class Schedule
          </a>
        </div>
      </div>
    </section>
  )
}
