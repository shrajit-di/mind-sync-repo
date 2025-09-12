"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  isAnonymous: boolean
  coins: number
  createdAt: Date
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => void
  createAnonymousSession: () => void
  addCoins: (amount: number, activity: string) => void
  spendCoins: (amount: number) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = () => {
      const savedUser = localStorage.getItem("mind-sync-user")
      const anonymousUser = sessionStorage.getItem("mind-sync-anonymous")

      if (savedUser) {
        setUser(JSON.parse(savedUser))
      } else if (anonymousUser) {
        setUser(JSON.parse(anonymousUser))
      }
      setIsLoading(false)
    }

    checkSession()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        isAnonymous: false,
        coins: 100, // Welcome bonus
        createdAt: new Date(),
      }

      setUser(newUser)
      localStorage.setItem("mind-sync-user", JSON.stringify(newUser))
    } catch (error) {
      throw new Error("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        isAnonymous: false,
        coins: 100, // Welcome bonus
        createdAt: new Date(),
      }

      setUser(newUser)
      localStorage.setItem("mind-sync-user", JSON.stringify(newUser))
    } catch (error) {
      throw new Error("Signup failed")
    } finally {
      setIsLoading(false)
    }
  }

  const createAnonymousSession = () => {
    const anonymousUser: User = {
      id: `anon_${Math.random().toString(36).substr(2, 9)}`,
      email: "",
      isAnonymous: true,
      coins: 0,
      createdAt: new Date(),
    }

    setUser(anonymousUser)
    sessionStorage.setItem("mind-sync-anonymous", JSON.stringify(anonymousUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("mind-sync-user")
    sessionStorage.removeItem("mind-sync-anonymous")
  }

  const addCoins = (amount: number, activity: string) => {
    if (!user || user.isAnonymous) return

    const updatedUser = { ...user, coins: user.coins + amount }
    setUser(updatedUser)
    localStorage.setItem("mind-sync-user", JSON.stringify(updatedUser))

    // In a real app, this would also send to the backend
    console.log(`Added ${amount} coins for: ${activity}`)
  }

  const spendCoins = (amount: number): boolean => {
    if (!user || user.isAnonymous || user.coins < amount) return false

    const updatedUser = { ...user, coins: user.coins - amount }
    setUser(updatedUser)
    localStorage.setItem("mind-sync-user", JSON.stringify(updatedUser))

    return true
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        createAnonymousSession,
        addCoins,
        spendCoins,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
