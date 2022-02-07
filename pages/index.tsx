import { useEffect } from 'react'
import type { NextPage } from 'next'
import { Anime } from '../types'
import { useAnimesContext } from '../context/AnimesContext'
import { useApiContext } from '../context/ApiContext'
import { useFiltersContext } from '../context/FiltersContext'
import { formatAnime } from '../utils/formatAnime'
import { useGet } from '../hooks/useGet'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'
import { SearchBar } from '../components/SearchBar'
import { Thumbnail } from '../components/Thumbnail'
import PulseLoader from 'react-spinners/PulseLoader'

const Home: NextPage = () => {
  const { animes, dispatch } = useAnimesContext()
  const { page, setPage } = useApiContext()
  const { result, loading } = useGet(page)
  const { filters } = useFiltersContext()

  useEffect(() => {
    // update data with localstorage data
    if (result) {
      const data = result.data.data
      if (animes.find(anime => anime.id === data[0].id)) return //to prevent duplicated animes
      const updatedData = result.data.data
        .map(formatAnime)
        .map((anime: Anime) => {
          const updatedAnime = { ...anime }
          updatedAnime.isStarred = JSON.parse(
            localStorage.getItem('starredAnimes'),
          )?.includes(anime?.id)
          updatedAnime.isFav = JSON.parse(
            localStorage.getItem('favAnimes'),
          )?.includes(anime?.id)
          return updatedAnime
        })
      dispatch({
        type: 'set_animes',
        animes: updatedData,
      })
    }
  }, [result])

  const filterByTitle = anime =>
    anime?.canonicalTitle
      .toLowerCase()
      .includes(filters.searchValue.toLowerCase())

  const filterByFav = anime => anime.isFav

  const filterByStarred = anime => anime.isStarred

  let filteredAnimes = animes.filter(filterByTitle)
  if (filters.byFav) filteredAnimes = filteredAnimes.filter(filterByFav)
  if (filters.byStarred) filteredAnimes = filteredAnimes.filter(filterByStarred)

  const getAnimes = () => setPage(result?.data.links.next)
  const lastElementRef = useInfiniteScroll(loading, page, getAnimes)

  return (
    <article className="flex flex-col items-center bg-slate-800 text-white">
      <SearchBar resultsAmount={filteredAnimes.length} />
      {filteredAnimes && (
        <ul className="flex flex-wrap gap-6 w-5/6 md:w-4/5 items-center justify-center">
          {filteredAnimes.map(anime => {
            const isLastElement =
              filteredAnimes[filteredAnimes.length - 1] === anime
            return (
              <li
                ref={
                  isLastElement &&
                  !filters.byStarred &&
                  !filters.byFav &&
                  filters.searchValue === ''
                    ? lastElementRef // triggers inf scroll only when there is no filters applied
                    : null
                }
                key={anime.id}
                className="w-full md:m-0 md:w-auto "
              >
                <Thumbnail
                  id={anime.id}
                  title={anime.canonicalTitle}
                  image={anime.posterImage}
                  stars={anime.averageRating}
                  favs={anime.favouritesCount}
                  isStarred={anime.isStarred}
                  isFav={anime.isFav}
                />
              </li>
            )
          })}
        </ul>
      )}
      <span className="my-3">
        <PulseLoader color="#e2e8f0" loading={loading} size={10} />
      </span>
    </article>
  )
}

export default Home
