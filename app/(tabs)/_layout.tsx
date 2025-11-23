import { useRouter } from "expo-router"
import { useContext, useEffect } from "react"

import TabBar from "@/components/tabBar"
import { AuthContext } from "@/contexts/AuthContext"

const TabsLayout = () => {
  const router = useRouter()

  const { user, loading } = useContext(AuthContext)

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/sign-in")
    }
  }, [loading, router, user])

  return <TabBar />
}

export default TabsLayout
