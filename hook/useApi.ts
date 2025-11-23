import { useCallback, useEffect, useState } from "react"

interface UseApiProps<T, P extends Record<string, string | number>> {
  fn: (params: P) => Promise<T>
  params?: P
  skip?: boolean
}

type UseApiReturn<T, P> = {
  data: T | null
  loading: boolean
  errors: Record<string, string> | null
  refetch: (newParams?: P) => Promise<void>
}

export function useApi<T, P extends Record<string, string | number>>({
  fn,
  params = {} as P,
  skip = false,
}: UseApiProps<T, P>): UseApiReturn<T, P> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(!skip)
  const [errors, setErrors] = useState<Record<string, any> | null>(null)

  const fetchData = useCallback(
    async (callParams: P) => {
      setLoading(true)
      setErrors(null)

      try {
        const result = await fn(callParams)
        setData(result)
      } catch (err: any) {
        const status = err?.response?.status
        const raw = err?.response?.data

        let msg = "Erro inesperado. Tente novamente."

        switch (status) {
          case 400:
            msg = raw?.detail || "Dados inválidos. Verifique os campos."
            break

          case 401:
            msg = "Credenciais inválidas. Verifique seu e-mail e senha."
            break

          case 403:
            msg = "Você não tem permissão para realizar esta ação."
            break

          case 404:
            msg = raw?.error || "Recurso não encontrado."
            break

          case 409:
            msg = raw?.detail || "Conflito: este recurso já existe."
            break

          case 422:
            msg = raw?.detail || "Dados não puderam ser processados."
            break

          case 500:
            msg = "Erro interno no servidor. Tente novamente mais tarde."
            break

          default:
            msg = raw?.detail || raw?.message || err.message || msg
            break
        }

        setErrors({ error: msg })
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
