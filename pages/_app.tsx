import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import {
  AnimesContextProvider,
  useAnimesContext,
} from '../context/AnimesContext'
import { ApiContextProvider } from '../context/ApiContext'
import { FiltersContextProvider } from '../context/FiltersContext'
import { useStarredAnimes } from '../hooks/useStarredAnimes'
import { useFavAnimes } from '../hooks/useFavsAnimes'
import { useWatchedEpisodes } from '../hooks/useWatchedEpisodes'

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const { animes, dispatch } = useAnimesContext()
  const starredAnimes = useStarredAnimes()
  const favsAnimes = useFavAnimes()
  const watchedEpisodes = useWatchedEpisodes()

  useEffect(() => {
    //update localstorage with current animes state
    if (animes.length > 0) localStorage.setItem('saved', JSON.stringify(animes))
  }, [animes])

  useEffect(() => {
    //update the current state with localstorage
    if (JSON.parse(localStorage.getItem('saved'))) {
      dispatch({
        type: 'set_initial_animes',
        animes: JSON.parse(localStorage.getItem('saved')),
      })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('starredAnimes', JSON.stringify(starredAnimes))
  }, [starredAnimes])

  useEffect(() => {
    localStorage.setItem('favAnimes', JSON.stringify(favsAnimes))
  }, [favsAnimes])

  useEffect(() => {
    localStorage.setItem('watchedEpisodes', JSON.stringify(watchedEpisodes))
  }, [watchedEpisodes])

  return <Component {...pageProps} router={router} />
}

const AppWithProviders = ({ Component, pageProps, router }: AppProps) => (
  <ApiContextProvider>
    <AnimesContextProvider>
      <FiltersContextProvider>
        <MyApp Component={Component} pageProps={pageProps} router={router} />
      </FiltersContextProvider>
    </AnimesContextProvider>
  </ApiContextProvider>
)

export default AppWithProviders
