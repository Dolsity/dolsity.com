import { useCallback, useState } from 'react'
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
  Tooltip,
} from '@mui/material'
import { Close, ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import ProjectCard from '../components/Cards/ProjectCard'

type PreviewState = {
  src: string
  title: string
  images: string[]
  index: number
}

// Small projects list; kept outside the component so it's not recreated on each render
const PROJECTS: iProjectCard[] = [
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
    image: [
      '/img/spotify-api.png',
      '/img/spotify-api_artist.png',
      '/img/spotify-api_track.png',
      '/img/spotify-api_album.png',
      '/img/spotify-api_recent.png',
    ],
  },
  {
    title: 'Link in Bio',
    summary: 'A simple link in bio website only using HTML5/CSS3.',
    technologies: ['HTML5', 'CSS3'],
    demoUrl: 'https://dolsity.github.io/link-in-bio',
    githubUrl: 'https://github.com/dolsity/link-in-bio',
    image: '/img/link-in-bio.png',
  },
]

type ImgLike = string | { src: string }

function normalizeImages(image?: ImgLike | ImgLike[]): string[] {
  if (!image) return []
  if (Array.isArray(image)) return image.map((i) => (typeof i === 'string' ? i : i.src))
  return [typeof image === 'string' ? image : image.src]
}

export default function ProjectsSection() {
  const [preview, setPreview] = useState<PreviewState | null>(null)
  const [detail, setDetail] = useState<{ title: string; description: string } | null>(null)

  const openImage = useCallback(
    (src: string, title: string, projectImage?: iProjectCard['image']) => {
      const images = normalizeImages(projectImage)
      const idx = images.indexOf(src)
      setPreview({ src, title, images, index: idx >= 0 ? idx : 0 })
    },
    []
  )

  const handlePrev = useCallback(() => {
    setPreview((p) => {
      if (!p) return p
      const nextIdx = (p.index - 1 + p.images.length) % p.images.length
      return { ...p, index: nextIdx, src: p.images[nextIdx] }
    })
  }, [])

  const handleNext = useCallback(() => {
    setPreview((p) => {
      if (!p) return p
      const nextIdx = (p.index + 1) % p.images.length
      return { ...p, index: nextIdx, src: p.images[nextIdx] }
    })
  }, [])

  const handleClosePreview = useCallback(() => setPreview(null), [])

  return (
    <Box id="projects" sx={{ bgcolor: 'background.default', py: 6 }}>
      <Container maxWidth="md">
        {/* PROJECT TITLES */}
        <Box sx={{ mb: 2, textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 1.5,
              color: 'text.primary',
              letterSpacing: 0.5,
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

          {/* PROJECT CARDS */}
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
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={index}
                card={project}
                onOpenImage={(src) => openImage(src, project.title, project.image)}
                onOpenDetails={(title, description) => setDetail({ title, description })}
              />
            ))}
          </Grid>

          {/* PROJECT IMAGE DIALOG */}
          <Dialog
            open={Boolean(preview)}
            onClose={handleClosePreview}
            maxWidth="lg"
            PaperProps={{
              sx: {
                backgroundColor: 'transparent',
                boxShadow: 'none',
                border: 0.5,
                borderColor: 'common.white',
              },
            }}
          >
            <DialogContent sx={{ p: 0 }}>
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  component="img"
                  src={preview?.images?.[preview.index ?? 0] ?? preview?.src}
                  alt={preview?.title || ''}
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    maxWidth: '85vw',
                    maxHeight: '80vh',
                    objectFit: 'contain',
                    cursor: 'zoom-out',
                  }}
                  onClick={handleClosePreview}
                />

                {/* MOBILE: HORIZONTAL SCROLLABLE STRIP */}
                <Box
                  sx={{
                    display: { xs: 'flex', sm: 'none' },
                    overflowX: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    gap: 1,
                    px: 1,
                  }}
                >
                  {(preview?.images ?? [preview?.src]).map((src, i) => (
                    <Box
                      key={i}
                      component="img"
                      src={src}
                      alt={preview?.title || ''}
                      loading="lazy"
                      sx={{
                        flex: '0 0 85vw',
                        maxWidth: '85vw',
                        maxHeight: '80vh',
                        display: 'block',
                        objectFit: 'contain',
                        cursor: 'zoom-out',
                      }}
                      onClick={handleClosePreview}
                    />
                  ))}
                </Box>

                {/* DESKTOP: PREV / NEXT BUTTONS INSIDE DIALOG */}
                {preview?.images && preview.images.length > 1 && (
                  <>
                    <Tooltip title="Previous Image" placement="bottom-start">
                      <IconButton
                        aria-label="previous image"
                        size="medium"
                        onClick={handlePrev}
                        sx={{
                          position: 'absolute',
                          left: 6,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          bgcolor: '#000000bb',
                          border: 0.5,
                          borderColor: 'primary.contrastText',
                          color: 'primary.contrastText',
                          '&:hover': { bgcolor: '#000000aa' },
                          width: 38,
                          height: 64,
                          borderRadius: 0,
                          display: { xs: 'none', sm: 'flex' },
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <ArrowBackIosNew fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Next Image" placement="bottom-end">
                      <IconButton
                        aria-label="next image"
                        size="medium"
                        onClick={handleNext}
                        sx={{
                          position: 'absolute',
                          right: 6,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          bgcolor: '#000000bb',
                          border: 0.5,
                          borderColor: 'primary.contrastText',
                          color: 'primary.contrastText',
                          '&:hover': { bgcolor: '#000000aa' },
                          width: 38,
                          height: 64,
                          borderRadius: 0,
                          display: { xs: 'none', sm: 'flex' },
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <ArrowForwardIos fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Close" placement="bottom-end">
                      <IconButton
                        aria-label="close"
                        size="medium"
                        onClick={handleClosePreview}
                        sx={{
                          position: 'absolute',
                          right: 6,
                          top: 6,
                          bgcolor: '#000000bb',
                          border: 0.5,
                          borderColor: 'primary.contrastText',
                          color: 'primary.contrastText',
                          '&:hover': { bgcolor: '#000000aa' },
                          borderRadius: 0,
                          display: { xs: 'none', sm: 'flex' },
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </Box>
            </DialogContent>
          </Dialog>

          {/* DESCRIPTION DIALOG */}
          <Dialog open={Boolean(detail)} onClose={() => setDetail(null)} maxWidth="sm" fullWidth>
            <DialogTitle
              sx={{
                bgcolor: 'background.default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 1.5,
              }}
            >
              <Typography variant="h6" sx={{ mx: 1.5 }}>
                {detail?.title}
              </Typography>
              <IconButton aria-label="close" onClick={() => setDetail(null)} size="small">
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ bgcolor: 'background.paper', p: 0 }}>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', px: 3, py: 2 }}>
                {detail?.description}
              </Typography>
            </DialogContent>
          </Dialog>
        </Box>
      </Container>
    </Box>
  )
}
