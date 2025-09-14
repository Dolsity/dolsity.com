import { Box, Typography, Container } from '@mui/material'
import { useMemo } from 'react'

import { useTypewriter } from '../hooks/useTypewriter'
import { highlightPython } from '../utils/highlightPython'
import { LaptopFrame } from '../components/Terminal/Laptop'
import { CodeEditor } from '../components/Terminal/CodeEditor'

// Source code shown in the hero "terminal"
const PYTHON_CODE = `import human

class Developer(human.Human):
    def __init__(self, name):
        super().__init__(name)
    
    def greeting(self):
        return f"Hello! My name is {self.name}!"

get_human = Developer("Dolsity")

print(get_human.greeting())`

export default function HomeSection() {
  const { typedText, cursorPos, showCursor } = useTypewriter(PYTHON_CODE, [30, 80])
  const fullHighlight = useMemo(() => highlightPython(PYTHON_CODE), [])
  const typedHighlight = useMemo(() => (typedText ? highlightPython(typedText) : []), [typedText])

  return (
    <Box id="home" sx={{ background: 'linear-gradient(#7d7a69, #e9d7c4)' }}>
      {/* LANDING 1/3 */}
      <Container maxWidth="md">
        {/* LANDING TITLES */}
        <Box sx={{ textAlign: 'center', py: 7 }}>
          <Typography variant="h1" component="h1" color="text.primary" sx={{ my: 1 }}>
            Dolsity
          </Typography>
          <Typography variant="h2" component="h2" color="text.secondary">
            Full-stack Developer
          </Typography>
        </Box>
        {/* TERMINAL */}
        <LaptopFrame>
          <CodeEditor
            fullLines={fullHighlight}
            typedLines={typedHighlight}
            cursor={{ lineIndex: cursorPos.lineIndex, visible: showCursor }}
            extraBlankLines={2}
          />
        </LaptopFrame>
      </Container>
    </Box>
  )
}
