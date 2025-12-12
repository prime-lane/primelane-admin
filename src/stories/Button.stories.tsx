import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@mui/material'

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'error',
        'info',
        'success',
        'warning',
        'inherit',
      ],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    children: 'Create',
  },
}


export const Secondary: Story = {
  args: {
    variant: 'contained',
    color: 'secondary',
    children: 'Create',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outlined',
    color: 'primary',
    children: 'Create',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    color: 'primary',
    children: 'Create',
  },
}

export const Text: Story = {
  args: {
    variant: 'text',
    color: 'primary',
    children: 'Create',
  },
}

export const Disabled: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    disabled: true,
    children: 'Create',
  },
}
