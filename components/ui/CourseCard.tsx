import { useRouter } from "expo-router"
import { Clock } from "lucide-react-native"
import { Image, Platform, Text, TouchableOpacity, View } from "react-native"

import { Course } from "@/app/(tabs)"
import courseIcon from "@/assets/images/logo.png"
import { colors } from "@/constants/colors"

const CourseCard = ({
  item: { course_id, title, total_contents },
}: {
  item: Course
}) => {
  const router = useRouter()

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/course",
          params: { id: course_id.toString() },
        })
      }
      className="max-w-[46%] items-center justify-end gap-3 rounded-3xl bg-white px-3 py-5 shadow-md shadow-black/10"
      style={
        Platform.OS === "android"
          ? { elevation: 10, shadowColor: "#878787" }
          : {}
      }
    >
      <Image
        source={courseIcon}
        className="h-[57px] w-[45px]"
        resizeMode="contain"
      />
      <Text
        className="w-full text-center font-quicksand-bold text-lg text-text"
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
      <View className="flex-row items-center gap-1">
        <Clock size={14} color={colors.placeholder} />
        <Text className="font-quicksand-bold text-base text-placeholder">
          {total_contents * 5} min
        </Text>
      </View>

      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/course",
            params: { id: course_id.toString() },
          })
        }
      >
        <Text className="font-quicksand-bold text-base text-primary">
          Acessar
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default CourseCard
