import { Box } from '@mui/material'
import type { PropsWithChildren } from 'react'

export function LaptopFrame({ children }: PropsWithChildren) {
  return (
    <Box>
      {/* LAPTOP BODY */}
      <Box
        sx={{
          position: 'relative',
          bgcolor: '#2f2f2fc9',
          borderRadius: '1rem 1rem 0 0',
          p: { xs: '35px 18px 0 18px', md: '35px 23px 0 23px' },
        }}
      >
        {/* LAPTOP CAMERA */}
        <Box
          sx={{
            position: 'absolute',
            top: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '12px',
            height: '12px',
            bgcolor: '#747474c9',
            border: '1px solid #3d3d3d',
            borderRadius: '50%',
          }}
        />
        {/* LAPTOP SCREEN */}
        <Box sx={{ borderRadius: '8px 8px 0 0', p: 0, border: 0.5, borderColor: 'primary.main' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: '30px',
              borderRadius: '8px 8px 0 0',
              backgroundColor: '#434343',
              borderBottom: 1,
              borderColor: 'primary.main',
              px: 1,
              position: 'relative',
            }}
          >
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {[
                ['#ff5f56', 'rgba(255, 95, 86, 0.55)'],
                ['#ffbd2e', 'rgba(255, 189, 46, 0.55)'],
                ['#27c93f', 'rgba(39, 201, 63, 0.55)'],
              ].map(([color, hover], i) => (
                <Box
                  key={i}
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: color,
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: hover },
                  }}
                />
              ))}
            </Box>
          </Box>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
