
import { memberships } from '../data/memberships'

export function Memberships() {
  return (
    <section id="membership" className="bg-background px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-3xl font-bold text-text">Membership Plans</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {memberships.map((membership) => (
            <article key={membership.id} className="rounded-card border border-line bg-surface p-6">
                <h3 className="text-xl font-bold text-text">
                 {membership.name}
                </h3>

                <p className="mt-4 text-3xl font-bold text-primary">
                    R{membership.price}<span className="text-sm font-normal text-text-muted">/month</span>
                </p>

                <ul className="my-6 space-y-3">
                    {membership.benefits.map((benefit) => (<li key={benefit} className="text-text-muted">{benefit}</li>))}
                </ul>

                <a href={`mailto:info@fitzone.com?subject=${encodeURIComponent( 
                  `Membership enquiry: ${membership.name}`
                  )}`}
                  className="inline-block rounded-lg bg-primary px-5 py-3 font-bold text-background transition-colors hover:bg-primary-hover">
                    Enquire Now
                </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
