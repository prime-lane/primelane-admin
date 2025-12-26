import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'

interface DeleteRoleModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  roleName?: string
  isLoading?: boolean
}

export const DeleteRoleModal = ({
  open,
  onClose,
  onConfirm,
  roleName,
  isLoading,
}: DeleteRoleModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <span className="text-2xl font-medium font-sans">Delete Role</span>
      </DialogTitle>
      <DialogContent>
        <p className="text-neutral-600 mt-2">
          Are you sure you want to delete the role{' '}
          <span className="font-semibold text-neutral-900">"{roleName}"</span>?
          This action cannot be undone.
        </p>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: 'neutral.200',
            color: 'black',
            textTransform: 'none',
            height: '44px',
            flex: 1,
            '&:hover': {
              borderColor: 'neutral.300',
              bgcolor: 'transparent',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          disabled={isLoading}
          sx={{
            bgcolor: '#D32F2F',
            color: 'white',
            textTransform: 'none',
            height: '44px',
            flex: 1,
            '&:hover': {
              bgcolor: '#B71C1C',
            },
          }}
        >
          {isLoading ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
