import { clsx } from "clsx"
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"

type CustomButtonProps = {
  title?: string
  style?: string
  textStyle?: string
  leftIcon?: React.ReactNode
  isLoading?: boolean
  onPress?: () => void
}

const CustomButton = ({
  title,
  style,
  textStyle,
  leftIcon,
  isLoading = false,
  onPress,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={clsx(
        "flex w-full flex-row justify-center gap-3 rounded-full bg-primary p-3",
        style,
      )}
    >
      {leftIcon}

      <View className="flex-row items-center justify-center">
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text
            className={clsx(
              "font-quicksand-bold text-base text-white",
              textStyle,
            )}
          >
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default CustomButton
