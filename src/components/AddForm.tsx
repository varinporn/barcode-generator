import { Box, Stack, TextField } from '@mui/material'
import { useForm, type SubmitHandler } from 'react-hook-form'
import AppButton from './AppButton'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../stores/store'
import { addResource } from '../stores/slices/resourceSlice'
import { type ResourceInputs } from '../types/types'

interface Props {
  onCancel: () => void
}

const AddForm = ({ onCancel }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const { register, handleSubmit, reset } = useForm<ResourceInputs>()

  const onSubmit: SubmitHandler<ResourceInputs> = (data) => {
    dispatch(addResource(data))
    reset()
    onCancel()
  }

  return (
    <Box sx={{ py: 1 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label="Organizaton Name"
            variant="outlined"
            sx={{ width: '100%' }}
            {...register('organization_name')}
          />
          <TextField
            label="Staff ID"
            variant="outlined"
            sx={{ width: '100%' }}
            {...register('staff_id', { required: true })}
          />
          <TextField
            label="Full Name"
            variant="outlined"
            sx={{ width: '100%' }}
            {...register('full_name', { required: true })}
          />
          <Stack direction="row" justifyContent="flex-end" spacing={1}>
            <AppButton
              sx={{
                bgcolor: 'white',
                color: 'black',
                border: 1,
                borderColor: '#D3D3D3',
                ':hover': { bgcolor: '#F0F0F0' },
              }}
              onClick={onCancel}
            >
              Cancel
            </AppButton>
            <AppButton type="submit">Add</AppButton>
          </Stack>
        </Stack>
      </form>
    </Box>
  )
}

export default AddForm
