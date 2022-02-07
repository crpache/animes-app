import { HeartIcon as HeartSolid } from '@heroicons/react/solid'
import { HeartIcon as HeartOutline } from '@heroicons/react/outline'

type Props = {
  isSelected: boolean
  onClick: () => void
}

export const HeartIcon = ({ isSelected, onClick }: Props) => (
  <>
    {isSelected ? (
      <HeartSolid
        onClick={onClick}
        className="h-8 w-8 md:h-6 md:w-6 mr-1 text-red-400 cursor-pointer"
      />
    ) : (
      <HeartOutline
        onClick={onClick}
        className="h-8 w-8 md:h-6 md:w-6 mr-1 text-red-400 cursor-pointer"
      />
    )}
  </>
)
