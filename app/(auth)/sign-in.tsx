import { zodResolver } from "@hookform/resolvers/zod"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Link, useRouter } from "expo-router"
import { useContext, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Text, View } from "react-native"

import SignInError from "@/components/signIn/SignInError"
import CustomButton from "@/components/ui/CustomButton"
import CustomInput from "@/components/ui/CustomInput"
import Dialog from "@/components/ui/Dialog"
import ToggleNav from "@/components/ui/ToggleNav"
import { AuthContext } from "@/contexts/AuthContext"
import { authUser, getUser } from "@/lib/api"
import { signInForm } from "@/schemas/SignInSchema"
import { SignInFormSchema } from "@/types"

const SignIn = () => {
  const router = useRouter()

  const { control, handleSubmit } = useForm<SignInFormSchema>({
    resolver: zodResolver(signInForm),
  })

  const { setUser } = useContext(AuthContext)

  const [error, setError] = useState<string | null>(null)
  const [showError, setShowError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data: SignInFormSchema) => {
    setIsSubmitting(true)

    try {
      const response = await authUser(data)
      await AsyncStorage.setItem("token", response.token)

      setUser(await getUser())
      router.push("/(tabs)")
    } catch (error: any) {
      if (error?.response?.status === 401) {
        setError("Usuário inexistente ou senha inválida")
      } else {
        setError("Ocorreu um erro desconhecido")
      }

      setShowError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const onError = (errors: Record<string, any>) => {
    const firstKey = Object.keys(errors)[0]

    if (firstKey) {
      setError(errors[firstKey].message)
      setShowError(true)
    } else {
      setError("Algo deu errado. Tente novamente mais tarde")
      setShowError(true)
    }
    setShowError(true)
  }

  return (
    <View className="mt-5 flex-1 gap-16 rounded-lg p-5">
      <View className="flex-1 gap-10">
        <ToggleNav page="sign-in" />
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <CustomInput
              label="E-mail"
              placeholder="Digite seu email"
              value={field.value}
              onChangeText={field.onChange}
              keyboardType="email-address"
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <CustomInput
              label="Senha"
              placeholder="Digite sua senha"
              value={field.value}
              onChangeText={field.onChange}
              secureTextEntry
            />
          )}
        />
      </View>
      <View className="mb-10 gap-5">
        <CustomButton
          title="Entrar"
          isLoading={isSubmitting}
          onPress={handleSubmit(onSubmit, onError)}
        />
        <View className="mt-5 flex flex-row justify-center gap-2">
          <Text className="font-quicksand text-base text-text-secondary">
            Ainda não possui uma conta?
          </Text>
          <Link
            href="/sign-up"
            className="font-quicksand-bold text-base text-primary"
          >
            Cadastre-se
          </Link>
        </View>
      </View>
      <Dialog visible={showError} onClose={() => setShowError(false)}>
        <SignInError
          message={error ?? ""}
          onClose={() => setShowError(false)}
        />
      </Dialog>
    </View>
  )
}

export default SignIn
