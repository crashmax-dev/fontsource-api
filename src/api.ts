import { capitalize, fetcher } from 'zero-dependency'
import type { Font } from './fonts'

interface FontMeta {
  family: string
  styles: string[]
  subsets: string[]
  defSubset: string
  variants: {
    '400': {
      [fontStyle: string]: {
        [defSubset: string]: { url: { woff2: string } }
      }
    }
  }
}

export async function fetchFont(font: string, signal?: AbortSignal) {
  for (const fontFace of document.fonts.values()) {
    if (fontFace.family === font) {
      return
    }
  }

  const response = await fetcher<FontMeta>(
    `https://api.fontsource.org/v1/fonts/${font}`,
    { signal }
  )
  const fontStyle = response.styles.includes('normal') ? 'normal' : 'italic'

  for (const subset of response.subsets) {
    if (subset === 'latin' || subset === 'cyrillic') {
      const fontSource = `url(${response.variants['400'][fontStyle][subset].url.woff2})`
      const fontFace = new FontFace(font, fontSource)
      document.fonts.add(fontFace)
      await fontFace.load()
    }
  }
}

export async function fetchFontList(signal?: AbortController) {
  const response = await fetcher<Record<string, string>>(
    'https://api.fontsource.org/fontlist'
  )

  const fonts = Object.entries(response)
    // filterting Noto Fonts
    .filter(([font]) => !font.startsWith('noto-'))
    .map<Font>(([font, group]) => {
      const label = font
        .split('-')
        .map((v) => capitalize(v))
        .join(' ')

      return {
        label,
        value: font,
        group: capitalize(group)
      }
    })

  return fonts
}
