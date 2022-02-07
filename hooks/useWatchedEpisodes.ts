import { useState, useEffect } from 'react'
import { useAnimesContext } from '../context/AnimesContext'

export const useWatchedEpisodes = () => {
  const [watchedEpisodes, setWatchedEpisodes] = useState([])
  const { watchedEpisodes: watchedEpisodesIds } = useAnimesContext()
  //const watchedEpisodesIds = animes?.map(anime => anime?.watchedEpisodes).flat()

  useEffect(() => {
    const watchedEpisodesInLS = JSON.parse(
      localStorage.getItem('watchedEpisodes'),
    )
    if (watchedEpisodesInLS?.length > 0 && !watchedEpisodesIds) {
      setWatchedEpisodes(watchedEpisodesInLS)
    } else if (watchedEpisodesIds) {
      setWatchedEpisodes(watchedEpisodesIds)
    }
  }, [JSON.stringify(watchedEpisodesIds)])

  return watchedEpisodes
}
