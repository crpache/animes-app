import { useRouter } from 'next/router'
import { useAnime } from '../../hooks/useAnime'
import { GoBackButton } from '../../components/GoBackButton'
import { AnimeInfoCard } from '../../components/AnimeInfoCard'
import { Character } from '../../components/Character'
import { Episode } from '../../components/Episode'
import { useAnimesContext } from '../../context/AnimesContext'
import { useCharacters } from '../../hooks/useCharacters'
import { useEpisodes } from '../../hooks/useEpisodes'
import { formatAnime } from '../../utils/formatAnime'
import { useEffect, useState, memo } from 'react'
import { Anime } from '../../types'
import { BASE_URL } from '../../constants/endpoints'
import axios from 'axios'
import PulseLoader from 'react-spinners/PulseLoader'

//TODO: SPLIT COMPONENTS
const AnimePage = memo(() => {
  const router = useRouter()
  const animeId = router.query.animeId ? router.query.animeId : ''
  let anime = useAnime(animeId.toString())
  const [fetchedAnime, setFetchedAnime] = useState<Anime>()
  if (fetchedAnime) anime = fetchedAnime
  const characters = useCharacters(anime)
  const episodes = useEpisodes(anime)
  const { dispatch } = useAnimesContext()

  const fetchAnime = async () => {
    //fetch anime from API when accessing the page with no saved data in local storage
    if (animeId && !anime) {
      const response = await axios.get(`${BASE_URL}/${animeId}`)
      if (response.data.data) setFetchedAnime(formatAnime(response?.data.data))
    }
  }

  useEffect(() => {
    fetchAnime()
  }, [animeId])

  const handleOnStar = () =>
    dispatch({
      type: 'star_anime',
      id: animeId,
    })

  const handleOnFav = () =>
    dispatch({
      type: 'fav_anime',
      id: animeId,
    })

  const handleToggleEpisode = episodeId => {
    dispatch({ type: 'toggle_watch_episode', episodeId, animeId: anime.id })
  }

  if (!anime || characters.length < 1) {
    return (
      <div className="flex h-screen items-center justify-center">
        <PulseLoader color="#e2e8f0" loading size={20} />
      </div>
    )
  }

  return (
    <article className="flex flex-col items-center py-8 gap-10 bg-slate-800 text-slate-200 ">
      <h1 className="text-3xl font-bold text-center tracking-wider w-5/6">
        {anime.canonicalTitle}
      </h1>
      <section className="flex flex-col w-5/6 gap-5">
        <div className="flex self-start text-xl md:text-base">
          <GoBackButton href="/" label="Back" />
        </div>
        <div className="flex flex-col md:flex-row gap-10">
          <AnimeInfoCard
            posterImage={anime.posterImage}
            averageRating={anime.averageRating}
            userCount={anime.userCount}
            favoritesCount={anime.favoritesCount}
            ratingRank={anime.ratingRank}
            ageRating={anime.ageRating}
            ageRatingGuide={anime.ageRatingGuide}
            startDate={anime.startDate}
            endDate={anime.endDate}
            status={anime.status}
            showType={anime.showType}
            isStarred={anime.isStarred}
            isFav={anime.isFav}
            handleOnFav={handleOnFav}
            handleOnStar={handleOnStar}
          />
          <div className="flex flex-col md:w-2/3 gap-5">
            <p className="leading-loose text-xl md:text-base md:leading-loose">
              {anime?.synopsis}
            </p>
            <h3 className="text-xl">Characters</h3>
            <ul className="flex flex-col md:flex-row flex-wrap gap-4 items-center">
              {characters?.map(char => (
                <Character id={char.id} name={char.name} image={char.image} />
              ))}
            </ul>
            {episodes && anime.showType !== 'movie' && (
              <>
                <h3 className="text-xl">Episodes</h3>
                <ul className="flex flex-col gap-5 text-xl md:text-base">
                  {episodes.map(ep => (
                    <Episode
                      id={ep.id}
                      title={ep.title}
                      synopsis={ep.synopsis}
                      number={ep.number}
                      airDate={ep.airDate}
                      isSelected={anime.watchedEpisodes.includes(ep.id)}
                      onClick={handleToggleEpisode}
                    />
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>
    </article>
  )
})

export default AnimePage
