export function TrainerCard({ trainer }) {
  return (
    <article className="overflow-hidden rounded-card border border-line bg-surface transition-transform hover:-translate-y-1">
      {/* Trainer image */}
      <img src={trainer.image} alt={trainer.name} className="h-64 w-full object-cover"/>

      {/* Trainer information */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-text">{trainer.name}</h3>
        <p className="mt-2 text-sm font-medium text-primary">{trainer.specialty}</p>

        <a href={`mailto:${trainer.email}`} className="mt-4 inline-block text-sm text-text-muted transition-colors hover:text-primary">Contact Trainer</a>
      </div>
    </article>
  )
}
