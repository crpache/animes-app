import { CheckCircleIcon as CheckSolid } from '@heroicons/react/solid'
import { CheckCircleIcon as CheckOutline } from '@heroicons/react/outline'

type Props = {
  isSelected: boolean
  onClick: () => void
}

export const CheckCircleIcon = ({ isSelected, onClick }: Props) => (
  <>
    {isSelected ? (
      <CheckSolid
        onClick={onClick}
        className="h-10 w-10 md:h-6 md:w-6 text-green-500 cursor-pointer"
      />
    ) : (
      <CheckOutline
        onClick={onClick}
        className="h-10 w-10 md:h-6 md:w-6 text-slate-200 cursor-pointer"
      />
    )}
  </>
)
