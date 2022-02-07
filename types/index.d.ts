export type Anime = {
  id: string
  slug: string
  canonicalTitle: string
  posterImage: string
  averageRating: number
  favoritesCount: number
  synopsis: string
  userCount: number
  ratingRank: number
  ageRating: string
  ageRatingGuide: string
  startDate: string
  endDate: string
  status: string
  showType: string
  characters: string
  episodesUrl: string
  episodes: string[]
  watchedEpisodes: string[]
  isFav: boolean
  isStarred: boolean
}

export type Character = {
  id: number
  name: string
  image: string
}

export type Episode = {
  id: string
  title: string
  synopsis: string
  airDate: string
  number: number
}
