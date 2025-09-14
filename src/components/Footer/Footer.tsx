import { Box, Typography, Link, IconButton, Container } from '@mui/material'
import { GitHub, LinkedIn, Email, Instagram } from '@mui/icons-material'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        width: '100%',
        py: 6,
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="md">
        <Box>
          {/* Footer Links Section */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 5,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: { xs: 4, sm: 8 },
              }}
            >
              {/* Contact Me Section */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: { xs: 'auto', sm: '160px' },
                  color: 'text.primary',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                  }}
                >
                  Contact Me
                </Typography>
                <Link
                  href="https://www.instagram.com/dolsity/?hl=en"
                  target="_blank"
                  rel="nofollow noopener"
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    mb: 1,
                    '&:hover': {
                      color: 'text.disabled',
                    },
                  }}
                >
                  Instagram
                </Link>
                <Link
                  href="https://discord.com/users/795969792778698763"
                  target="_blank"
                  rel="nofollow noopener"
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    mb: 1,
                    '&:hover': {
                      color: 'text.disabled',
                    },
                  }}
                >
                  Discord
                </Link>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: { xs: 'auto', sm: '160px' },
                  color: 'text.primary',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                  }}
                >
                  Other
                </Typography>
                <Link
                  href="https://stackoverflow.com/users/20505722/dolsity"
                  target="_blank"
                  rel="nofollow noopener"
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    mb: 1,
                    '&:hover': {
                      color: 'text.disabled',
                    },
                  }}
                >
                  Stack Overflow
                </Link>
                <Link
                  href="https://github.com/dolsity"
                  target="_blank"
                  rel="nofollow noopener"
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    mb: 1,
                    '&:hover': {
                      color: 'text.disabled',
                    },
                  }}
                >
                  GitHub
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Full-width bottom row aligned to screen sides */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          px: { xs: 2, sm: 3, lg: 4 },
        }}
      >
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant="body2" sx={{ color: 'text.primary', mb: 0.5 }}>
            Dolsity © {currentYear}
          </Typography>
          <Link
            href="https://github.com/dolsity/dolsity.github.io"
            target="_blank"
            rel="nofollow noopener"
            variant="body2"
            sx={{
              color: 'text.secondary',
              textDecoration: 'underline',
              '&:hover': {
                color: 'text.disabled',
              },
            }}
          >
            Built with React & Material-UI
          </Link>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0, sm: 1 } }}>
          <IconButton
            component={Link}
            href="https://github.com/dolsity"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'text.primary' },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <GitHub />
          </IconButton>
          <IconButton
            component={Link}
            href="#"
            // target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'text.primary' },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <LinkedIn />
          </IconButton>
          <IconButton
            component={Link}
            href="mailto:dolsity17@gmail.com"
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'text.primary' },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <Email />
          </IconButton>
          <IconButton
            component={Link}
            href="https://www.instagram.com/dolsity/?hl=en"
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'text.primary' },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <Instagram />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}
