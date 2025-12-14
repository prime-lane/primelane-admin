import type { Meta, StoryObj } from '@storybook/react'
import { Tab, Tabs } from '@mui/material'
import React from 'react'

const meta = {
  title: 'UI/Tab',
  component: Tab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['standard', 'filled'],
    },
    disabled: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Tab>

export default meta
type Story = StoryObj<typeof meta>

// Wrapper to handle Tabs state for interaction
const TabWrapper = (args: any) => {
  const [value, setValue] = React.useState(0)
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Tabs value={value} onChange={handleChange}>
      <Tab {...args} label="Creative 24" />
      <Tab {...args} label="Creative 24" />
    </Tabs>
  )
}

export const Filled: Story = {
  args: {
    variant: 'filled',
    label: 'Creative 24',
  },
  render: (args) => <TabWrapper {...args} />,
}

export const Standard: Story = {
  args: {
    label: 'Creative 24', // Default variant is essentially 'standard' style (Line)
    variant: 'standard',
  },
  render: (args) => <TabWrapper {...args} />,
}
