import { useState, useEffect } from 'react'
import { useAnimesContext } from '../context/AnimesContext'

export const useStarredAnimes = () => {
  const [starredAnimes, setStarredAnimes] = useState([])
  const { starredAnimes: starredAnimesIds } = useAnimesContext()
  //const starredAnimesIds = animes.starredAnimes
  /* const starredAnimesIds = animes
    .filter(anime => anime.isStarred)
    .map(anime => anime.id) */

  useEffect(() => {
    const starredAnimesInLS = JSON.parse(localStorage.getItem('starredAnimes'))
    if (starredAnimesInLS?.length > 0 && !starredAnimesIds) {
      setStarredAnimes(starredAnimesInLS)
    } else if (starredAnimesIds) {
      setStarredAnimes(starredAnimesIds)
    }
  }, [JSON.stringify(starredAnimesIds)])

  return starredAnimes
}
