import AsyncStorage from "@react-native-async-storage/async-storage"
import { Slot, useRouter } from "expo-router"
import { useEffect } from "react"
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native"

import loginBg from "@/assets/images/login-bg.png"
import logo from "@/assets/images/logo.png"

const AuthLayout = () => {
  const router = useRouter()

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token")
      if (token) router.push("/(tabs)")
    }

    checkToken()
  }, [router])

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        className="flex-1 bg-white"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View
          className="relative w-full"
          style={{ height: Dimensions.get("screen").height / 3 }}
        >
          <ImageBackground
            source={loginBg}
            className="size-full rounded-b-lg"
            resizeMode="stretch"
          />
          <View className="absolute left-9 top-12 z-10 gap-20 pb-16">
            <Image source={logo} className="h-20 w-16" />
            <View>
              <Text className="font-quicksand-bold text-2xl text-text">
                Seja Bem Vindo!
              </Text>
              <Text className="font-quicksand-medium text-base">
                Crie uma conta ou faça login para começar
              </Text>
            </View>
          </View>
        </View>
        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default AuthLayout
