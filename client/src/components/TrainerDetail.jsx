import { useEffect, useState } from 'react'
import { formatName, capitalizeFirst } from '../lib/format'

export function TrainerDetail({ slug, onBack }) {
  const [trainer, setTrainer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchTrainer() {
      setLoading(true)
      setError('')
      setTrainer(null)

      try {
        const response = await fetch(
          `/api/trainers/slug/${encodeURIComponent(slug)}`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? 'Trainer not found.'
              : 'Failed to load trainer details.'
          )
        }

        const data = await response.json()
        setTrainer(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load trainer details.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchTrainer()

    return () => controller.abort()
  }, [slug])

  return (
    <main className="min-h-screen bg-background px-4 py-12 text-text sm:px-6 lg:px-10 lg:py-16">
      <div className="mx-auto w-full max-w-[1000px]">
        <button
          type="button"
          onClick={onBack}
          className="mb-8 inline-flex min-h-11 items-center rounded-md border border-line px-4 py-2 text-sm font-bold text-text transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          &larr; Back to FitZone
        </button>

        {loading && (
          <p role="status" className="py-12 text-center text-text-muted">
            Loading trainer profile...
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

        {!loading && !error && trainer && (
          <article className="overflow-hidden rounded-card border border-line bg-surface">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="min-h-[280px] bg-background">
                {trainer.image ? (
                  <img
                    src={trainer.image}
                    alt={formatName(trainer.name) || 'Fitness trainer'}
                    className="h-full max-h-[600px] min-h-[280px] w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full min-h-[280px] items-center justify-center text-text-muted">
                    No trainer photo available
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-8 lg:p-10">
                <p className="mb-3 text-sm font-bold uppercase tracking-[2px] text-primary">
                  MEET YOUR TRAINER
                </p>

                <h1 className="mb-3 break-words text-3xl font-extrabold sm:text-4xl">
                  {formatName(trainer.name)}
                </h1>

                <p className="mb-6 font-semibold text-primary">
                  {capitalizeFirst(trainer.specialty)}
                </p>

                <p className="whitespace-pre-line leading-8 text-text-muted">
                  {trainer.biography ||
                    trainer.description ||
                    'More information about this trainer will be available soon.'}
                </p>

                {trainer.qualifications && (
                  <section className="mt-7 border-t border-line pt-5">
                    <h2 className="mb-2 text-lg font-bold">
                      Qualifications
                    </h2>
                    <p className="whitespace-pre-line leading-7 text-text-muted">
                      {trainer.qualifications}
                    </p>
                  </section>
                )}

                {trainer.experience && (
                  <section className="mt-6 border-t border-line pt-5">
                    <h2 className="mb-2 text-lg font-bold">
                      Experience
                    </h2>
                    <p className="whitespace-pre-line leading-7 text-text-muted">
                      {trainer.experience}
                    </p>
                  </section>
                )}

                {(trainer.email || trainer.phone) && (
                  <section className="mt-6 border-t border-line pt-5">
                    <h2 className="mb-3 text-lg font-bold">
                      Contact
                    </h2>

                    {trainer.email && (
                      <p className="mb-2 break-words text-text-muted">
                        Email:{' '}
                        <a
                          href={`mailto:${trainer.email}`}
                          className="font-semibold text-primary hover:underline"
                        >
                          {trainer.email}
                        </a>
                      </p>
                    )}

                    {trainer.phone && (
                      <p className="break-words text-text-muted">
                        Phone:{' '}
                        <a
                          href={`tel:${trainer.phone}`}
                          className="font-semibold text-primary hover:underline"
                        >
                          {trainer.phone}
                        </a>
                      </p>
                    )}
                  </section>
                )}
              </div>
            </div>
          </article>
        )}
      </div>
    </main>
  )
}
