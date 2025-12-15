import { Box, Button, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Home } from '@solar-icons/react'

export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          gap: 3,
        }}
      >
        <Typography variant="subtitle1">404</Typography>

        <div>
          <Typography variant="subtitle2">Page Not Found</Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: '500px',
            }}
          >
            The page you're looking for doesn't exist.
          </Typography>
        </div>

        <Button
          variant="contained"
          color="primary"
          startIcon={<Home />}
          onClick={() => navigate('/')}
        >
          Go Home
        </Button>
      </Box>
    </Container>
  )
}
