import { useAnimesContext } from '../context/AnimesContext'
import { Anime } from '../types'

export const useAnime = (animeId: string) => {
  const { animes } = useAnimesContext()
  const selectedAnime = animes.find((anime: Anime) => anime.id === animeId)
  return selectedAnime
}
