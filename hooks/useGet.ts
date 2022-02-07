import { useState, useEffect, useCallback } from 'react'
import axios, { AxiosResponse } from 'axios'

export const useGet = (url: string) => {
  const [result, setResult] = useState<AxiosResponse>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const getData = useCallback(async () => {
    try {
      setLoading(true)
      const data = await axios.get(url)
      setResult(data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setError(err)
    }
  }, [url])

  useEffect(() => {
    getData()
  }, [getData])

  return { result, loading, error }
}
