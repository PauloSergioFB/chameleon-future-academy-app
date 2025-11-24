import { useCallback, useEffect, useState } from "react"
import { Alert } from "react-native"

interface UseApiProps<T, P extends Record<string, string | number>> {
  fn: (params: P) => Promise<T>
  params?: P
  skip?: boolean
}

type UseApiReturn<T, P> = {
  data: any[] | null
  loading: boolean
  errors: Record<string, string> | null
  refetch: (newParams?: P) => Promise<void>
}

export function useApi<T, P extends Record<string, string | number>>({
  fn,
  params = {} as P,
  skip = false,
}: UseApiProps<T, P>): UseApiReturn<T, P> {
  const [data, setData] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(!skip)
  const [errors, setErrors] = useState<Record<string, any> | null>(null)

  const fetchData = useCallback(
    async (callParams: P) => {
      setLoading(true)
      setErrors(null)

      try {
        const result = (await fn(callParams)) as { content: any[] }
        setData(result.content)
      } catch (error: any) {
        console.log(error?.response)

        let msg = "Erro inesperado. Tente novamente."
        setErrors({ error: msg })
        Alert.alert(msg)
      } finally {
        setLoading(false)
      }
    },
    [fn],
  )

  useEffect(() => {
    if (!skip) {
      fetchData(params)
    }
  }, [])

  const refetch = async (newParams?: P) => await fetchData(newParams!)

  return { data, loading, errors, refetch }
}
