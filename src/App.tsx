import { CssBaseline, ThemeProvider } from '@mui/material'

import Navigator from './components/Navigation/Navigator'
import theme from './theme'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigator />
    </ThemeProvider>
  )
}
