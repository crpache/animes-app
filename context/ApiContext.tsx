import { useState, createContext, useContext } from 'react'
import { BASE_URL } from '../constants/endpoints'

const ApiContext = createContext(null)

export const ApiContextProvider = ({ children }) => {
  const [page, setPage] = useState(BASE_URL)
  return (
    <ApiContext.Provider value={{ page, setPage }}>
      {children}
    </ApiContext.Provider>
  )
}

export const useApiContext = () => {
  const context = useContext(ApiContext)
  if (context === 'undefined') {
    throw new Error('useApiContext must be used within an ApiContextProvider')
  }
  return context
}
