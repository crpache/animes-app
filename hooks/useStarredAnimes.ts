import { useState, useEffect } from 'react'
import { useAnimesContext } from '../context/AnimesContext'

export const useStarredAnimes = () => {
  const [starredAnimes, setStarredAnimes] = useState([])
  const { starredAnimes: starredAnimesIds } = useAnimesContext()

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
