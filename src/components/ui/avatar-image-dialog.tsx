import { formatImageSrc } from '@/lib/utils'
import { Dialog, DialogContent, IconButton } from '@mui/material'
import { CloseCircle } from '@solar-icons/react'

interface AvatarImageDialogProps {
  open: boolean
  onClose: () => void
  imageUrl: string
  altText: string
}

export const AvatarImageDialog = ({
  open,
  onClose,
  imageUrl,
  altText,
}: AvatarImageDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <div className="relative">
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: -7,
              right: 8,
              zIndex: 10,
            }}
          >
            <CloseCircle size={20} />
          </IconButton>
          <img
            src={formatImageSrc(imageUrl)}
            alt={altText}
            className="w-fit mx-auto h-auto rounded-lg"
            style={{ maxHeight: '85vh', objectFit: 'contain' }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
