import { useLocalSearchParams, useRouter } from "expo-router"
import { Search } from "lucide-react-native"
import { useState } from "react"
import { TextInput, TouchableOpacity, View } from "react-native"

import { colors } from "@/constants/colors"

const SearchBar = () => {
  const router = useRouter()

  const params = useLocalSearchParams<{ query?: string }>()
  const [query, setQuery] = useState(params.query)

  const handleSearch = (text: string) => {
    setQuery(text)

    if (!text) router.setParams({ query: undefined })
  }

  const handleSubmit = () => {
    if (query?.trim()) router.setParams({ query })
  }

  return (
    <View className="my-5 gap-5">
      <View className="flex w-full flex-row items-center justify-center gap-5 rounded-full bg-white font-quicksand-medium text-text shadow-md shadow-black/10">
        <TextInput
          className="flex-1 p-5"
          placeholder="Busque por título, autor ou tag"
          value={query}
          onChangeText={handleSearch}
          onSubmitEditing={handleSubmit}
          placeholderTextColor={colors.placeholder}
          returnKeyType="search"
        />
        <TouchableOpacity
          className="pr-5"
          onPress={() => router.setParams({ query })}
        >
          <Search size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default SearchBar
