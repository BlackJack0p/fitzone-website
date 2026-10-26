
import { memberships } from '../data/memberships'

export function Memberships() {
  return (
    <section id="membership" className="border-t border-line bg-background px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto w-full max-w-[1100px]">
        <p className="mb-3 text-center text-sm font-bold uppercase tracking-[2px] text-primary">CHOOSE YOUR PLAN</p>
        <h2 className="mb-4 text-center text-3xl font-extrabold text-text sm:text-4xl">Membership <span className="text-primary">Plans.</span></h2>
        <p className="mx-auto mb-10 max-w-[650px] text-center leading-8 text-text-muted">Choose a membership that suits your goals, routine, and budget.</p>

        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
          {memberships.map((membership) => (
            <article key={membership.id ?? membership.name}
               className="flex h-full flex-col rounded-card border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_12px_30px_rgb(0_0_0_/_25%)]">
                <h3 className="text-xl font-bold text-text">{membership.name}</h3>

                {membership.description && (
                  <p className="mt-2 text-sm leading-7 text-text-muted">{membership.description}</p>
                )}

                <p className="mt-5 text-3xl font-extrabold text-primary">
                  R{membership.price} <span className="ml-1 text-sm font-normal text-text-muted">/ month</span>
                </p>

                <ul className="my-6 flex-1 divide-y divide-line">
                  {membership.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-3 py-3 text-sm leading-6 text-text-muted">
                      <span aria-hidden="true" className="font-bold text-primary">✓</span> <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <a href={`mailto:info@fitzone.com?subject=${encodeURIComponent(
                  `${membership.name} Membership`,
                  )}`}
                  className="mt-auto inline-flex min-h-[46px] w-full items-center justify-center rounded-md border-2 border-primary bg-primary px-5 py-3 text-center font-bold text-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-hover hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  Choose {membership.name}
                </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

