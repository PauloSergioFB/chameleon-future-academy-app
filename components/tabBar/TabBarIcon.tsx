import { clsx } from "clsx"
import { Text, View } from "react-native"

import { colors } from "@/constants/colors"
import { TabBarIconProps } from "@/types/component"

const TabBarIcon = ({ focused, icon: Icon, title }: TabBarIconProps) => {
  return (
    <View className="mt-12 flex min-h-full min-w-20 items-center justify-center gap-1">
      <Icon size={28} color={focused ? colors.primary : colors.icon} />
      <Text
        className={clsx(
          "font-quicksand-semi-bold text-sm",
          focused ? "text-primary" : "text-placeholder",
        )}
      >
        {title}
      </Text>
    </View>
  )
}

export default TabBarIcon
