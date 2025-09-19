import { Box, Typography, Container, Grid } from '@mui/material'
import SkillCard from '../components/Cards/SkillCard'

export default function SkillsSection() {
  const cards: iSkillCard[] = [
    {
      category: 'Languages',
      technologies: ['Python', 'JavaScript', 'TypeScript', 'HTML5/CSS3', 'C++', 'SASS'],
    },
    {
      category: 'Tools/Software',
      technologies: [
        'Vite',
        'Git/GitHub',
        'Docker',
        'VS Code',
        'Arduino IDE',
        'PyCharm',
        'CLion',
        'Figma',
      ],
    },
    {
      category: 'Frameworks/Libraries',
      technologies: [
        'React',
        'Redux',
        'Material-UI',
        'Tailwind CSS',
        'Flask',
        'PyMongo',
        'Pillow',
        'Nextcord',
        'Discord.py',
        'Discord.js',
      ],
    },
    {
      category: 'Database/Cloud Hosting',
      technologies: ['PostgreSQL', 'MongoDB', 'GitHub Pages', 'Heroku', 'DigitalOcean', 'AWS'],
    },
    {
      category: 'Other',
      technologies: ['Web Performance', 'End-to-End Testing', 'Accessibility', 'SEO'],
    },
  ]
  return (
    <Box
      id="skills"
      sx={{
        bgcolor: 'background.default',
        py: 8,
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ mb: 2, textAlign: { xs: 'center', sm: 'left' } }}>
          {/* SKILLS TITLES */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 1.5,
              color: 'text.primary',
              letterSpacing: 0.5,
            }}
          >
            My Skills
          </Typography>
          <Typography variant="h5" sx={{ color: 'text.secondary' }}>
            Languages, tools, and everything in-between that I've taken time to learn and use.
          </Typography>
        </Box>

        <Grid
          container
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(14em, 1fr))',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            gap: 0,
            my: 1,
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          {cards.map((card) => (
            <SkillCard key={card.category} card={card} skills={[card]} />
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
