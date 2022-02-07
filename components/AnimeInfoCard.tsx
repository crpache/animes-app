import Image from 'next/image'
import { StarIcon } from './StarIcon'
import { HeartIcon } from './HeartIcon'

type Props = {
  posterImage: string
  isStarred: boolean
  handleOnStar: () => void
  isFav: boolean
  handleOnFav: () => void
  averageRating: number
  userCount: number
  favoritesCount: number
  ratingRank: number
  ageRating: string
  ageRatingGuide: string
  startDate: string
  endDate: string
  showType: string
  status: string
}

export const AnimeInfoCard = ({
  posterImage,
  isStarred,
  handleOnStar,
  isFav,
  handleOnFav,
  averageRating,
  userCount,
  favoritesCount,
  ratingRank,
  ageRating,
  ageRatingGuide,
  startDate,
  endDate,
  showType,
  status,
}: Props) => (
  <div className="flex flex-col md:w-1/3 gap-4 text-xl md:text-base">
    <Image src={posterImage} height={100} width={80} layout="responsive" />
    <span className="flex items-center">
      <StarIcon isSelected={isStarred} onClick={handleOnStar} />
      {averageRating} from {userCount | 0} users
    </span>
    <span className="flex gap-5">
      <span className="flex items-center">
        <HeartIcon isSelected={isFav} onClick={handleOnFav} />
        {favoritesCount}
      </span>
      Rank #{ratingRank}
    </span>
    <span>
      {ageRating} rated ({ageRatingGuide})
    </span>
    <span>Aired on {startDate}</span>
    <span>{status === 'ongoing' ? 'Ongoing' : `Ended on ${endDate}`}</span>
    <span>Type: {showType}</span>
  </div>
)
