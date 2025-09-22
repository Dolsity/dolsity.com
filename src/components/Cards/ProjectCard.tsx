import { useState, useCallback, useMemo } from 'react'
import { Box, Typography, Card, Chip, Link, IconButton, Tooltip } from '@mui/material'
import { Code, Web, ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'

type StaticImageLike = { src: string }

type ProjectCardProps = {
  card: iProjectCard
  onOpenImage?: (src: string, title: string) => void
  onOpenDetails?: (title: string, description: string) => void
}

export default function ProjectCard({ card, onOpenImage, onOpenDetails }: ProjectCardProps) {
  // Normalize images once per card
  const images: string[] = useMemo(() => {
    if (!card.image) return []
    if (Array.isArray(card.image))
      return card.image.map((i) => (typeof i === 'string' ? i : (i as StaticImageLike).src))
    return [typeof card.image === 'string' ? card.image : (card.image as StaticImageLike).src]
  }, [card.image])

  const [index, setIndex] = useState(0)

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length]
  )
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length])

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
      }}
    >
      {/* CARD IMAGE */}
      <Box sx={{ height: '8rem', position: 'relative', overflow: 'hidden' }}>
        {images.length ? (
          <>
            <Box
              component="img"
              src={images[index]}
              alt={`${card.title} (${index + 1}/${images.length})`}
              loading="lazy"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'opacity 0.4s ease',
                opacity: 1,
                cursor: onOpenImage ? 'pointer' : 'default',
              }}
              onClick={() => onOpenImage && onOpenImage(images[index], card.title)}
              onError={(e) => {
                // Prevent error loop and hide failed image gracefully
                const img = e.currentTarget as HTMLImageElement
                img.onerror = null
                img.style.display = 'none'
              }}
            />

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
                    bgcolor: '#00000090',
                    border: 0.3,
                    borderColor: 'primary.contrastText',
                    color: 'primary.contrastText',
                    '&:hover': { bgcolor: '#000000b0' },
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
                    bgcolor: '#00000090',
                    border: 0.3,
                    borderColor: 'primary.contrastText',
                    color: 'primary.contrastText',
                    '&:hover': { bgcolor: '#000000b0' },
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
      </Box>

      {/* CARD TITLE */}
      <Box sx={{ bgcolor: 'secondary.main', p: 1 }}>
        <Typography variant="h6" sx={{ letterSpacing: 1 }}>
          {card.title}
        </Typography>
      </Box>

      {/* CARD ICONS, TAGS, SUMMARY, READ MORE */}
      <Box sx={{ p: 1 }}>
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
            onClick={() => onOpenDetails && onOpenDetails(card.title, card.description!)}
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
