const features = [
    {
        title: 'Expert Trainers',
        description: 'Get guidance and support from dedicated fitness professionals.',
    },
    {
        title: 'Supportive Community',
        description: 'Train alongside people who encourage you to keep improving.',
    },
]

export function About() {
    return (
        <section id="about" className="border-b border-line bg-background px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
            <div className="mx-auto grid w-full max-w-[1100px] grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
                <div>
                    <p className="mb-3 text-sm font-bold uppercase tracking-[2px] text-primary">ABOUT FITZONE</p>

                    <h2 className="mb-6 text-3xl font-extrabold leading-tight text-text sm:text-4xl">More Than Just a <span className="text-primary">Gym.</span></h2>

                    <p className="mb-4 leading-8 text-text-muted">
                        At FitZone, we believe fitness is about more than lifting weights. It is about building confidence, developing healthy habits, and becoming stronger every day.
                    </p>

                    <p className="mb-6 leading-8 text-text-muted">
                        Whether you are just starting your fitness journey or working towards your next personal best, our supportive community and dedicated trainers are here to help you reach your goals.
                    </p>

                    <a href="#membership"
                      className="inline-flex min-h-[46px] items-center justify-center rounded-md border-2 border-primary bg-primary px-6 py-3 font-bold text-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-hover hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                        Explore Membership
                    </a>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {features.map((feature) => (
                        <article key={feature.title}
                          className="rounded-card border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary">
                            <h3 className="mb-3 text-lg font-bold text-text">{feature.title}</h3>
                            <p className="text-sm leading-7 text-text-muted">{feature.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
