import { createContext, useContext, useEffect, useState } from 'react'
import { notifications } from '@mantine/notifications'
import { fetchFont, fetchFontList } from './api'

export interface Font {
  value: string
  label: string
  group: string
}

interface FontContextValue {
  isLoading: boolean
  fonts: Font[]
  currentFont: string
  setCurrentFont: React.Dispatch<React.SetStateAction<string>>
}

export const FontContext = createContext<FontContextValue | null>(null)

export function useFont() {
  return useContext(FontContext)!
}

type FontProviderProps = React.PropsWithChildren<{
  initialFont: string
}>

export function FontProvider({ initialFont, children }: FontProviderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [fonts, setFonts] = useState<Font[]>([])
  const [currentFont, setCurrentFont] = useState(initialFont)

  useEffect(() => {
    const abortController = new AbortController()
    const request = async () => {
      try {
        setIsLoading(true)
        const fonts = await fetchFontList(abortController)
        setFonts(fonts)
      } catch (err) {
        notifications.show({ message: (err as Error).message, color: 'red' })
      } finally {
        setIsLoading(false)
      }
    }

    request()
    return () => abortController.abort()
  }, [])

  useEffect(() => {
    const abortController = new AbortController()
    const request = async () => {
      try {
        setIsLoading(true)
        await fetchFont(currentFont, abortController.signal)
      } catch (err) {
        notifications.show({ message: (err as Error).message, color: 'red' })
      } finally {
        setIsLoading(false)
      }
    }

    request()
    return () => abortController.abort()
  }, [currentFont])

  return (
    <FontContext.Provider
      value={{ isLoading, fonts, currentFont, setCurrentFont }}
    >
      {children}
    </FontContext.Provider>
  )
}
