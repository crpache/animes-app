import { useEffect, useState } from 'react'
import { Anime } from '../types'
import defaultImg from '/public/default-profile.jpeg'
import axios from 'axios'

const formatCharacter = characterData => ({
  id: characterData.id,
  name: characterData.attributes.name,
  image: characterData.attributes.image?.original || defaultImg,
})

export const useCharacters = (anime: Anime) => {
  const [characters, setCharacters] = useState([])
  const getCharacters = async () => {
    if (anime) {
      const charactersData = await axios.get(anime.characters)
      const urls = charactersData?.data.data.map(
        char => `${char.links.self}/character`,
      )
      const result = await Promise.all(urls.map(url => axios.get(url)))
      const characters = result?.map(res => formatCharacter(res?.data.data))
      setCharacters(characters)
    }
  }

  useEffect(() => {
    getCharacters()
  }, [anime])

  return characters
}
