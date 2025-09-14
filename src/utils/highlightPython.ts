// Simple Python syntax highlighter returning per-line HTML strings.
// Lightweight client-side implementation without external dependencies.
// For production-grade highlighting, consider integrating a library like Prism or Highlight.js.

export interface HighlightedLine {
  lineNumber: number
  raw: string
  html: string
}

// Centralized colors for easy tweaking.
const COLORS = {
  keyword: '#ff7b72',
  string: '#a5d6ff',
  magic: '#79c0ff',
  className: '#ffa657',
  number: '#79c0ff',
  operator: '#ff7b72',
  functionCall: '#d2a8ff',
  identifier: '#e6edf3',
}

const KEYWORDS = new Set([
  'import',
  'from',
  'class',
  'def',
  'return',
  'print',
  'super',
  'if',
  'else',
  'elif',
  'for',
  'while',
  'try',
  'except',
  'finally',
  'with',
  'as',
  'in',
  'not',
  'and',
  'or',
  'is',
  'None',
  'True',
  'False',
  'self',
])

// Escape HTML entities to avoid injection when inserting raw code.
const escapeHtml = (str: string) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

export function highlightPython(code: string): HighlightedLine[] {
  const lines = code.split('\n')
  return lines.map((line, idx) => {
    if (!line.trim()) {
      return { lineNumber: idx + 1, raw: line, html: escapeHtml(line) }
    }

    const leadingSpaces = line.match(/^\s*/)?.[0] || ''
    const trimmed = line.slice(leadingSpaces.length)

    // Token regex parts: whitespace | (f) strings | normal strings | punctuation | word
    // eslint-disable-next-line no-useless-escape
    const tokenRegex = /\s+|f?"[^"]*"|f?'[^']*'|"[^"]*"|'[^']*'|[(){}\[\]:,.=+\-*/<>!&|]|\w+/g
    const tokens = trimmed.match(tokenRegex) || []

    let html = escapeHtml(leadingSpaces)

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]

      if (/^\s+$/.test(token)) {
        html += token
        continue
      }

      let color: string | undefined
      let weight = 400

      if (KEYWORDS.has(token)) {
        color = COLORS.keyword
        weight = 500
      } else if (/^(f?"[^"]*"|f?'[^']*'|"[^"]*"|'[^']*')$/.test(token)) {
        color = COLORS.string
      } else if (/^__\w+__$/.test(token)) {
        color = COLORS.magic
        weight = 500
      } else if (/^[A-Z][a-zA-Z0-9_]*$/.test(token)) {
        color = COLORS.className
      } else if (/^\d+$/.test(token)) {
        color = COLORS.number
        // eslint-disable-next-line no-useless-escape
      } else if (/^[(){}\[\]:,.=+\-*/<>!&|]$/.test(token)) {
        color = COLORS.operator
      } else if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(token)) {
        const next = tokens[i + 1]
        if (next === '(') {
          color = COLORS.functionCall
        } else {
          color = COLORS.identifier
        }
      }

      if (color) {
        html += `<span style="color:${color};${weight !== 400 ? 'font-weight:500;' : ''}">${escapeHtml(token)}</span>`
      } else {
        html += escapeHtml(token)
      }
    }

    return { lineNumber: idx + 1, raw: line, html }
  })
}
