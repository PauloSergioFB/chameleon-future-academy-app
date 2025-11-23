import AsyncStorage from "@react-native-async-storage/async-storage"
import axios, { AxiosRequestConfig } from "axios"

import { SignInFormSchema, SignUpFormSchema } from "@/types"

const BASE_URL = "http://paulosergiofb.com.br:8080/api/v1"

export const apiFetch = async (
  path: string,
  options: AxiosRequestConfig = {},
  includeToken: boolean = true,
) => {
  const token = includeToken ? await AsyncStorage.getItem("token") : null

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  }

  const response = await axios({
    url: BASE_URL + path,
    method: options.method || "GET",
    data: options.data,
    headers,
    ...options,
  })

  if (response.status === 204) return null
  return response.data
}

export const createUser = async (data: SignUpFormSchema) => {
  return apiFetch(
    "/users",
    {
      method: "POST",
      data: {
        full_name: data.fullName,
        email: data.email,
        password: data.password,
      },
    },
    false,
  )
}

export const authUser = async (data: SignInFormSchema) => {
  return apiFetch(
    "/auth",
    {
      method: "POST",
      data,
    },
    false,
  )
}

export const getUser = async () => {
  return apiFetch("/users/me")
}
