import { useState } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { CheckCircle, Copy } from '@solar-icons/react'

interface CopyButtonProps {
  textToCopy: string
}

export const CopyButton = ({ textToCopy }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Tooltip title={copied ? 'Copied!' : 'Copy'}>
      <IconButton onClick={handleCopy} size="small">
        {copied ? (
          <CheckCircle size={16} color="#4caf50" />
        ) : (
          <Copy size={16} />
        )}
      </IconButton>
    </Tooltip>
  )
}
