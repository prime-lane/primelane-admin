import { Eye, FileCheck, Upload } from '@solar-icons/react'
import { useDropzone } from 'react-dropzone'

interface FileCardProps {
  label: string
  url: string
  onUpload?: (files: File[]) => void
}

export const FileCard = ({ label, url, onUpload }: FileCardProps) => {
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop: onUpload,
    noClick: true,
    noKeyboard: true,
    multiple: false,
  })

  return (
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
        {/* <button
          type="button"
          onClick={open}
          className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
          title="Upload"
        >
          <Upload size={20} />
        </button> */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-neutral-400 hover:text-primary hover:bg-primary/5 rounded-full transition-colors"
          title="View"
        >
          <Eye size={20} />
        </a>
      </div>
    </div>
  )
}
