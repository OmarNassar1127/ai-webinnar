import { createContext, useContext, useState, useCallback } from 'react'

const NavigationContext = createContext(null)

export function NavigationProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const navigateTo = useCallback((page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const value = {
    currentPage,
    setCurrentPage,
    navigateTo
  }

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}
