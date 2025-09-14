import { Box, Typography, Grid } from '@mui/material'

const SkillCard = ({
  card,
  skills,
}: {
  card: iSkillCard
  skills: Array<{ category: string; technologies: string[] }>
}) => {
  return (
    <Grid
      key={card.category}
      container
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(14em, 1fr))',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        gap: '0.5rem',
        my: 1,
        textAlign: { xs: 'center', sm: 'left' },
      }}
    >
      {skills.map((skillCategory) => (
        <Grid key={skillCategory.category}>
          <Box
            sx={{
              p: { xs: 1, sm: 2 },
              height: '100%',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: { xs: 0.5, sm: 1 },
              }}
            >
              {skillCategory.category}
            </Typography>
            <Box>
              {skillCategory.technologies.map((tech) => (
                <Box
                  key={tech}
                  sx={{
                    py: { xs: 0.3, sm: 0.5 },
                    color: 'text.secondary',
                  }}
                >
                  {tech}
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

export default SkillCard
