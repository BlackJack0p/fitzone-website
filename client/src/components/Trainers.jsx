import { useEffect, useState } from 'react'
import { TrainerCard } from './TrainerCard'
import { FavouriteButton } from './FavouriteButton'

const specialties = [
  'All',
  'Strength Training',
  'Group Fitness',
  'Personal Training',
]

export function Trainers() {
  const [trainers, setTrainers] = useState([])
  const [selectedSpecialty, setSelectedSpecialty] = useState('All')
  const [favourites, setFavourites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchTrainers() {
      try {
        const response = await fetch('/api/trainers')

        if (!response.ok) {
          throw new Error('Failed to load trainers.')
        }

        const data = await response.json()

        const trainerList = Array.isArray(data)
          ? data
          : data.trainers

        if (!Array.isArray(trainerList)) {
          throw new Error('The trainer data has an unexpected format.')
        }

        setTrainers(trainerList)
      } catch (err) {
        setError(err.message || 'Unable to load trainers.')
      } finally {
        setLoading(false)
      }
    }

    fetchTrainers()
  }, [])

  function toggleFavourite(trainerId) {
    setFavourites((currentFavourites) =>
      currentFavourites.includes(trainerId)
        ? currentFavourites.filter((id) => id !== trainerId)
        : [...currentFavourites, trainerId]
    )
  }

  const filteredTrainers =
    selectedSpecialty === 'All'
      ? trainers
      : trainers.filter(
          (trainer) => trainer.specialty === selectedSpecialty
        )

  return (
    <section
      id="bio"
      className="border-t border-line bg-background px-4 py-16 sm:px-6 lg:px-10 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1100px]">
        <p className="mb-3 text-center text-sm font-bold uppercase tracking-[2px] text-primary">
          MEET THE TEAM
        </p>

        <h2 className="mb-4 text-center text-3xl font-extrabold text-text sm:text-4xl">
          Train With the <span className="text-primary">Best.</span>
        </h2>

        <p className="mx-auto mb-8 max-w-[650px] text-center leading-8 text-text-muted">
          Meet our dedicated trainers who are here to guide, motivate, and
          support you on your fitness journey.
        </p>

        {!loading && !error && trainers.length > 0 && (
          <div className="mb-8">
            <label
              htmlFor="specialty"
              className="mb-2 block text-sm font-semibold text-text-muted"
            >
              Filter by specialty
            </label>

            <select
              id="specialty"
              value={selectedSpecialty}
              onChange={(event) => setSelectedSpecialty(event.target.value)}
              className="min-h-[46px] w-full max-w-xs rounded-md border border-line bg-surface px-4 py-3 text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty === 'All' ? 'All trainers' : specialty}
                </option>
              ))}
            </select>
          </div>
        )}

        {!loading && !error && trainers.length > 0 && (
          <p className="mb-6 text-sm text-text-muted" aria-live="polite">
            Favourites selected: {favourites.length}
          </p>
        )}

        {loading && (
          <p className="py-8 text-center text-text-muted" role="status">
            Loading trainers...
          </p>
        )}

        {!loading && error && (
          <p className="py-8 text-center text-red-400" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && filteredTrainers.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTrainers.map((trainer) => (
              <div key={trainer.id} className="min-w-0">
                <TrainerCard trainer={trainer} />

                <FavouriteButton
                  isFavourite={favourites.includes(trainer.id)}
                  onToggle={() => toggleFavourite(trainer.id)}
                />
              </div>
            ))}
          </div>
        )}

        {!loading && !error && filteredTrainers.length === 0 && (
          <p className="rounded-card border border-line bg-surface p-6 text-center text-text-muted">
            {trainers.length === 0
              ? 'No trainers are currently available.'
              : 'No trainers found for this specialty.'}
          </p>
        )}
      </div>
    </section>
  )
}
