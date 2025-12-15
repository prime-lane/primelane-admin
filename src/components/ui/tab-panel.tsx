import { Box } from '@mui/material'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

export function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`primelane-tabpanel-${index}`}
      aria-labelledby={`primelane-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

export function a11yProps(index: number) {
  return {
    id: `primelane-tab-${index}`,
    'aria-controls': `primelane-tabpanel-${index}`,
  }
}
