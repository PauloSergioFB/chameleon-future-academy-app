import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"
import { LogOut } from "lucide-react-native"
import { View } from "react-native"

import CustomButton from "@/components/ui/CustomButton"
import { colors } from "@/constants/colors"

const Profile = () => {
  const router = useRouter()

  return (
    <View className="flex-1 items-center justify-center px-5">
      <CustomButton
        title="Sair"
        leftIcon={<LogOut size={24} color={colors.error} />}
        style="!bg-error/10 border border-error"
        textStyle="!text-error"
        onPress={() => {
          AsyncStorage.removeItem("token")
          router.replace("/sign-in")
        }}
      />
    </View>
  )
}

export default Profile
