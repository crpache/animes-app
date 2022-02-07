import { useGet } from './useGet'
import { Anime, Episode } from '../types'

export const formatEpisode = episodeData => ({
  id: episodeData.id,
  title: episodeData.attributes.canonicalTitle,
  synopsis: episodeData.attributes.synopsis,
  airDate: episodeData.attributes.airdate,
  number: episodeData.attributes.number,
})

export const useEpisodes = (anime: Anime): Episode[] => {
  const { result: episodesData } = useGet(anime?.episodesUrl)
  const episodes = episodesData?.data.data.map(formatEpisode)
  return episodes
}
