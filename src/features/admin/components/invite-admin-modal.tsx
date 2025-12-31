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
  FormHelperText,
} from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useInviteAdmin, useRoles } from '../api/use-admins'
import { colors } from '@/theme/colors'

const inviteAdminSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email cannot be empty' }),
  role_id: z.string().min(1, 'Role is required'),
})

type InviteAdminFormData = z.infer<typeof inviteAdminSchema>

interface InviteAdminModalProps {
  open: boolean
  onClose: () => void
}

export const InviteAdminModal = ({ open, onClose }: InviteAdminModalProps) => {
  const { data: roles, isLoading: isLoadingRoles } = useRoles()
  const { mutate: inviteAdmin, isPending } = useInviteAdmin()

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InviteAdminFormData>({
    resolver: zodResolver(inviteAdminSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      role_id: '',
    },
  })

  const onSubmit = (data: InviteAdminFormData) => {
    inviteAdmin(data, {
      onSuccess: () => {
        onClose()
        reset()
      },
    })
  }

  const handleClose = () => {
    onClose()
    reset()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <span className="text-2xl font-medium font-sans">Invite new admin</span>
      </DialogTitle>
      <DialogContent>
        <form id="invite-admin-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 mt-2">
            <div className="space-y-1">
              <label
                className="text-sm font-medium text-neutral-700"
                htmlFor="first_name"
              >
                First name
              </label>
              <TextField
                placeholder="i.e John"
                id="first_name"
                hiddenLabel
                fullWidth
                variant="outlined"
                size="medium"
                error={!!errors.first_name}
                helperText={errors.first_name?.message}
                {...register('first_name')}
              />
            </div>
            <div className="space-y-1">
              <label
                className="text-sm font-medium text-neutral-700"
                htmlFor="last_name"
              >
                Last name
              </label>
              <TextField
                placeholder="i.e Doe"
                id="last_name"
                fullWidth
                variant="outlined"
                size="medium"
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
                {...register('last_name')}
              />
            </div>
            <div className="space-y-1">
              <label
                className="text-sm font-medium text-neutral-700"
                htmlFor="email"
              >
                Email
              </label>
              <TextField
                placeholder="i.e johndoe@gmail.com"
                id="email"
                fullWidth
                variant="outlined"
                size="medium"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register('email')}
              />
            </div>
            <div className="space-y-1">
              <label
                className="text-sm font-medium text-neutral-700"
                htmlFor="role_id"
              >
                Role
              </label>
              <FormControl fullWidth size="medium" error={!!errors.role_id}>
                <Controller
                  name="role_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      id="role_id"
                      displayEmpty
                      renderValue={(selected) => {
                        if (!selected) {
                          return (
                            <span className="text-neutral-400">
                              Select role
                            </span>
                          )
                        }
                        const role = roles?.find((r) => r.id === selected)
                        return role ? role.name : selected
                      }}
                      sx={{
                        color: `${colors.neutral[500]} !important`,
                      }}
                    >
                      {isLoadingRoles ? (
                        <MenuItem disabled>Loading roles...</MenuItem>
                      ) : (
                        roles?.map((role) => (
                          <MenuItem key={role.id} value={role.id}>
                            <span className="text-sm text-neutral-500">
                              {role.name}
                            </span>
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  )}
                />
                {errors.role_id && (
                  <FormHelperText>{errors.role_id.message}</FormHelperText>
                )}
              </FormControl>
            </div>
          </div>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={handleClose}
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
          type="submit"
          form="invite-admin-form"
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
