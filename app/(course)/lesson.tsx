import { useLocalSearchParams, useRouter } from "expo-router"
import { ArrowLeft } from "lucide-react-native"
import { useEffect, useState } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { CourseDetails } from "./course"
import CustomButton from "@/components/ui/CustomButton"
import { colors } from "@/constants/colors"
import { getCourseDetails, getLesson } from "@/lib/api"

type LessonData = {
  lesson_id: number
  content_id: number
  title: string
  body: string
}

const Lesson = () => {
  const router = useRouter()
  const { courseId, contentId } = useLocalSearchParams<{
    courseId: string
    contentId: string
  }>()

  const [isLoading, setIsLoading] = useState(true)
  const [course, setCourse] = useState<CourseDetails | null>(null)
  const [lesson, setLesson] = useState<LessonData | null>(null)

  useEffect(() => {
    const loadLesson = async () => {
      try {
        setIsLoading(true)

        const courseData = await getCourseDetails(Number(contentId))
        const lessonData = await getLesson(Number(courseId))
        setCourse(courseData as CourseDetails)
        setLesson(lessonData as LessonData)
      } catch (error: any) {
        console.log(error)
        router.replace("/")
      } finally {
        setIsLoading(true)
      }
    }

    loadLesson()
  }, [contentId])

  if (!isLoading) return null

  if (!lesson || !course) return null

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 gap-8 px-5 pt-4"
        contentContainerClassName="gap-10"
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full flex-row items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center gap-2"
          >
            <ArrowLeft size={24} color={colors.text} />
            <Text className="font-quicksand-semi-bold text-xl text-text">
              Voltar
            </Text>
          </TouchableOpacity>
          <Text className="ml-auto font-quicksand-semi-bold text-xl text-text">
            {course.contents.find(
              (item) => item.content_id === Number(contentId),
            )?.position ?? "?"}
            /{course.total_contents}
          </Text>
        </View>

        <Text className="w-full text-center font-quicksand-bold text-xl text-text">
          {lesson.title}
        </Text>

        <Text className="w-full text-center font-quicksand-medium text-base text-text">
          {lesson.body}
        </Text>
      </ScrollView>
      <View className="bg-white p-5">
        <CustomButton
          title="Continuar"
          onPress={() => {
            const currentContent = course.contents.find(
              (item) => item.content_id === Number(contentId),
            )

            if (!currentContent) {
              console.log("Não foi possível definir o conteúdo atual")
              return router.push("/")
            }

            const nextPosition = currentContent.position + 1
            const nextContent = course.contents.find(
              (item) => item.position === nextPosition,
            )

            if (!nextContent) {
              console.log("Não foi possível definir o proximo conteúdo")
              return router.push("/")
            }

            if (nextContent.type === "lesson") {
              router.replace({
                pathname: `/(course)/lesson`,
                params: {
                  courseId,
                  contentId: nextContent.content_id.toString(),
                },
              })
            } else {
              router.replace({
                pathname: `/(course)/activity`,
                params: {
                  courseId,
                  contentId: nextContent.content_id.toString(),
                },
              })
            }
          }}
        />
      </View>
    </SafeAreaView>
  )
}

export default Lesson
