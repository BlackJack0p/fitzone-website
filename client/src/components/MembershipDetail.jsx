import { useEffect, useState } from 'react'
import { formatPrice } from '../lib/format'

export function MembershipDetail({ slug, onBack }) {
  const [membership, setMembership] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchMembership() {
      setLoading(true)
      setError('')
      setMembership(null)

      try {
        const response = await fetch(
          `/api/memberships/slug/${encodeURIComponent(slug)}`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? 'Membership not found.'
              : 'Failed to load membership details.'
          )
        }

        const data = await response.json()
        setMembership(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load membership details.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchMembership()

    return () => controller.abort()
  }, [slug])

  return (
    <main className="min-h-screen bg-background px-4 py-12 text-text sm:px-6 lg:px-10 lg:py-16">
      <div className="mx-auto w-full max-w-[900px]">
        <button
          type="button"
          onClick={onBack}
          className="mb-8 inline-flex min-h-11 items-center rounded-md border border-line px-4 py-2 text-sm font-bold text-text transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          &larr; Back to FitZone
        </button>

        {loading && (
          <p role="status" className="py-12 text-center text-text-muted">
            Loading membership details...
          </p>
        )}

        {error && (
          <div className="rounded-card border border-line bg-surface p-8 text-center">
            <p role="alert" className="mb-5 text-red-400">
              {error}
            </p>
            <button
              type="button"
              onClick={onBack}
              className="font-bold text-primary hover:underline"
            >
              Return to FitZone
            </button>
          </div>
        )}

        {!loading && !error && membership && (
          <article className="overflow-hidden rounded-card border border-line bg-surface">
            <div className="h-2 bg-primary" />

            <div className="p-6 sm:p-10 lg:p-12">
              <p className="mb-3 text-sm font-bold uppercase tracking-[2px] text-primary">
                FITZONE MEMBERSHIP
              </p>

              <h1 className="mb-4 break-words text-3xl font-extrabold sm:text-4xl">
                {membership.name}
              </h1>

              <div className="mb-8 border-b border-line pb-8">
                <p className="flex flex-wrap items-baseline gap-2">
                  <span className="break-words text-4xl font-extrabold text-primary sm:text-5xl">
                    {formatPrice(membership.price)}
                  </span>
                  <span className="text-sm text-text-muted">
                    / {membership.billingPeriod || 'month'}
                  </span>
                </p>

                {membership.billingPeriod && (
                  <p className="mt-2 text-sm text-text-muted">
                    Billing period: {membership.billingPeriod}
                  </p>
                )}
              </div>

              <section className="mb-8">
                <h2 className="mb-3 text-xl font-bold">
                  About this membership
                </h2>
                <p className="whitespace-pre-line leading-8 text-text-muted">
                  {membership.fullDescription ||
                    membership.description ||
                    'More information about this membership will be available soon.'}
                </p>
              </section>

              {membership.suitableFor && (
                <section className="mb-8 rounded-card border border-line bg-background p-5">
                  <h2 className="mb-2 text-lg font-bold">
                    Who is this plan for?
                  </h2>
                  <p className="leading-7 text-text-muted">
                    {membership.suitableFor}
                  </p>
                </section>
              )}

              <section className="mb-8">
                <h2 className="mb-4 text-xl font-bold">
                  Membership benefits
                </h2>

                {Array.isArray(membership.benefits) &&
                membership.benefits.length > 0 ? (
                  <ul className="space-y-3">
                    {membership.benefits.map((benefit, index) => (
                      <li
                        key={`${membership.id}-benefit-${index}`}
                        className="flex items-start gap-3 leading-7 text-text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary"
                        >
                          ✓
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-text-muted">
                    Contact us for information about included benefits.
                  </p>
                )}
              </section>

              {membership.terms && (
                <section className="mb-8 border-t border-line pt-6">
                  <h2 className="mb-3 text-xl font-bold">
                    Terms and conditions
                  </h2>
                  <p className="whitespace-pre-line leading-7 text-text-muted">
                    {membership.terms}
                  </p>
                </section>
              )}

              <a
                href={`mailto:info@fitzone.com?subject=${encodeURIComponent(
                  `${membership.name} Membership`
                )}`}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-primary bg-primary px-5 py-3 text-center text-sm font-bold text-[#111111] transition-all hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
              >
                Enquire about {membership.name}
              </a>
            </div>
          </article>
        )}
      </div>
    </main>
  )
}
