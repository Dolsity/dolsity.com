import { Box, Typography, Link, IconButton, Container } from '@mui/material'
import { GitHub, LinkedIn, Email, Instagram } from '@mui/icons-material'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const footerItems: iFooterItem[] = [
    {
      id: 'footer-contact',
      title: 'Contact Me',
      links: [
        {
          id: 'footer-instagram',
          title: 'Instagram',
          url: 'https://www.instagram.com/dolsity/?hl=en',
        },
        {
          id: 'footer-discord',
          title: 'Discord',
          url: 'https://discord.com/users/795969792778698763',
        },
      ],
    },
    {
      id: 'footer-other',
      title: 'Other',
      links: [
        {
          id: 'footer-stackoverflow',
          title: 'Stack Overflow',
          url: 'https://stackoverflow.com/users/20505722/dolsity',
        },
        { id: 'footer-github', title: 'GitHub', url: 'https://github.com/dolsity' },
      ],
    },
  ]
  const footerIcons: iFooterIcon[] = [
    {
      id: 'footer-github-icon',
      icon: <GitHub />,
      url: 'https://github.com/dolsity',
    },
    {
      id: 'footer-linkedin-icon',
      icon: <LinkedIn />,
      url: 'https://www.linkedin.com/in/dolsity/',
    },
    {
      id: 'footer-email-icon',
      icon: <Email />,
      url: 'mailto:dolsity@example.com',
    },
    {
      id: 'footer-instagram-icon',
      icon: <Instagram />,
      url: 'https://www.instagram.com/dolsity/',
    },
  ]

  return (
    <>
      {/* FOOTER SECTION */}
      <Box
        component="footer"
        sx={{
          bgcolor: 'primary.main',
          width: '100%',
          py: { xs: 4, sm: 5, md: 6 },
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: { xs: 4, sm: 5, md: 6, lg: 7 },
            }}
          >
            {/* LINK SECTION */}
            <Box
              sx={{
                display: 'flex',
                gap: { xs: 4, sm: 6, md: 8 },
                textAlign: 'center',
              }}
            >
              {footerItems.map((section) => (
                <Box key={section.id}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      color: 'text.primary',
                    }}
                  >
                    {section.title}
                  </Typography>
                  <Box>
                    {section.links.map((link) => (
                      <Link
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="nofollow noopener"
                        variant="body2"
                        sx={{
                          display: 'block',
                          color: 'text.secondary',
                          mb: 0.5,
                          textDecoration: 'none',
                          '&:hover': {
                            color: 'text.primary',
                          },
                        }}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          {/* WEBSITE RIGHTS & SOCIAL ICONS */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              px: { xs: 2, sm: 3, lg: 4 },
            }}
          >
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="body2" sx={{ color: 'text.primary' }}>
                Dolsity © {currentYear}
              </Typography>
              <Link
                href="https://github.com/dolsity/dolsity.com"
                target="_blank"
                rel="nofollow noopener"
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'underline',
                  '&:hover': {
                    color: 'text.primary',
                  },
                }}
              >
                Built with React & Material-UI
              </Link>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0, sm: 1 } }}>
              {footerIcons.map((icon) => (
                <IconButton
                  key={icon.id}
                  aria-label={icon.id}
                  href={icon.url}
                  target="_blank"
                  rel="nofollow noopener"
                  sx={{ color: 'text.primary', '&:hover': { color: 'text.secondary' } }}
                >
                  {icon.icon}
                </IconButton>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}
