import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react"

import { getUser } from "@/lib/api"

export type AuthContextType = {
  user: User | null
  loading: boolean
  setUser: Dispatch<SetStateAction<User | null>>
}

type User = {
  fullName: string
  email: string
  whatsApp: string
  biography: string
}

export const AuthContext = createContext({} as AuthContextType)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token")

        if (token) {
          const responseData = await getUser()
          setUser({
            fullName: responseData["full_name"],
            email: responseData.email,
            whatsApp: responseData.whatsapp,
            biography: responseData.biography,
          })
        }
      } catch {
        await AsyncStorage.removeItem("token")
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
