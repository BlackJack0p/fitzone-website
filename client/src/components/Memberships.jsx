import { useEffect, useState } from 'react'
import { formatPrice } from '../lib/format'
import { Link } from 'react-router'

export function Memberships() {
  const [memberships, setMemberships] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchMemberships() {
      try {
        const response = await fetch('/api/memberships')

        if (!response.ok) {
          throw new Error('Failed to load memberships.')
        }

        const data = await response.json()
        const membershipList = Array.isArray(data)
          ? data
          : data.memberships

        if (!Array.isArray(membershipList)) {
          throw new Error('The membership data has an unexpected format.')
        }

        setMemberships(membershipList)
      } catch (err) {
        setError(err.message || 'Unable to load memberships.')
      } finally {
        setLoading(false)
      }
    }

    fetchMemberships()
  }, [])

  return (
    <section
      id="membership"
      className="border-t border-line bg-surface px-4 py-16 sm:px-6 lg:px-10 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1100px]">
        <p className="mb-3 text-center text-sm font-bold uppercase tracking-[2px] text-primary">
          MEMBERSHIP PLANS
        </p>

        <h2 className="mb-4 text-center text-3xl font-extrabold text-text sm:text-4xl">
          Choose Your <span className="text-primary">Plan.</span>
        </h2>

        <p className="mx-auto mb-12 max-w-[650px] text-center leading-8 text-text-muted">
          Find a membership that suits your fitness goals and budget.
        </p>

        {loading && (
          <p className="py-8 text-center text-text-muted" role="status">
            Loading membership plans...
          </p>
        )}

        {!loading && error && (
          <p className="py-8 text-center text-red-400" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && memberships.length === 0 && (
          <p className="py-8 text-center text-text-muted">
            No membership plans are currently available.
          </p>
        )}

        {!loading && !error && memberships.length > 0 && (
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
            {memberships.map((membership, index) => {
              const featured = memberships.length >= 3 &&
                index === Math.floor(memberships.length / 2)

              return (
                <article
                  key={membership.id ?? membership.name}
                  className={`relative flex h-full flex-col overflow-hidden rounded-card border transition-all duration-300 hover:-translate-y-1 ${
                    featured
                      ? 'border-primary bg-background shadow-xl shadow-primary/10'
                      : 'border-line bg-background hover:border-primary/70 hover:shadow-lg hover:shadow-black/20'
                  }`}
                >
                  {featured && (
                    <div className="bg-primary px-4 py-2 text-center text-xs font-extrabold uppercase tracking-[1.5px] text-[#111111]">
                      Popular choice
                    </div>
                  )}

                  <div className="h-1 w-full bg-primary/70" />

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[1.5px] text-primary">
                      {`PLAN ${String(index + 1).padStart(2, '0')}`}
                    </p>

                    <h3 className="mb-3 break-words text-2xl font-extrabold text-text">
                      {membership.name}
                    </h3>

                    <div className="mb-6 border-b border-line pb-6">
                      <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <span className="break-words text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                          {formatPrice(membership.price)}
                        </span>

                        <span className="text-sm font-medium text-text-muted">
                          / month
                        </span>
                      </p>

                      <p className="mt-2 text-xs text-text-muted">
                        Billed monthly
                      </p>
                    </div>

                    <div className="mb-7 flex-1">
                      <h4 className="mb-4 text-sm font-bold text-text">
                        What's included
                      </h4>

                      {Array.isArray(membership.benefits) &&
                      membership.benefits.length > 0 ? (
                        <ul className="space-y-3">
                          {membership.benefits.map((benefit, index) => (
                            <li
                              key={`${membership.id ?? membership.name}-benefit-${index}`}
                              className="flex items-start gap-3 text-sm leading-6 text-text-muted"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary"
                              >
                                ✓
                              </span>

                              <span className="break-words">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm leading-6 text-text-muted">
                          Contact us for details about this plan.
                        </p>
                      )}
                    </div>

                    
                    <Link
                      to={`/memberships/${encodeURIComponent(membership.slug)}`}
                      className="mb-3 inline-flex min-h-11 w-full items-center justify-center rounded-md border border-line px-5 py-3 text-center text-sm font-bold text-text transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      View plan details
                    </Link>

                    <a
                      href={`mailto:info@fitzone.com?subject=${encodeURIComponent(
                        `${membership.name} Membership`
                      )}`}
                      className={`mt-auto inline-flex min-h-12 w-full items-center justify-center rounded-md border px-5 py-3 text-center text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                        featured
                          ? 'border-primary bg-primary text-[#111111] hover:brightness-110'
                          : 'border-primary/60 bg-transparent text-primary hover:bg-primary hover:text-[#111111]'
                      }`}
                    >
                      Choose {membership.name}
                    </a>

                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
