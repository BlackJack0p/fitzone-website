
import { Link } from 'react-router'
import { capitalizeFirst, formatName } from '../lib/format'

export function TrainerCard({ trainer }) {
  const trainerName = formatName(trainer.name)
  const trainerSpecialty = capitalizeFirst(trainer.specialty)

  return (
    <Link
      to={`/trainers/${encodeURIComponent(trainer.slug)}`}
      aria-label={`View ${trainerName}'s trainer profile`}
      className="group block h-full rounded-card focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      <article className="h-full overflow-hidden rounded-card border border-line bg-surface transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary group-hover:shadow-[0_12px_30px_rgb(0_0_0_/_25%)]">
        {trainer.image ? (
          <img
            src={trainer.image}
            alt={trainerName || 'Fitness trainer'}
            className="aspect-[4/3] w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center bg-background text-text-muted">
            No trainer photo available
          </div>
        )}

        <div className="p-5">
          <h3 className="mb-1 text-xl font-bold text-text">
            {trainerName}
          </h3>

          <p className="mb-3 text-sm font-semibold text-primary">
            {trainerSpecialty}
          </p>

          {trainer.description && (
            <p className="mb-4 text-sm leading-7 text-text-muted">
              {trainer.description}
            </p>
          )}

          <span className="mt-2 inline-block text-sm font-bold text-primary group-hover:underline">
            View trainer profile &rarr;
          </span>
        </div>
      </article>
    </Link>
  )
}
