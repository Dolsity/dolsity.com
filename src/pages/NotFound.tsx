import { Link } from 'react-router-dom'
import { Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

const MESSAGE = 'The page you are looking for does not exist.'

function NotFound() {
  const [text, setText] = useState('')
  const [i, setI] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  // Typewriter effect
  useEffect(() => {
    if (i < MESSAGE.length) {
      const speed = Math.random() * 50 + 25 // 25-75ms
      const t = setTimeout(() => {
        setText(MESSAGE.slice(0, i + 1))
        setI(i + 1)
      }, speed)
      return () => clearTimeout(t)
    }
  }, [i])

  // Blinking cursor
  useEffect(() => {
    const blink = setInterval(() => setShowCursor((c) => !c), 500)
    return () => clearInterval(blink)
  }, [])

  return (
    <Grid
      container
      sx={{
        bgcolor: 'background.default',
        placeItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        p: 2,
        flexDirection: 'column',
        gap: 2,
        height: '90vh',
      }}
    >
      {/* 404 TITLES */}
      <Typography variant="h1" sx={{ fontWeight: 800 }}>
        404
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontFamily: 'Fira Code, monospace',
          color: 'text.secondary',
          m: 1,
          whiteSpace: 'pre-wrap',
        }}
      >
        {text}
        <span
          aria-hidden="true"
          style={{
            display: 'inline-block',
            width: 2,
            height: '1.1em',
            background: showCursor ? '#ffffff' : 'transparent',
            marginLeft: 1.5,
            verticalAlign: 'text-top',
          }}
        />
      </Typography>
      <Link to="/" style={{ color: '#7fb5ff', textDecoration: 'underline' }}>
        Go Home
      </Link>
    </Grid>
  )
}

export default NotFound
