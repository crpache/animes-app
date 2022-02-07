import { StarIcon as StarSolid } from '@heroicons/react/solid'
import { StarIcon as StarOutline } from '@heroicons/react/outline'

export const StarIcon = ({ isSelected, onClick }) => (
  <>
    {isSelected ? (
      <StarSolid
        onClick={onClick}
        className="h-8 w-8 md:h-6 md:w-6 mr-1 text-yellow-300 cursor-pointer"
      />
    ) : (
      <StarOutline
        onClick={onClick}
        className="h-8 w-8 md:h-6 md:w-6 mr-1 text-yellow-300 cursor-pointer"
      />
    )}
  </>
)
