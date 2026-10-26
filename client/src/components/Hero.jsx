export function Hero() {
  return (
    <section id="home" className="flex min-h-[430px] flex-col items-start justify-center border-b border-line px-4 py-20 sm:px-6 lg:min-h-[65vh] lg:px-10">
      <div className="mx-auto w-full max-w-[1100px]">
        <p className="mb-5 text-xs font-extrabold uppercase tracking-[3px] text-primary sm:text-sm">Your Fitness Journey Starts Here</p>

        <h1 className="mb-6 max-w-[850px] text-4xl font-extrabold leading-[1.05] tracking-tight text-text sm:text-6xl lg:text-7xl">
          Build <span className="text-primary">Strength.</span> Become{' '} <span className="text-primary">Stronger.</span>
        </h1>
        <p className="max-w-[600px] text-base leading-8 text-text-muted sm:text-lg">
          <p className="max-w-[600px] text-base leading-8 text-text-muted sm:text-lg">
          From your first workout to your next personal best, FitZone gives you the classes, expert guidance, and supportive community you need to reach your fitness goals.
        </p>
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#membership" className="inline-flex min-h-[46px] items-center justify-center rounded-md border-2 border-primary bg-primary px-6 py-3 font-bold text-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-hover hover:bg-primary-hover hover:shadow-lg">
            View Memberships
          </a>
          <a href="#class-schedule"className="inline-flex min-h-[46px] items-center justify-center rounded-md border-2 border-line px-6 py-3 font-bold text-text transition-colors duration-300 hover:border-primary hover:text-primary">
            View Class Schedule
          </a>
        </div>
      </div>
    </section>
  )
}
