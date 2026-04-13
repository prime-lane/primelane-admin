import { Box, Button, Container, Typography } from '@mui/material'
import {
  useNavigate,
  useRouteError,
  isRouteErrorResponse,
} from 'react-router-dom'
import { Home } from '@solar-icons/react'

export const ErrorBoundary = () => {
  const error = useRouteError()
  const navigate = useNavigate()

  let errorMessage: string
  let errorStatus: number | string = 'Error'
  let errorTitle: string = 'Something went wrong'

  // Check if it's a Response object (thrown by NotFoundRoute) ---
  if (error instanceof Response) {
    errorStatus = error.status
    errorTitle = error.status === 404 ? 'Page Not Found' : 'Oops!'
    errorMessage =
      error.status === 404
        ? "The page you're looking for doesn't exist."
        : error.statusText || 'An unexpected error occurred.'
  } else if (isRouteErrorResponse(error)) {
    errorStatus = error.status
    errorTitle = error.status === 404 ? 'Page Not Found' : 'Oops!'
    errorMessage =
      error.status === 404
        ? "The page you're looking for doesn't exist."
        : error.statusText || 'An unexpected error occurred.'
  } else if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  } else {
    errorMessage = 'An unexpected error occurred.'
  }

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
        <Typography variant="subtitle1" fontWeight={600}>
          {errorStatus}
        </Typography>

        <div>
          <Typography variant="subtitle2" fontWeight={500} sx={{}}>
            {errorTitle}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: '500px',
              fontFamily:'monospace'
            }}
          >
            {errorMessage}
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
