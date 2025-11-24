import { zodResolver } from "@hookform/resolvers/zod"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Link, useRouter } from "expo-router"
import { useContext, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Text, View } from "react-native"

import SignUpError from "@/components/signUp/SignUpError"
import CustomButton from "@/components/ui/CustomButton"
import CustomInput from "@/components/ui/CustomInput"
import Dialog from "@/components/ui/Dialog"
import ToggleNav from "@/components/ui/ToggleNav"
import { AuthContext } from "@/contexts/AuthContext"
import { authUser, createUser, getUser } from "@/lib/api"
import { signUpForm } from "@/schemas/SignUpSchema"
import { SignUpFormSchema } from "@/types"

const SignUp = () => {
  const router = useRouter()

  const { control, handleSubmit } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpForm),
  })

  const { setUser } = useContext(AuthContext)

  const [error, setError] = useState<string | null>(null)
  const [showError, setShowError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data: SignUpFormSchema) => {
    setIsSubmitting(true)

    try {
      await createUser(data)

      const { token } = await authUser({
        email: data.email,
        password: data.password,
      })

      await AsyncStorage.setItem("token", token)

      setUser(await getUser())
      router.replace("/(tabs)")
    } catch (error: any) {
      if (error?.response?.status === 400) {
        const firstKey = Object.keys(error.response.data)[0]

        setError(error.response.data[firstKey])
        setShowError(true)
      } else {
        setError("Ocorreu um erro interno. Tente novamente mais tarde")
      }

      setShowError(true)
    }

    setIsSubmitting(false)
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
        <ToggleNav page="sign-up" />
        <Controller
          control={control}
          name="fullName"
          render={({ field }) => (
            <CustomInput
              label="Nome Completo"
              placeholder="Digite seu nome"
              value={field.value}
              onChangeText={field.onChange}
              autoCapitalize="words"
              keyboardType="default"
            />
          )}
        />
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
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <CustomInput
              label="Confirmar senha"
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
          title="Cadastrar-se"
          isLoading={isSubmitting}
          onPress={handleSubmit(onSubmit, onError)}
        />
        <View className="mt-5 flex flex-row justify-center gap-2">
          <Text className="font-quicksand text-base text-text-secondary">
            Já possui uma conta?
          </Text>
          <Link
            href="/sign-in"
            className="font-quicksand-bold text-base text-primary"
          >
            Login
          </Link>
        </View>
      </View>
      <Dialog visible={showError} onClose={() => setShowError(false)}>
        <SignUpError
          message={error ?? ""}
          onClose={() => setShowError(false)}
        />
      </Dialog>
    </View>
  )
}

export default SignUp
