import { clsx } from "clsx"
import { useRouter } from "expo-router"
import { Text, TouchableOpacity, View } from "react-native"

const ToggleNav = ({ page }: { page: string }) => {
  const router = useRouter()

  return (
    <View className="flex-row gap-0.5 rounded-md bg-background p-1">
      <TouchableOpacity
        onPress={() => (page === "sign-in" ? null : router.push("/sign-in"))}
        className={clsx(
          "w-full flex-1 flex-row justify-center rounded-md p-3",
          page === "sign-in" ? "bg-white" : "bg-background",
        )}
      >
        <Text
          className={clsx(
            "font-quicksand-bold text-base",
            page === "sign-in" ? "text-primary" : "text-placeholder",
          )}
        >
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => (page === "sign-up" ? null : router.push("/sign-up"))}
        className={clsx(
          "w-full flex-1 flex-row justify-center rounded-md p-3",
          page === "sign-up" ? "bg-white" : "bg-background",
        )}
      >
        <Text
          className={clsx(
            "font-quicksand-bold text-base",
            page === "sign-up" ? "text-primary" : "text-placeholder",
          )}
        >
          Cadastro
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default ToggleNav
