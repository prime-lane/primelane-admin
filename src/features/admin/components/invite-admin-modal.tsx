import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import { useInviteAdmin, useRoles } from '../api/use-admins'
import type { InviteAdminRequest } from '../types'

interface InviteAdminModalProps {
  open: boolean
  onClose: () => void
}

export const InviteAdminModal = ({ open, onClose }: InviteAdminModalProps) => {
  const { data: roles, isLoading: isLoadingRoles } = useRoles()
  const { mutate: inviteAdmin, isPending } = useInviteAdmin()

  const [formData, setFormData] = useState<InviteAdminRequest>({
    first_name: '',
    last_name: '',
    email: '',
    role: '',
  })

  const handleSubmit = () => {
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.role
    ) {
      return
    }
    inviteAdmin(formData, {
      onSuccess: () => {
        onClose()
        setFormData({ first_name: '', last_name: '', email: '', role: '' })
      },
    })
  }

  const handleChange =
    (field: keyof InviteAdminRequest) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | { target: { value: string } },
    ) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
        Invite new admin
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-4 mt-2">
          <div className="space-y-1">
            <label className="text-sm font-medium text-neutral-700">
              First name
            </label>
            <TextField
              placeholder="i.e John"
              fullWidth
              variant="outlined"
              value={formData.first_name}
              onChange={handleChange('first_name')}
              size="small"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-neutral-700">
              Last name
            </label>
            <TextField
              placeholder="i.e John"
              fullWidth
              variant="outlined"
              value={formData.last_name}
              onChange={handleChange('last_name')}
              size="small"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-neutral-700">
              Email
            </label>
            <TextField
              placeholder="i.e johndoe@gmail.com"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleChange('email')}
              size="small"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-neutral-700">Role</label>
            <FormControl fullWidth size="small">
              <Select
                value={formData.role}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, role: e.target.value }))
                }
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <span className="text-neutral-400">Select role</span>
                  }

                  const role = roles?.find((r) => r.id === selected)
                  return role ? role.name : selected
                }}
              >
                {isLoadingRoles ? (
                  <MenuItem disabled>Loading roles...</MenuItem>
                ) : (
                  roles?.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </div>
        </div>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: 'neutral.200',
            color: 'black',
            textTransform: 'none',
            height: '44px',
            flex: 1,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isPending}
          sx={{
            bgcolor: 'black',
            color: 'white',
            textTransform: 'none',
            height: '44px',
            flex: 1,
            '&:hover': {
              bgcolor: 'neutral.800',
            },
          }}
        >
          {isPending ? 'Sending...' : 'Send Invite'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
