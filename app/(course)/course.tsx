import { useLocalSearchParams, useRouter } from "expo-router"
import { ArrowLeft } from "lucide-react-native"
import { useContext, useEffect, useState } from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Tag } from "../(tabs)"
import badgeImage from "@/assets/images/badge.png"
import CustomButton from "@/components/ui/CustomButton"
import { colors } from "@/constants/colors"
import { AuthContext } from "@/contexts/AuthContext"
import { createEnrollment, getCourseDetails } from "@/lib/api"

export type Badge = {
  badge_id: number
  course_id: number
  title: string
  icon_url: string
}

export type CourseContent = {
  content_id: number
  course_id: number
  type: "lesson" | "activity"
  position: number
}

export type CourseDetails = {
  course_id: number
  title: string
  description: string
  author: string
  thumbnail_url: string
  created_at: string
  tags: Tag[]
  badges: Badge[]
  total_contents: number
  contents: CourseContent[]
}

const Course = () => {
  const router = useRouter()

  const { user } = useContext(AuthContext)

  const { id } = useLocalSearchParams<{ id: string }>()
  const [course, setCourse] = useState<CourseDetails | null>(null)

  useEffect(() => {
    const loadCourse = async () => {
      if (!id) return

      const courseId = Number(id)
      const data = await getCourseDetails(courseId)
      setCourse(data)
    }

    loadCourse()
  }, [id])

  if (!course || !user) return null

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-5 pt-4"
        contentContainerClassName="gap-10"
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center gap-2"
        >
          <ArrowLeft size={24} color={colors.text} />
          <Text className="font-quicksand-bold text-xl text-text">Voltar</Text>
        </TouchableOpacity>
        <View className="items-center gap-5">
          <View className="items-center">
            <Text className="font-quicksand-bold text-xl text-text">
              {course.title}
            </Text>
            <Text className="font-quicksand-bold text-placeholder">
              Por: {course.author}
            </Text>
          </View>
          <View className="w-full">
            <Text className="font-quicksand-semi-bold text-sm text-text">
              {course.total_contents} Conteúdos
            </Text>
            <Text className="font-quicksand-semi-bold text-sm text-text">
              Duração: {course.total_contents ? course.total_contents * 5 : 0}{" "}
              min
            </Text>
          </View>
          <View className="w-full flex-1 gap-2">
            <Text className="font-quicksand-semi-bold text-lg text-text">
              Descrição
            </Text>
            <Text className="text-justify font-quicksand-medium text-text">
              {course.description}
            </Text>
          </View>
          <View className="w-full items-center">
            <Text className="w-full font-quicksand-semi-bold text-lg text-text">
              Recompensas
            </Text>
            {course.badges ? (
              course.badges.map((badge) => (
                <View key={badge.badge_id} className="items-center gap-1">
                  <Image
                    source={badgeImage}
                    className="size-9 rounded-b-lg"
                    resizeMode="stretch"
                  />
                  <Text className="font-quicksand-medium text-base">
                    {badge.title}
                  </Text>
                </View>
              ))
            ) : (
              <Text className="py-4 font-quicksand-medium text-base">
                Este curso não tem nenhuma badge
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
      <View className="bg-white p-5">
        <CustomButton
          onPress={() => {
            try {
              createEnrollment(user.userId, course.course_id)
            } catch (error: any) {
              console.log(error?.response)
            }

            const firstContent = course.contents[0]
            if (firstContent.type === "lesson") {
              router.push({
                pathname: "/(course)/lesson",
                params: {
                  courseId: id,
                  contentId: firstContent.content_id.toString(),
                },
              })
            } else {
              router.push({
                pathname: "/(course)/activity",
                params: {
                  courseId: id,
                  contentId: firstContent.content_id.toString(),
                },
              })
            }
          }}
          title="Matricular-se"
        />
      </View>
    </SafeAreaView>
  )
}

export default Course
