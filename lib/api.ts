import AsyncStorage from "@react-native-async-storage/async-storage"
import axios, { AxiosRequestConfig } from "axios"

import { SignInFormSchema, SignUpFormSchema } from "@/types"

type GetCoursesParams = {
  query: string
  page: number
  size: number
}

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

export const getEnrollments = async () => {
  return apiFetch("/users/me/enrollments")
}

export const getCourse = async (id: number) => {
  return apiFetch("/courses/" + id)
}

export const getCourseDetails = async (id: number) => {
  return apiFetch("/courses/" + id + "/details")
}

export const getCourses = async ({
  query,
  page = 0,
  size = 20,
}: GetCoursesParams) => {
  const params = new URLSearchParams()

  if (query && query.trim().length > 0) {
    params.append("query", query)
  }

  params.append("page", String(page))
  params.append("size", String(size))

  return apiFetch(`/courses/search?${params.toString()}`)
}

export const createEnrollment = async (userId: number, courseId: number) => {
  try {
    return apiFetch("/enrollments", {
      method: "POST",
      data: {
        user_id: userId,
        course_id: courseId,
        progress: 0,
        status: "in progress",
      },
    })
  } catch (error: any) {
    console.log("Falha ao matricular usuario", userId, courseId)
    console.log(error?.response)
  }
}

export const getLesson = async (contentId: number) => {
  return apiFetch(`/contents/${contentId}/lesson`)
}
