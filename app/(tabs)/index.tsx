import { Link } from "expo-router"
import { useEffect, useState } from "react"
import { FlatList, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import CourseCard from "@/components/ui/CourseCard"
import { getCourse, getEnrollments } from "@/lib/api"

type Enrollment = {
  enrollment_id: number
  user_id: number
  course_id: number
  progress: number
  status: string
  started_at: string
  completed_at: string | null
}

export type Tag = {
  tag_id: number
  description: string
}

export type Course = {
  course_id: number
  title: string
  description: string
  author: string
  thumbnail_url: string
  created_at: string
  tags: Tag[]
  total_contents: number
}

const Home = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      setIsLoading(true)

      const enrollments = await getEnrollments()

      const loadedCourses = await Promise.all(
        enrollments.map((enrollment: Enrollment) =>
          getCourse(enrollment.course_id),
        ),
      )

      setCourses(loadedCourses)
      setIsLoading(false)
    }

    load()
  }, [])

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center gap-8 px-5 pt-4">
        <Text className="font-quicksand-bold text-xl text-text">Home</Text>
        <Text className="w-full text-start font-quicksand-bold text-xl text-text">
          Seus Cursos
        </Text>
        <FlatList
          data={courses}
          renderItem={({ item }) => <CourseCard item={item} />}
          keyExtractor={(item) => item.course_id.toString()}
          numColumns={2}
          columnWrapperClassName="gap-7"
          contentContainerClassName="gap-7 pb-32"
          ListEmptyComponent={() =>
            !isLoading && (
              <Text className="text-justify font-quicksand-semi-bold text-text">
                Você ainda não se matriculou em nenhum curso. Acesse{" "}
                <Link
                  href="/search"
                  className="font-quicksand-bold text-base text-primary"
                >
                  Buscar
                </Link>{" "}
                para encontrar algum.
              </Text>
            )
          }
        />
      </View>
    </SafeAreaView>
  )
}

export default Home
