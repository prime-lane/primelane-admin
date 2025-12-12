import type { Meta, StoryObj } from '@storybook/react'
import { TextField } from '@mui/material'

const meta = {
  title: 'UI/TextInput',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    helperText: { control: 'text' },
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Email',
    variant: 'outlined',
  },
}

export const Filled: Story = {
  args: {
    label: 'Email',
    value: 'InputValue',
    placeholder: 'Email',
    variant: 'outlined',
  },
}

export const Error: Story = {
  args: {
    label: 'Email',
    value: 'InputValue',
    placeholder: 'Email',
    error: true,
    helperText: 'Invalid email address',
    variant: 'outlined',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Email',
    placeholder: 'Email',
    disabled: true,
    variant: 'outlined',
  },
}

export const Small: Story = {
  args: {
    label: 'Small Input',
    placeholder: 'Small',
    variant: 'outlined',
    size: 'small',
  },
}

export const Large: Story = {
  args: {
    label: 'Large Input',
    placeholder: 'Large',
    variant: 'outlined',
    size: 'medium',
  },
}