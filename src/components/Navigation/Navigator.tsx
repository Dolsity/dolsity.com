import { useState, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  AppBar,
  IconButton,
  List,
  Toolbar,
  Typography,
  Box,
  SwipeableDrawer,
  useMediaQuery,
  useTheme,
  Container,
  Tooltip,
  Divider,
  Button,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

const Navigator = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const isHome = location.pathname === '/'

  const navItems: iDrawerItem[] = [
    { id: 'nav-home', title: 'Home', url: '#home' },
    { id: 'nav-skills', title: 'Skills', url: '#skills' },
    { id: 'nav-projects', title: 'Projects', url: '#projects' },
    { id: 'nav-contact', title: 'Contact', url: '/contact' },
  ]

  const minimalItems: iDrawerItem[] = [
    { id: 'nav-home', title: 'Home', url: '/' },
    { id: 'nav-contact', title: 'Contact', url: '/contact' },
  ]
  const items = isHome ? navItems : minimalItems

  useEffect(() => {
    if (!isMobile) setOpen(false)
  }, [isMobile])

  const scrollToHash = useCallback((hash: string) => {
    const el = document.querySelector(hash)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.replaceState(null, '', hash)
    }
  }, [])

  const handleNavigate = useCallback(
    (item: iDrawerItem) => {
      if (item.url.startsWith('#')) {
        scrollToHash(item.url)
      } else {
        navigate(item.url)
      }
      setOpen(false)
    },
    [scrollToHash, navigate]
  )

  return (
    <>
      {/* NAVIGATION BAR */}
      <AppBar
        component="nav"
        sx={{
          bgcolor: 'primary.main',
          borderBottom: 1,
          borderColor: 'divider',
        }}
        position="sticky"
        elevation={0}
      >
        <Toolbar disableGutters sx={{ justifyContent: 'center' }}>
          <Container
            maxWidth="lg"
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              px: { xs: 2, sm: 3, md: 4 },
            }}
          >
            {/* LOGO / BRAND NAME */}
            <Typography
              variant="h5"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.8,
                lineHeight: 1,
                userSelect: 'none',
                letterSpacing: 0.5,
                ':hover': { cursor: 'pointer' },
              }}
              onClick={() => handleNavigate({ id: 'nav-home', title: 'Home', url: '/' })}
            >
              <Box
                component="span"
                sx={{ fontFamily: 'monospace', fontWeight: 400, color: 'primary.contrastText' }}
              >
                &lt;
              </Box>
              <Box component="span" sx={{ fontWeight: 300 }}>
                Dolsity
              </Box>
              <Box
                component="span"
                sx={{ fontFamily: 'monospace', fontWeight: 400, color: 'primary.contrastText' }}
              >
                <Box component="span" sx={{ color: 'success.main', fontWeight: 400 }}>
                  /
                </Box>
                &gt;
              </Box>
            </Typography>
            {/* DESKTOP NAVIGATION ITEMS */}
            <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
              {/* MOBILE ICON & DESKTOP NAVIGATION BUTTONS */}
              {isMobile ? (
                <Tooltip title={open ? 'Close Menu' : 'Open Menu'} placement="left">
                  <IconButton
                    onClick={() => setOpen((o) => !o)}
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label={open ? 'close menu' : 'open menu'}
                    aria-expanded={open}
                  >
                    {open ? <CloseIcon /> : <MenuIcon />}
                  </IconButton>
                </Tooltip>
              ) : (
                <Box component="nav" aria-label="Primary" sx={{ display: 'flex', gap: 1 }}>
                  {items.map((item) => {
                    const isActive = isHome
                      ? location.hash === item.url || (!location.hash && item.id === 'nav-home')
                      : location.pathname === item.url
                    return (
                      <Button
                        key={item.id}
                        onClick={() => handleNavigate(item)}
                        sx={{
                          cursor: 'pointer',
                          background: 'none',
                          border: 'none',
                          color: 'text.primary',
                          px: 1.25,
                          py: 0.75,
                          borderRadius: 1,
                          textTransform: 'none',
                        }}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.title}
                      </Button>
                    )
                  })}
                </Box>
              )}
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      {/* MOBILE NAVIGATION MENU */}
      {isMobile && (
        <SwipeableDrawer
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          anchor="right"
        >
          <Box sx={{ width: 250, height: '100%', bgcolor: 'primary.main' }} role="presentation">
            <List
              subheader={
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: 2,
                    py: 0.5,
                  }}
                >
                  <IconButton
                    onClick={() => setOpen(false)}
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="close menu"
                    aria-expanded={open}
                    sx={{ ml: 'auto' }}
                  >
                    <Tooltip title="Close Menu" placement="left">
                      <CloseIcon />
                    </Tooltip>
                  </IconButton>
                </Box>
              }
            >
              <Divider />
              {/* MOBILE MENU ITEMS */}
              {items.map((item) => {
                const isActive = isHome
                  ? location.hash === item.url || (!location.hash && item.id === 'nav-home')
                  : location.pathname === item.url
                return (
                  <ListItemButton
                    key={item.id}
                    onClick={() => handleNavigate(item)}
                    sx={{ px: 2 }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                )
              })}
            </List>
          </Box>
        </SwipeableDrawer>
      )}
    </>
  )
}

export default Navigator
