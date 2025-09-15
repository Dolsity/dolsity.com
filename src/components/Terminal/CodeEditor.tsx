import { Box } from '@mui/material'

type HighlightLine = { lineNumber: number; raw: string; html: string }

type Props = {
  fullLines: HighlightLine[]
  typedLines: HighlightLine[]
  cursor: { lineIndex: number; visible: boolean }
  extraBlankLines?: number
}

export function CodeEditor({ fullLines, typedLines, cursor, extraBlankLines = 2 }: Props) {
  const displayLines: HighlightLine[] = [
    ...fullLines,
    ...Array.from({ length: extraBlankLines }, (_, i) => ({
      lineNumber: fullLines.length + i + 1,
      raw: '',
      html: '',
    })),
  ]

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        display: 'grid',
        gridTemplateColumns: '2rem auto',
        fontFamily: 'Fira Code, monospace',
        fontWeight: 400,
        fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.85rem' },
        userSelect: 'none',
      }}
    >
      <Box
        sx={{
          textAlign: 'right',
          color: 'text.secondary',
          p: '0.4rem 0.6rem',
          borderRight: 1,
          borderColor: 'primary.main',
        }}
      >
        {displayLines.map((l) => (
          <div key={l.lineNumber} style={{ lineHeight: '1.6' }}>
            {l.lineNumber}
          </div>
        ))}
      </Box>
      <Box
        sx={{
          p: '0.4rem 0.6rem',
          overflow: 'auto',
          whiteSpace: 'pre',
          wordWrap: 'normal',
          letterSpacing: '0.1rem',
          textAlign: 'left',
        }}
      >
        {displayLines.map((line, idx) => {
          const isTyped = idx < typedLines.length
          const typed = typedLines[idx]
          const isCurrent = idx === cursor.lineIndex
          return (
            <div key={idx} style={{ lineHeight: '1.6', minHeight: '1.6em' }}>
              {isTyped ? (
                <span dangerouslySetInnerHTML={{ __html: typed?.html || '' }} />
              ) : (
                <span style={{ color: 'transparent' }}>{line.raw || ' '}</span>
              )}
              {isCurrent && (
                <span
                  aria-hidden="true"
                  style={{
                    backgroundColor: cursor.visible ? '#ffffff' : 'transparent',
                    width: '2px',
                    height: '1.3em',
                    display: 'inline-block',
                    marginLeft: '1px',
                    verticalAlign: 'text-top',
                  }}
                />
              )}
            </div>
          )
        })}
      </Box>
    </Box>
  )
}
