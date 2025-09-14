import { createTheme } from '@mui/material'

const baseTheme = createTheme()

const theme = createTheme({
  ...baseTheme,
  palette: {
    success: { main: '#1DB954', contrastText: '#FFFFFF' },
    error: { main: '#E22134', contrastText: '#FFFFFF' },
    warning: { main: '#FF5745', contrastText: '#FFFFFF' },
    primary: { main: '#212121', contrastText: '#FFFFFF' },
    background: { default: '#212121', paper: '#121212' },
    text: { primary: '#ffffff', secondary: '#DDDDDD', disabled: '#888888' },
    action: {
      active: '#FFFFFF',
      hover: '#535353',
      selected: '#1DB954',
      disabled: '#DDDDDD',
      disabledBackground: '#333333',
    },
    divider: '#B3B3B3',
    mode: 'dark',
  },
  /*
  - xs (0-599px)
  - sm (600-959px)
  - md and up (960px+)
  - lg and up (1280px+)
*/
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    /*
      Better responsive pattern:
      - Provide a base (xs)
      - Override in ascending order (sm -> md -> lg -> xl)
      - Avoid putting larger breakpoint first which can be overridden later unintentionally
      Optionally, you could replace the discrete steps with a fluid clamp() value.
    */
    h1: {
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0.1rem',
      fontSize: '2.5rem', // xs (<600px)
      [baseTheme.breakpoints.up('sm')]: { fontSize: '3rem' },
      [baseTheme.breakpoints.up('md')]: { fontSize: '3.5rem' },
      [baseTheme.breakpoints.up('lg')]: { fontSize: '4.5rem' },
    },
    h2: {
      fontWeight: 500,
      lineHeight: 1.25,
      letterSpacing: '0.05rem',
      fontSize: '1.75rem', // xs
      [baseTheme.breakpoints.up('sm')]: { fontSize: '2rem' },
      [baseTheme.breakpoints.up('md')]: { fontSize: '2.25rem' },
      [baseTheme.breakpoints.up('lg')]: { fontSize: '2.5rem' },
    },
    h3: {
      fontWeight: 500,
      lineHeight: 1.3,
      letterSpacing: '0.04rem',
      fontSize: '1.5rem', // xs
      [baseTheme.breakpoints.up('sm')]: { fontSize: '1.65rem' },
      [baseTheme.breakpoints.up('md')]: { fontSize: '1.8rem' },
      [baseTheme.breakpoints.up('lg')]: { fontSize: '1.95rem' },
    },
    h4: {
      fontWeight: 500,
      lineHeight: 1.35,
      letterSpacing: '0.03rem',
      fontSize: '1.3rem', // xs
      [baseTheme.breakpoints.up('sm')]: { fontSize: '1.4rem' },
      [baseTheme.breakpoints.up('md')]: { fontSize: '1.5rem' },
      [baseTheme.breakpoints.up('lg')]: { fontSize: '1.6rem' },
    },
    h5: {
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.02rem',
      fontSize: '1.15rem', // xs
      [baseTheme.breakpoints.up('sm')]: { fontSize: '1.2rem' },
      [baseTheme.breakpoints.up('md')]: { fontSize: '1.25rem' },
      [baseTheme.breakpoints.up('lg')]: { fontSize: '1.3rem' },
    },
    h6: {
      fontWeight: 500,
      lineHeight: 1.45,
      letterSpacing: '0.015rem',
      fontSize: '1rem', // xs
      [baseTheme.breakpoints.up('sm')]: { fontSize: '1.05rem' },
      [baseTheme.breakpoints.up('md')]: { fontSize: '1.1rem' },
      [baseTheme.breakpoints.up('lg')]: { fontSize: '1.15rem' },
    },
    body1: {
      fontWeight: 400,
      lineHeight: 1.6,
      fontSize: '1rem', // xs
      [baseTheme.breakpoints.up('sm')]: { fontSize: '1.05rem' },
      [baseTheme.breakpoints.up('md')]: { fontSize: '1.1rem' },
      [baseTheme.breakpoints.up('lg')]: { fontSize: '1.15rem' },
    },
    body2: {
      fontWeight: 400,
      lineHeight: 1.5,
      fontSize: '0.875rem', // xs
      [baseTheme.breakpoints.up('sm')]: { fontSize: '0.9rem' },
      [baseTheme.breakpoints.up('md')]: { fontSize: '0.95rem' },
      [baseTheme.breakpoints.up('lg')]: { fontSize: '1rem' },
    },
    caption: {
      fontWeight: 400,
      lineHeight: 1.4,
      fontSize: '0.75rem', // xs
      [baseTheme.breakpoints.up('sm')]: { fontSize: '0.8rem' },
      [baseTheme.breakpoints.up('md')]: { fontSize: '0.85rem' },
      [baseTheme.breakpoints.up('lg')]: { fontSize: '0.9rem' },
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        /*
        '*': {
          outline: '#ce0000ed 0.75px solid !important',
        },
        */
        body: {
          margin: 0,
          padding: 0,
          minWidth: 320,
        },
      },
    },
  },
})

export default theme
