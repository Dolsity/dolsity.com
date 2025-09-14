import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { CssBaseline, ThemeProvider, Box } from '@mui/material'

import Navigator from './components/Navigation/Navigator'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

import theme from './theme'

function TrailingSlashRedirect() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname !== '/' && location.pathname.endsWith('/')) {
      navigate(location.pathname.slice(0, -1) + location.search, { replace: true })
    }
  }, [location, navigate])

  return null
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigator />
      <TrailingSlashRedirect />
      <Box>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </ThemeProvider>
  )
}
