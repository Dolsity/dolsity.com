import { Box, Typography, Card, Chip, Link, IconButton, Tooltip } from '@mui/material'
import { Code, Web } from '@mui/icons-material'

type StaticImageLike = { src: string }

type ProjectCardProps = {
  card: iProjectCard
  onOpenImage?: (src: string, title: string) => void
  onOpenDetails?: (title: string, description: string) => void
}

export default function ProjectCard({ card, onOpenImage, onOpenDetails }: ProjectCardProps) {
  return (
    <Card
      sx={{
        userSelect: 'none',
        textAlign: 'center',
        m: 1.5,
        borderRadius: '3px',
        border: 1,
        borderColor: 'primary.main',
        bgcolor: 'background.paper',
      }}
    >
      {/* CARD IMAGE */}
      <Box sx={{ height: '8rem' }}>
        {card.image ? (
          <Box
            component="img"
            src={typeof card.image === 'string' ? card.image : (card.image as StaticImageLike).src}
            alt={card.title}
            loading="lazy"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
              '&:hover': { transform: 'scale(1.04)' },
              cursor: onOpenImage ? 'pointer' : 'default',
            }}
            onClick={() =>
              onOpenImage &&
              onOpenImage(
                typeof card.image === 'string' ? card.image : (card.image as StaticImageLike).src,
                card.title
              )
            }
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).style.display = 'none'
            }}
          />
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
              aria-label="code"
              href={card.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'text.primary' }}
            >
              <Code />
            </IconButton>
          </Tooltip>
        )}
        {card.demoUrl && (
          <Tooltip title="Preview" placement="bottom">
            <IconButton
              aria-label="code"
              href={card.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
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
