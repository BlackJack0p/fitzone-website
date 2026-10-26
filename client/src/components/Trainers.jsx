import { useState } from 'react'
import { trainers } from '../data/trainers'
import { TrainerCard } from './TrainerCard'
import { FavouriteButton } from './FavouriteButton'

export function Trainers() {
    const [selectedSpecialty, setSelectedSpecialty] = useState('All')
    const [favourites, setFavourites] = useState([])

    const filteredTrainers = selectedSpecialty === 'All' ? trainers : trainers.filter((trainer) => trainer.specialty === selectedSpecialty,)

    function toggleFavourite(trainerId) {setFavourites((currentFavourites) => currentFavourites.includes(trainerId) ? currentFavourites.filter((id) => id !== trainerId)
        : [...currentFavourites, trainerId],)}

    return (
        <section id="bio" className="border-t border-line bg-background px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
            <div className="mx-auto w-full max-w-[1100px]">
                <p className="mb-3 text-center text-sm font-bold uppercase tracking-[2px] text-primary">MEET THE TEAM</p>

                <h2 className="mb-4 text-center text-3xl font-extrabold text-text sm:text-4xl">Train With the <span className="text-primary">Best.</span></h2>

                <p className="mx-auto mb-8 max-w-[650px] text-center leading-8 text-text-muted">Meet our dedicated trainers who are here to guide, motivate, and support you on your fitness journey.</p>

                <div className="mb-8">
                    <label htmlFor="specialty" className="mb-2 block text-sm font-semibold text-text-muted">Filter by speciality</label>

                    <select id="specialty" value={selectedSpecialty} onChange={(event) => setSelectedSpecialty(event.target.value)} 
                      className="min-h-[46px] w-full max-w-xs rounded-md border border-line bg-surface px-4 py-3 text-text transition-colors duration-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                        <option value="All">All trainers</option>
                        <option value="Strength Training">Strength Training</option>
                        <option value="Group Fitness">Group Fitness</option>
                        <option value="Personal Training">Personal Training</option>
                    </select>
                </div>

                <p className="mb-6 text-sm text-text-muted" aria-live="polite">Favourites selected: {favourites.length}</p>

                {filteredTrainers.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredTrainers.map((trainer) => (
                            <div key={trainer.id} className="min-w-0">
                                <TrainerCard trainer={trainer} />
                                <FavouriteButton isFavourite={favourites.includes(trainer.id)} onToggle={() => toggleFavourite(trainer.id)}/>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="rounded-card border border-line bg-surface p-6 text-center text-text-muted">No trainers found for this speciality.</p>
                )}
            </div>
        </section>
    )
}