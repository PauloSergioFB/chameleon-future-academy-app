import { CircleX } from "lucide-react-native"
import { Text, View } from "react-native"

import CustomButton from "../ui/CustomButton"
import { colors } from "@/constants/colors"

type SignInErrorProps = {
  message: string
  onClose: () => void
}

const SignInError = ({ message, onClose }: SignInErrorProps) => {
  return (
    <View className="gap-8 rounded-2xl bg-white p-8">
      <View className="items-center gap-3">
        <CircleX size={78} strokeWidth={2} color={colors.error} />
        <Text className="text-center font-quicksand-medium text-lg text-error">
          {message}
        </Text>
      </View>
      <CustomButton
        title="Fechar"
        onPress={onClose}
        style="!bg-error !w-full"
      />
    </View>
  )
}

export default SignInError
