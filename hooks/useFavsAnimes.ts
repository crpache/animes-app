import { useAnimesContext } from '../context/AnimesContext'
import { useState, useEffect } from 'react'

export const useFavAnimes = () => {
  const [favAnimes, setFavAnimes] = useState([])
  const { favAnimes: favAnimesIds } = useAnimesContext()

  useEffect(() => {
    const favAnimesInLS = JSON.parse(localStorage.getItem('favAnimes'))
    if (favAnimesInLS?.length > 0 && !favAnimesIds) {
      setFavAnimes(favAnimesInLS)
    } else if (favAnimesIds) {
      setFavAnimes(favAnimesIds)
    }
  }, [JSON.stringify(favAnimesIds)])

  return favAnimes
}
