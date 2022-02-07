import {
  createContext,
  useReducer,
  useContext,
  useState,
  useEffect,
} from 'react'
import { Anime } from '../types'

type Action =
  | {
      type: 'set_initial_animes'
      animes: Anime[]
    }
  | {
      type: 'set_animes'
      animes: Anime[]
    }
  | {
      type: 'fav_anime'
      id: string
    }
  | {
      type: 'star_anime'
      id: string
    }
  | {
      type: 'set_episodes'
      animeId: string
      episodes: []
    }
  | {
      type: 'toggle_watch_episode'
      animeId: string
      episodeId: string
    }

const animesReducer = (animes: Anime[], action: Action) => {
  switch (action.type) {
    case 'set_initial_animes': {
      return action.animes
    }
    case 'set_animes': {
      return [...animes, ...action.animes]
    }
    case 'fav_anime': {
      const anime = animes.find(anime => anime.id === action.id)
      const index = animes.indexOf(anime)
      const selectedAnime = { ...anime }
      selectedAnime.isFav = !selectedAnime.isFav
      const updatedAnimes = [...animes]
      updatedAnimes[index] = selectedAnime
      return updatedAnimes
    }
    case 'star_anime': {
      const anime = animes.find(anime => anime.id === action.id)
      const index = animes.indexOf(anime)
      const selectedAnime = { ...anime }
      selectedAnime.isStarred = !selectedAnime.isStarred
      const updatedAnimes = [...animes]
      updatedAnimes[index] = selectedAnime
      return updatedAnimes
    }
    case 'toggle_watch_episode': {
      const anime = animes.find(anime => anime.id === action.animeId)
      const index = animes.indexOf(anime)
      const selectedAnime = { ...anime }
      const watchedEpisodes = selectedAnime.watchedEpisodes
      const episode = watchedEpisodes.find(epId => epId === action.episodeId)
      if (!episode) {
        selectedAnime.watchedEpisodes = [...watchedEpisodes, action.episodeId]
      } else {
        selectedAnime.watchedEpisodes = watchedEpisodes.filter(
          epId => epId !== action.episodeId,
        )
      }
      const updatedAnimes = [...animes]
      updatedAnimes[index] = selectedAnime
      return updatedAnimes
    }
    default: {
      return animes
    }
  }
}

const AnimesContext = createContext(null)

export const AnimesContextProvider = ({ children }) => {
  const [animes, dispatch] = useReducer(animesReducer, [])
  const [starredAnimes, setStarredAnimes] = useState()
  const [favAnimes, setFavAnimes] = useState()
  const [watchedEpisodes, setWatchedEpisodes] = useState()

  useEffect(() => {
    let starred = undefined
    let fav = undefined
    let watched = undefined
    if (animes.length > 0) {
      starred = animes.filter(anime => anime.isStarred).map(anime => anime.id)
      fav = animes.filter(anime => anime.isFav).map(anime => anime.id)
      watched = animes.map(anime => anime.watchedEpisodes).flat()
    }
    setStarredAnimes(starred)
    setFavAnimes(fav)
    setWatchedEpisodes(watched)
  }, [animes])

  return (
    <AnimesContext.Provider
      value={{
        animes,
        starredAnimes,
        favAnimes,
        watchedEpisodes,
        dispatch,
      }}
    >
      {children}
    </AnimesContext.Provider>
  )
}

export const useAnimesContext = () => {
  const context = useContext(AnimesContext)
  if (context === undefined) {
    throw new Error(
      'useAnimesContext must be used within an AnimesContextProvider',
    )
  }
  return context
}
