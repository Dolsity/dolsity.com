import { useState, useCallback, useMemo, useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  Chip,
  Link,
  IconButton,
  Tooltip,
  CardActionArea,
  CardMedia,
  CircularProgress,
} from '@mui/material'
import { Code, Web, ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'

type StaticImageLike = { src: string }

type ProjectCardProps = {
  card: iProjectCard
  onOpenImage?: (src: string, title: string) => void
  onOpenDetails?: (title: string, description: string, features: string[]) => void
}

export default function ProjectCard({ card, onOpenImage, onOpenDetails }: ProjectCardProps) {
  // NORMALIZE IMAGES ONCE PER CARD
  const images: string[] = useMemo(() => {
    if (!card.image) return []
    if (Array.isArray(card.image))
      return card.image.map((i) => (typeof i === 'string' ? i : (i as StaticImageLike).src))
    return [typeof card.image === 'string' ? card.image : (card.image as StaticImageLike).src]
  }, [card.image])

  const [index, setIndex] = useState(0)
  const [imageLoading, setImageLoading] = useState(true)

  // CURRENT IMAGE SOURCE FOR DEPENDENCY TRACKING
  const currentImageSrc = images[index]

  // RESET LOADING STATE WHEN IMAGE SOURCE CHANGES
  useEffect(() => {
    setImageLoading(true)
  }, [currentImageSrc])

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length)
  }, [images.length])

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % images.length)
  }, [images.length])

  return (
    <Card
      sx={{
        userSelect: 'none',
        textAlign: 'center',
        m: 1.5,
        borderRadius: 1,
        border: 1,
        borderColor: 'primary.main',
        bgcolor: 'background.paper',
        boxShadow: 'none',
      }}
    >
      {/* CARD IMAGE */}
      <CardActionArea>
        {images.length ? (
          <>
            <Box sx={{ position: 'relative', height: '8rem', overflow: 'hidden' }}>
              {/* IMAGE LOADING STATE */}
              {imageLoading && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'background.paper',
                    zIndex: 1,
                  }}
                >
                  <CircularProgress size={30} />
                </Box>
              )}
              <CardMedia
                key={`${card.title}-${index}`}
                component="img"
                image={images[index]}
                alt={`${card.title} (${index + 1}/${images.length})`}
                loading="lazy"
                sx={{
                  height: '8rem',
                  position: 'relative',
                  objectFit: 'cover',
                  cursor: onOpenImage ? 'zoom-in' : 'default',
                  opacity: imageLoading ? 0 : 1,
                  transition: 'opacity 0.3s ease',
                }}
                onLoad={() => setImageLoading(false)}
                onError={(e) => {
                  setImageLoading(false)
                  // PREVENT ERROR LOOP AND HIDE FAILED IMAGE GRACEFULLY
                  const img = e.currentTarget as HTMLImageElement
                  img.onerror = null
                  img.style.display = 'none'
                }}
                onClick={() => onOpenImage && onOpenImage(images[index], card.title)}
              />
            </Box>
            {/* PROJECT CARD IMAGE PREVIEW BUTTONS */}
            {images.length > 1 && (
              <>
                <IconButton
                  aria-label="previous image"
                  size="small"
                  onClick={prev}
                  sx={{
                    position: 'absolute',
                    left: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: '#000000cc',
                    border: 0.3,
                    borderColor: 'primary.contrastText',
                    color: 'primary.contrastText',
                    '&:hover': { bgcolor: '#000000aa' },
                  }}
                >
                  <ArrowBackIosNew fontSize="small" />
                </IconButton>
                <IconButton
                  aria-label="next image"
                  size="small"
                  onClick={next}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: '#000000cc',
                    border: 0.3,
                    borderColor: 'primary.contrastText',
                    color: 'primary.contrastText',
                    '&:hover': { bgcolor: '#000000aa' },
                  }}
                >
                  <ArrowForwardIos fontSize="small" />
                </IconButton>
              </>
            )}
          </>
        ) : (
          <Box sx={{ width: '100%', height: '100%', background: 'background.paper' }} />
        )}
      </CardActionArea>

      {/* CARD TITLE */}
      <Box sx={{ bgcolor: 'secondary.main', p: 1 }}>
        <Typography variant="h6" sx={{ letterSpacing: 1 }}>
          {card.title}
        </Typography>
      </Box>

      {/* CARD CONTENT */}
      <Box
        sx={{
          p: 1,
        }}
      >
        {card.githubUrl && (
          <Tooltip title="Source Code" placement="bottom">
            <IconButton
              component="a"
              href={card.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="view source"
              sx={{ color: 'text.primary' }}
            >
              <Code />
            </IconButton>
          </Tooltip>
        )}
        {card.demoUrl && (
          <Tooltip title="Preview" placement="bottom">
            <IconButton
              component="a"
              href={card.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="open demo"
              sx={{ color: 'text.primary' }}
            >
              <Web />
            </IconButton>
          </Tooltip>
        )}
        <Box sx={{ m: 1 }}>
          {card.technologies.map((tech: string, techIndex: number) => (
            <Chip
              key={techIndex}
              label={tech}
              size="small"
              sx={{
                mr: 0.5,
                mb: 0.5,
                backgroundColor: 'transparent',
                border: 1,
                borderColor: 'primary.main',
                color: 'text.primary',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: 'text.secondary',
                  border: 1,
                  borderColor: 'background.default',
                },
              }}
            />
          ))}
        </Box>
        <Typography variant="body2" sx={{ m: 0.5, display: 'block' }}>
          {card.summary}
        </Typography>
        {card.description && (
          <Link
            component="button"
            variant="body2"
            onClick={() =>
              onOpenDetails && onOpenDetails(card.title, card.description!, card.features || [])
            }
            underline="always"
            sx={{ color: 'text.secondary', display: 'inline-block', mt: 0.5 }}
          >
            Read more
          </Link>
        )}
      </Box>
    </Card>
  )
}
