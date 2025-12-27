import { Avatar } from '@mui/material'
import { Dialog, DialogContent } from '@mui/material'
import { IconButton } from '@mui/material'
import { CloseCircle } from '@solar-icons/react'
import { ArrowRightUp } from '@solar-icons/react'
import { useState } from 'react'

export const InfoRow = ({
  index,
  label,
  value,
  isImage = false,
}: {
  index: number
  label: string
  value: string | React.ReactNode
  isImage?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="flex items-center py-3 gap-4">
        <span className="text-neutral-500 text-sm w-4">{index}.</span>
        <span className="text-neutral-500 text-sm w-40">{label}</span>
        <span className="text-neutral-500 text-sm font-semibold">-</span>
        {isImage && typeof value === 'string' ? (
          <div
            className="flex items-end cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <Avatar src={value} sx={{ width: 20, height: 20 }} />
            <ArrowRightUp
              size={11}
              className="text-neutral-500 cursor-pointer"
            />
          </div>
        ) : (
          <span className="text-neutral-900 text-sm font-semibold">
            {value as React.ReactNode}
          </span>
        )}
      </div>

      {isImage && typeof value === 'string' && (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogContent>
            <div className="relative">
              <IconButton
                onClick={() => setIsOpen(false)}
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
                src={value}
                alt={label}
                className="w-fit mx-auto h-auto rounded-lg"
                style={{ maxHeight: '85vh', objectFit: 'contain' }}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
