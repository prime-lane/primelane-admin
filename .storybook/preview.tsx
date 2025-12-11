import type { Preview } from '@storybook/react-vite'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { theme } from '../src/theme'
import { withThemeFromJSXProvider } from '@storybook/addon-themes'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme= { theme } >
      <CssBaseline />
      < Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;