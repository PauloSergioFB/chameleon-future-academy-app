import { clsx } from "clsx"
import { useState } from "react"
import {
  KeyboardTypeOptions,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native"

type CustomInputProps = {
  label: string
  placeholder?: string
  value?: any
  onChangeText: (text: string) => void
  autoCapitalize?: TextInputProps["autoCapitalize"]
  secureTextEntry?: boolean
  keyboardType?: KeyboardTypeOptions
}

const CustomInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  autoCapitalize = "none",
  secureTextEntry = false,
  keyboardType = "default",
}: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <View className="w-full gap-1">
      <Text className={"font-quicksand-medium text-base text-text-secondary"}>
        {label}
      </Text>
      <TextInput
        className={clsx(
          "border-b-[1.5px] font-quicksand-medium text-base text-text",
          isFocused ? "border-primary" : "border-border",
        )}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  )
}

export default CustomInput
