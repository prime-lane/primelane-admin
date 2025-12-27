import { Dialog, DialogContent, IconButton } from '@mui/material'
import { CloseCircle, Eye, FileCheck } from '@solar-icons/react'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface FileCardProps {
  label: string
  url: string
  onUpload?: (files: File[]) => void
}

export const FileCard = ({ label, url, onUpload }: FileCardProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onUpload,
    noClick: true,
    noKeyboard: true,
    multiple: false,
  })

  return (
    <>
      <div
        {...getRootProps()}
        className="flex items-start justify-between p-3 bg-neutral-50 border border-neutral-100 rounded-xl"
      >
        <input {...getInputProps()} />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white border border-neutral-100 flex items-center justify-center shrink-0">
            <FileCheck className="text-neutral-400" size={20} />
          </div>
          <span className="text-sm font-medium text-neutral-900 line-clamp-1">
            {label}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {url && (
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="p-2 text-neutral-400 hover:text-primary hover:bg-primary/5 rounded-full transition-colors cursor-pointer"
              title="View"
            >
              <Eye size={20} />
            </button>
          )}
        </div>
      </div>

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
              src={url}
              alt={label}
              className="w-fit mx-auto h-auto rounded-lg"
              style={{ maxHeight: '85vh', objectFit: 'contain' }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
