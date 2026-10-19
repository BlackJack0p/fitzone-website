import { useState } from 'react'
import { trainers } from '../data/trainers'
import { TrainerCard } from './TrainerCard'
import { FavouriteButton } from './FavouriteButton'

export function Trainers() {
    const [selectedSpecialty, setSelectedSpecialty] = useState('All')
    const [favourites, setFavourites] = useState([])

    const filteredTrainers = selectedSpecialty === 'All' ? trainers : trainers.filter((trainer) => trainer.specialty === selectedSpecialty)

    function toggleFavourite(trainerId) {setFavourites((currentFavourites) => currentFavourites.includes(trainerId) ? currentFavourites.filter((id) => id !== trainerId)
        : [...currentFavourites, trainerId])}

  return (
    <section id="bio"className="bg-background px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
            <h2 className="mb-6 text-3xl font-bold text-text">Meet Our Trainers</h2>

            <label htmlFor="specialty" className="mb-2 block text-text-muted">
            Filter by speciality
            </label>

            <select id="specialty" value={selectedSpecialty} onChange={(event) => setSelectedSpecialty(event.target.value)} 
            className="mb-8 rounded-lg border border-line bg-surface px-4 py-3 text-text">
            <option value="All">All trainers</option>
            <option value="Strength Training">Strength Training</option>
            <option value="Group Fitness">Group Fitness</option>
            <option value="Personal Training">Personal Training</option>
            </select>
            <p className="mb-6 text-sm text-text-muted">Favourites selected: {favourites.length}</p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTrainers.map((trainer) => (
                    <div key={trainer.id}>
                    <TrainerCard trainer={trainer} />
                    <FavouriteButton isFavourite={favourites.includes(trainer.id)} onToggle={() => toggleFavourite(trainer.id)}/>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}
