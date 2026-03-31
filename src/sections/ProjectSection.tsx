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
  CircularProgress,
  Backdrop,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { Close, ArrowBackIosNew, ArrowForwardIos, Info } from '@mui/icons-material'
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
    features: [
      'Multi-server economy system with earning and trading',
      'Custom user profiles with achievements and exclusive badges',
      'Real-time global leaderboards and statistics',
      'User-friendly website for bot management and stats',
      'Hundreds of interactive commands and mini-games',
      'Robust admin and moderation tools',
    ],
    technologies: ['Python', 'Flask', 'Pillow', 'MongoDB', 'Discord API'],
    demoUrl: '',
    githubUrl: 'https://github.com/forabot',
    image: '/img/forabot.png',
  },
  {
    title: 'Spotify API Dashboard',
    summary:
      'A self-hosted Spotify dashboard to display your top played artists, tracks, and more.',
    description:
      'A self-hosted Spotify dashboard that provides insights into your Spotify listening habits from the last 4 weeks, 6 months, and of all time.',
    features: [
      'View your top 100 artists and tracks',
      'Recent listening history',
      'Artist, album, and track pages with extensive details',
      'Self-hosted and privacy-focused',
      'Responsive design for all devices',
    ],
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
    description:
      'A clean, responsive link-in-bio solution that showcases social media profiles and important links in one place.',
    features: ['Easy to customize', 'Lightweight and fast', 'Responsive design for all devices'],
    technologies: ['HTML5', 'CSS3'],
    demoUrl: 'https://dolsity.github.io/link-in-bio',
    githubUrl: 'https://github.com/dolsity/link-in-bio',
    image: '/img/link-in-bio.png',
  },
]

type ImgLike = string | { src: string }

const normalizeImages = (image?: ImgLike | ImgLike[]): string[] => {
  if (!image) return []
  if (Array.isArray(image)) return image.map((i) => (typeof i === 'string' ? i : i.src))
  return [typeof image === 'string' ? image : image.src]
}

export default function ProjectsSection() {
  const [preview, setPreview] = useState<PreviewState | null>(null)
  const [detail, setDetail] = useState<{
    title: string
    description: string
    features: string[]
  } | null>(null)
  const [imageLoading, setImageLoading] = useState(false)

  const openImage = useCallback(
    (src: string, title: string, projectImage?: iProjectCard['image']) => {
      const images = normalizeImages(projectImage)
      const idx = images.indexOf(src)
      setImageLoading(true)
      setPreview({
        src,
        title,
        images,
        index: idx >= 0 ? idx : 0,
      })
    },
    []
  )

  const handlePrev = useCallback(() => {
    setImageLoading(true)
    setPreview((p) => {
      if (!p) return p
      const nextIdx = (p.index - 1 + p.images.length) % p.images.length
      return { ...p, index: nextIdx, src: p.images[nextIdx] }
    })
  }, [])

  const handleNext = useCallback(() => {
    setImageLoading(true)
    setPreview((p) => {
      if (!p) return p
      const nextIdx = (p.index + 1) % p.images.length
      return { ...p, index: nextIdx, src: p.images[nextIdx] }
    })
  }, [])

  const handleClosePreview = useCallback(() => {
    setPreview(null)
    setImageLoading(false)
  }, [])

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
                onOpenDetails={(title, description) =>
                  setDetail({ title, description, features: project.features || [] })
                }
              />
            ))}
          </Grid>

          {/* PROJECT IMAGE DIALOG */}
          <Dialog
            open={Boolean(preview)}
            onClose={handleClosePreview}
            maxWidth="md"
            BackdropProps={{
              sx: {
                bgcolor: '#0000008f',
                backdropFilter: 'blur(4px)',
              },
            }}
            PaperProps={{
              sx: {
                bgcolor: 'transparent',
                boxShadow: 'none',
                border: 0.5,
                borderColor: 'common.white',
                width: '100%',
                maxHeight: 'fit-content',
                overflow: 'hidden',
              },
            }}
          >
            <DialogContent sx={{ userSelect: 'none', p: 0, position: 'relative' }}>
              {/* LOADING OVERLAY */}
              {imageLoading && (
                <Backdrop open sx={{ position: 'absolute', zIndex: 10 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress size={60} sx={{ color: 'common.white', mb: 2 }} />
                    <Typography variant="body2" color="text.primary">
                      Loading image...
                    </Typography>
                  </Box>
                </Backdrop>
              )}

              {/* IMAGE CONTAINER */}
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  maxWidth: '100%',
                  height: '100%',
                  overflow: 'hidden',
                }}
              >
                <Box
                  key={`${preview?.src}-${preview?.index}`}
                  component="img"
                  src={preview?.images?.[preview.index ?? 0] ?? preview?.src}
                  alt={preview?.title || ''}
                  sx={{
                    display: 'block',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    cursor: 'zoom-out',
                    opacity: imageLoading ? 0 : 1,
                    transition: 'all 0.3s ease',
                    borderRadius: 1,
                  }}
                  onClick={handleClosePreview}
                  onLoad={() => setImageLoading(false)}
                  onError={() => setImageLoading(false)}
                />

                {/* CONTROL BUTTONS */}
                <Box
                  sx={{
                    position: 'absolute',
                    display: 'flex',
                    top: { xs: 5, sm: 10, md: 15 },
                    right: { xs: 5, sm: 10, md: 15 },
                    gap: { xs: 0.3, sm: 0.5 },
                    bgcolor: '#00000090',
                    border: 0.5,
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: { xs: 0, sm: 0.5 },
                  }}
                >
                  <Tooltip title="Close">
                    <IconButton
                      onClick={handleClosePreview}
                      size="small"
                      sx={{ color: 'common.white' }}
                    >
                      <Close />
                    </IconButton>
                  </Tooltip>
                </Box>

                {/* IMAGE COUNTER AND INFO */}
                {preview?.images && preview.images.length > 1 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: { xs: 5, sm: 10, md: 15 },
                      left: '50%',
                      transform: 'translateX(-50%)',
                      bgcolor: '#00000090',
                      border: 0.5,
                      borderColor: 'divider',
                      borderRadius: 1,
                      px: { xs: 1, sm: 1.5, md: 2 },
                      py: { xs: 0.5, sm: 0.75, md: 1 },
                    }}
                  >
                    <Typography variant="body2" color="text.primary">
                      {preview.index + 1} / {preview.images.length}
                    </Typography>
                  </Box>
                )}

                {/* NAVIGATION BUTTONS */}
                {preview?.images && preview.images.length > 1 && (
                  <>
                    <Tooltip title="Previous">
                      <IconButton
                        onClick={handlePrev}
                        sx={{
                          position: 'absolute',
                          left: { xs: 5, sm: 10, md: 15 },
                          top: '50%',
                          transform: 'translateY(-50%)',
                          bgcolor: '#00000090',
                          border: 0.5,
                          borderColor: 'divider',
                          color: 'text.primary',
                          '&:hover': { bgcolor: '#000000bb' },
                          width: { xs: 32, sm: 36, md: 40 },
                          height: { xs: 60, sm: 64, md: 70 },
                          borderRadius: 1,
                        }}
                      >
                        <ArrowBackIosNew />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Next">
                      <IconButton
                        onClick={handleNext}
                        sx={{
                          position: 'absolute',
                          right: { xs: 5, sm: 10, md: 15 },
                          top: '50%',
                          transform: 'translateY(-50%)',
                          bgcolor: '#00000090',
                          border: 0.5,
                          borderColor: 'divider',
                          color: 'text.primary',
                          '&:hover': { bgcolor: '#000000bb' },
                          width: { xs: 32, sm: 36, md: 40 },
                          height: { xs: 60, sm: 64, md: 70 },
                          borderRadius: 1,
                        }}
                      >
                        <ArrowForwardIos />
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
                py: 1.5,
                px: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Info color="primary" />
                <Typography variant="h6">{detail?.title}</Typography>
              </Box>
              <IconButton aria-label="close" onClick={() => setDetail(null)} size="small">
                <Close />
              </IconButton>
            </DialogTitle>

            <DialogContent
              sx={{
                bgcolor: 'background.paper',
                p: 2,
                lineHeight: 1.7,
                maxHeight: '70vh',
                overflowY: 'auto',
              }}
            >
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', py: 2 }}>
                {detail?.description}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Key Features:
              </Typography>
              <List sx={{ listStyleType: 'disc', pl: 3, py: 0 }}>
                {detail?.features.map((feature, index) => (
                  <ListItem key={index} sx={{ p: 0, display: 'list-item' }}>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
            </DialogContent>
          </Dialog>
        </Box>
      </Container>
    </Box>
  )
}
