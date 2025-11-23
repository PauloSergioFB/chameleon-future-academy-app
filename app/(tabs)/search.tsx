import { useLocalSearchParams } from "expo-router"
import { useEffect } from "react"
import { FlatList, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import SearchBar from "@/components/courses/SearchBar"
import CourseCard from "@/components/ui/CourseCard"
import { useApi } from "@/hook/useApi"
import { getCourses } from "@/lib/api"

const Search = () => {
  const { query } = useLocalSearchParams<{
    query: string
  }>()

  const { data, loading, refetch } = useApi({
    fn: getCourses,
    params: { query, page: 0, size: 20 },
  })

  useEffect(() => {
    refetch({ query, page: 0, size: 20 })
  }, [query])

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center gap-8 px-5 pt-4">
        <Text className="font-quicksand-bold text-xl text-text">Cursos</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => <CourseCard item={item} />}
          keyExtractor={(item) => item.course_id.toString()}
          numColumns={2}
          columnWrapperClassName="gap-7"
          contentContainerClassName="gap-7 pb-32"
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => <SearchBar />}
          ListEmptyComponent={() =>
            !loading && (
              <Text className="text-justify font-quicksand-semi-bold text-text">
                Nenhum curso foi criado ainda. Volte novamente no futuro para
                ver as novidades.
              </Text>
            )
          }
        />
      </View>
    </SafeAreaView>
  )
}

export default Search
