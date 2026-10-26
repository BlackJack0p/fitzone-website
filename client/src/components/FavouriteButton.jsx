export function FavouriteButton({ isFavourite, onToggle }) {
  return (
    <button type="button" onClick={onToggle} aria-pressed={isFavourite}
      className={`mt-4 min-h-[44px] w-full rounded-md border-2 px-4 py-2 text-sm font-bold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${
        isFavourite ? 'border-primary bg-primary text-[#111111] hover:bg-primary-hover' : 'border-line bg-surface text-text hover:border-primary hover:text-primary'
      }`}>
      {isFavourite ? 'Remove Favourite' : 'Add to Favourites'}
    </button>
  )
}

