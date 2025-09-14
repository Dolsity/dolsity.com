import {
  Box,
  Typography,
  Link,
  Container,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import ProjectCard from '../components/Cards/ProjectCard'
import { useState } from 'react'

export default function ProjectsSection() {
  const [preview, setPreview] = useState<{ src: string; title: string } | null>(null)
  const [detail, setDetail] = useState<{ title: string; description: string } | null>(null)
  const cards: iProjectCard[] = [
    {
      title: 'Fora Bot',
      summary: 'Discover one of the most unusual economies found in a Discord Bot.',
      description:
        'Fora is a verified Discord bot serving over 100,000 users across 500+ servers, offering a one-of-a-kind economy system where users can earn, trade, and gamble their way to the top using a variety of interactive commands and features.',
      technologies: ['Python', 'Flask', 'Pillow', 'MongoDB', 'Discord API'],
      demoUrl: '',
      githubUrl: 'https://github.com/forabot',
      image: '/img/forabot.png',
    },
    {
      title: 'Spotify API',
      summary:
        'A self-hosted Spotify dashboard to display your top played artists, tracks, and more.',
      description: '',
      technologies: ['React', 'TypeScript', 'Vite', 'Material-UI', 'Spotify API'],
      demoUrl: '',
      githubUrl: 'https://github.com/dolsity/spotify-api',
      image: '/img/spotify-api.png',
    },
    {
      title: 'Link in Bio',
      summary: 'A simple link in bio website only using HTML5/CSS3.',
      technologies: ['HTML5', 'CSS3'],
      demoUrl: 'https://dolsity.com/link-in-bio',
      githubUrl: 'https://github.com/dolsity/link-in-bio',
      image: '/img/link-in-bio.png',
    },
  ]
  return (
    <Box id="projects" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="md">
        {/* PROJECT TITLES */}
        <Box sx={{ mb: 2, textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 1.5,
              color: 'text.primary',
              letterSpacing: '0.1rem',
            }}
          >
            My Work
          </Typography>
          <Typography variant="h5" sx={{ color: 'text.secondary' }}>
            Want to see more work? Check out my{' '}
            <Link
              href={'https://github.com/Dolsity?tab=repositories'}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                color: 'text.secondary',
                borderBottom: '1px dotted',
                '&:hover': { color: 'text.primary' },
              }}
            >
              GitHub
            </Link>
            .
          </Typography>
          <Grid
            container
            sx={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(18em, 1fr))',
              alignItems: 'stretch',
              my: 2,
            }}
          >
            {cards.map((project, index) => (
              <ProjectCard
                key={index}
                card={project}
                onOpenImage={(src, title) => setPreview({ src, title })}
                onOpenDetails={(title, description) => setDetail({ title, description })}
              />
            ))}
          </Grid>
          {/* Image preview dialog */}
          <Dialog
            open={Boolean(preview)}
            onClose={() => setPreview(null)}
            maxWidth="lg"
            PaperProps={{ sx: { backgroundColor: 'transparent', boxShadow: 'none' } }}
          >
            <DialogContent sx={{ p: 0 }}>
              <Box
                component="img"
                src={preview?.src}
                alt={preview?.title || ''}
                sx={{
                  maxWidth: '85vw',
                  maxHeight: '80vh',
                  display: 'block',
                  objectFit: 'contain',
                  cursor: 'zoom-out',
                  border: '1px solid #6e6759',
                }}
                onClick={() => setPreview(null)}
              />
            </DialogContent>
          </Dialog>

          {/* Full description dialog */}
          <Dialog open={Boolean(detail)} onClose={() => setDetail(null)} maxWidth="sm" fullWidth>
            <DialogTitle
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Typography variant="h6" sx={{ mr: 2 }}>
                {detail?.title}
              </Typography>
              <IconButton aria-label="close" onClick={() => setDetail(null)} size="small">
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {detail?.description}
              </Typography>
            </DialogContent>
          </Dialog>
        </Box>
      </Container>
    </Box>
  )
}
