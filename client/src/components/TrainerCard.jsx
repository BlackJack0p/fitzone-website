export function TrainerCard({ trainer }) {
  return (
    <article className="group h-full overflow-hidden rounded-card border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_12px_30px_rgb(0_0_0_/_25%)]">
      <img src={trainer.image} alt={trainer.name} className="aspect-[4/3] w-full object-cover" loading="lazy"/>

      <div className="p-5">
        <h3 className="mb-1 text-xl font-bold text-text">{trainer.name}</h3>

        <p className="mb-3 text-sm font-semibold text-primary">{trainer.specialty}</p>

        {trainer.description && (<p className="mb-4 text-sm leading-7 text-text-muted">{trainer.description}</p>)}

        <address className="mt-4 not-italic">
          <a href={`mailto:${trainer.email}`} className="break-words text-sm font-semibold text-text-muted transition-colors duration-300 hover:text-primary">
            {trainer.email}
          </a>
        </address>
      </div>
    </article>
  )
}
