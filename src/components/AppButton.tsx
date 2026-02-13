import { Button, CircularProgress } from '@mui/material'
import type { ButtonProps } from '@mui/material'

interface AppButtonProps extends ButtonProps {
  loading?: boolean
  loadingMessage?: string
}

const AppButton = ({
  loading = false,
  loadingMessage,
  disabled,
  children,
  sx,
  ...props
}: AppButtonProps) => {
  const isDisabled = disabled || loading

  return (
    <Button
      {...props}
      disabled={isDisabled}
      variant="contained"
      disableElevation
      sx={{
        px: 3,
        py: 1,
        borderRadius: 2,
        fontWeight: 600,
        textTransform: 'none',
        transition: 'all 0.2s',
        ...(loading && {
          cursor: 'wait',
        }),
        ...(isDisabled && {
          bgcolor: '#CBD5E1',
          color: 'white',
        }),
        ...sx,
      }}
    >
      {loading ? (
        <>
          <CircularProgress size={18} sx={{ color: 'white', mr: 1 }} />
          {loadingMessage}
        </>
      ) : (
        children
      )}
    </Button>
  )
}

export default AppButton
