import { Box } from '@mui/material'
import { Rocket } from '@solar-icons/react'

interface ComingSoonProps {
  title?: string
  description?: string
}

export const ComingSoon = ({
  title = 'Coming Soon',
  description = 'This feature is currently under development and will be available soon.',
}: ComingSoonProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        gap: 3,
      }}
    >
      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          bgcolor: 'rgba(0, 0, 0, 0.03)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'pulse 2s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': {
              transform: 'scale(1)',
              opacity: 1,
            },
            '50%': {
              transform: 'scale(1.05)',
              opacity: 0.8,
            },
          },
        }}
      >
        <Rocket size={60} color="#000" />
      </Box>

      <h1 className="text-4xl font-semibold">{title}</h1>

      <p className="text-base text-neutral-500 max-w-md">{description}</p>
    </Box>
  )
}
