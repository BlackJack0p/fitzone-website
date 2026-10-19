export function FavouriteButton({ isFavourite, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isFavourite}
      className="mt-4 rounded-lg border border-line px-4 py-2 text-sm font-medium text-text transition-colors hover:border-primary hover:text-primary"
    >
      {isFavourite ? 'Remove Favourite' : 'Add to Favourites'}
    </button>
  )
}
