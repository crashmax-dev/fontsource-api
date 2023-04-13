import { Box, LoadingOverlay, Select, Text } from '@mantine/core'
import { PREVIEW_TEXT } from './constants'
import { useFont } from './fonts'

export function App() {
  const { isLoading, fonts, currentFont, setCurrentFont } = useFont()

  return (
    <Box p="lg">
      <Select
        pb="lg"
        value={currentFont}
        onChange={(value) => setCurrentFont(value!)}
        placeholder="Select font"
        data={fonts}
        searchable
      />
      <Box pos="relative">
        <LoadingOverlay
          visible={isLoading}
          overlayBlur={2}
          radius="sm"
        />
        <Text
          variant="gradient"
          gradient={{ from: 'cyan', to: 'blue', deg: 45 }}
          sx={{ fontFamily: currentFont ?? 'sans-serif' }}
          ta="center"
          fz="3rem"
          py="xs"
        >
          {PREVIEW_TEXT}
        </Text>
      </Box>
    </Box>
  )
}
