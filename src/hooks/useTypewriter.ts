import { useEffect, useMemo, useState } from 'react'

export function useTypewriter(source: string, speedRange: [number, number] = [30, 80]) {
  const [typedText, setTypedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (currentIndex < source.length) {
      const [min, max] = speedRange
      const typingSpeed = Math.random() * (max - min) + min
      const timer = setTimeout(() => {
        setTypedText(source.slice(0, currentIndex + 1))
        setCurrentIndex((i) => i + 1)
      }, typingSpeed)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, source, speedRange])

  useEffect(() => {
    const cursorTimer = setInterval(() => setShowCursor((prev) => !prev), 500)
    return () => clearInterval(cursorTimer)
  }, [])

  const cursorPos = useMemo(() => {
    const textUpToCursor = source.slice(0, currentIndex)
    const lines = textUpToCursor.split('\n')
    const lineIndex = Math.max(0, lines.length - 1)
    const charIndex = lines[lineIndex]?.length ?? 0
    if (currentIndex >= source.length) {
      const allLines = source.split('\n')
      return { lineIndex: allLines.length - 1, charIndex: allLines[allLines.length - 1].length }
    }
    return { lineIndex, charIndex }
  }, [currentIndex, source])

  return { typedText, currentIndex, cursorPos, showCursor }
}
