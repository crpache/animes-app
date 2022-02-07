import defaultImg from '/public/default-profile.jpeg'

export const formatCharacter = characterData => ({
  id: characterData.id,
  name: characterData.attributes.name,
  image: characterData.attributes.image?.original || defaultImg,
})
