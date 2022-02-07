import { createContext, useContext, useReducer } from 'react'

const filtersState = {
  byFav: false,
  byStarred: false,
  searchValue: '',
}

const filtersReducer = (filters, action) => {
  switch (action.type) {
    case 'filter_favs': {
      return { ...filters, byFav: !filters.byFav }
    }
    case 'filter_starred': {
      return { ...filters, byStarred: !filters.byStarred }
    }
    case 'filter_title': {
      return { ...filters, searchValue: action.searchValue }
    }

    default: {
      return filters
    }
  }
}

const FiltersContext = createContext(null)

export const FiltersContextProvider = ({ children }) => {
  const [filters, dispatch] = useReducer(filtersReducer, filtersState)
  return (
    <FiltersContext.Provider value={{ filters, dispatch }}>
      {children}
    </FiltersContext.Provider>
  )
}

export const useFiltersContext = () => {
  const context = useContext(FiltersContext)
  if (context === 'undefined') {
    throw new Error(
      'useFiltersContext must be used within a FiltersContextProvider',
    )
  }
  return context
}
