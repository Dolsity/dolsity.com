import { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
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
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const [active, setActive] = useState<string>('nav-home')

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

  useEffect(() => {
    if (!isHome) {
      setActive(location.pathname.startsWith('/contact') ? 'nav-contact' : 'nav-home')
      return
    }
    if (location.hash) {
      const match = items.find((n) => n.url === location.hash)
      if (match) setActive(match.id)
    } else {
      setActive('nav-home')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, isHome])

  const scrollToHash = useCallback((hash: string) => {
    const el = document.querySelector(hash)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      history.replaceState(null, '', hash)
    }
  }, [])

  const handleNavigate = useCallback(
    (item: iDrawerItem) => {
      if (item.url.startsWith('#')) {
        scrollToHash(item.url)
      } else {
        window.location.href = item.url
      }
      setActive(item.id)
      setOpen(false)
    },
    [scrollToHash]
  )

  return (
    <>
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
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              px: { xs: 2, sm: 3, md: 4 },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: 18, sm: 20, md: 22 },
                display: 'flex',
                alignItems: 'center',
                gap: 0.8,
                lineHeight: 1,
                userSelect: 'none',
                fontWeight: 300,
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

            <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
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
                <Box
                  component="nav"
                  aria-label="Primary"
                  sx={{ display: 'flex', gap: { xs: 0.5, md: 1 } }}
                >
                  {items.map((item) => (
                    <Button
                      key={item.id}
                      color={active === item.id ? 'inherit' : 'primary'}
                      onClick={() => handleNavigate(item)}
                      sx={{
                        cursor: 'pointer',
                        background: 'none',
                        border: 'none',
                        color: theme.palette.text.primary,
                        px: 1.25,
                        py: 0.75,
                        borderRadius: 1,
                        textTransform: 'none',
                      }}
                      aria-current={active === item.id ? 'page' : undefined}
                    >
                      {item.title}
                    </Button>
                  ))}
                </Box>
              )}
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

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
                    px: 3,
                    py: 1,
                  }}
                >
                  <IconButton
                    onClick={() => setOpen(false)}
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="close menu"
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
              {items.map((item) => (
                <ListItemButton key={item.id} onClick={() => handleNavigate(item)} sx={{ px: 2 }}>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </SwipeableDrawer>
      )}
    </>
  )
}

export default Navigator
