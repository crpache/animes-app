import { CheckCircleIcon } from './CheckCircleIcon'

type Props = {
  id: string
  isSelected: boolean
  number: number
  title: string
  synopsis: string
  airDate: string
  onClick: (id: string) => void
}

export const Episode = ({
  id,
  isSelected,
  airDate,
  number,
  title,
  synopsis,
  onClick,
}: Props) => (
  <li className="flex gap-4 items-center" key={`ep-${id}`}>
    <CheckCircleIcon isSelected={isSelected} onClick={() => onClick(id)} />
    <span>{airDate}</span>
    <span className="whitespace-nowrap overflow-hidden overflow-ellipsis w-3/5">
      {number}: {title || synopsis}
    </span>
  </li>
)
