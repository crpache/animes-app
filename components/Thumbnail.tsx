import { memo } from 'react'
import { useAnimesContext } from '../context/AnimesContext'
import Image from 'next/image'
import Link from 'next/link'
import { StarIcon } from './StarIcon'
import { HeartIcon } from './HeartIcon'

type Props = {
  id: string
  image: string
  title: string
  stars: number
  favs: number
  isFav: boolean
  isStarred: boolean
}

export const Thumbnail = memo(
  ({
    id,
    image = '/public/default.jpeg',
    title = '',
    stars = 0,
    favs = 0,
    isFav = false,
    isStarred = false,
  }: Props) => {
    const { dispatch } = useAnimesContext()

    const handleOnStar = () => {
      dispatch({
        type: 'star_anime',
        id,
      })
    }

    const handleOnFav = () => {
      dispatch({
        type: 'fav_anime',
        id,
      })
    }

    return (
      <div className="flex flex-col w-full md:w-[200px] cursor-pointer">
        <Link href={`/anime/${id}`}>
          <div className="h-[400px] md:h-[200px] w-auto relative">
            <Image src={image} alt={title} layout="fill" />
          </div>
        </Link>
        <div className="flex flex-col p-4 gap-2 md:p-3 md:gap-1 bg-slate-700 text-white">
          <p className="text-xl md:text-base overflow-ellipsis overflow-hidden whitespace-nowrap">
            {title}
          </p>
          <div className="flex gap-5">
            <div className="flex justify-center items-center">
              <StarIcon isSelected={isStarred} onClick={handleOnStar} />
              <span className="text-xl md:text-base">{stars}</span>
            </div>
            <div className="flex justify-center items-center">
              <HeartIcon isSelected={isFav} onClick={handleOnFav} />
              <span className="text-xl md:text-base">{favs}</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
)
