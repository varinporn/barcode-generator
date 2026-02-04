import { Box, Button, Typography, Modal, Stack } from "@mui/material"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
}

interface Props {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  heading: string
  message: string
  confirmButton: string
  color?: "primary" | "error"
}

export default function PopupModal({
  open,
  onClose,
  onConfirm,
  heading,
  message,
  confirmButton,
  color = "primary",
}: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ mb: 1 }}
        >
          {heading}
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "text.secondary", mb: 3 }}
        >
          {message}
        </Typography>

        <Stack direction="row" spacing={1.5} justifyContent="flex-end">
          <Button
            onClick={onClose}
            color="inherit"
          >
            Cancel
          </Button>

          <Button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            variant="contained"
            color={color}
            sx={{
              px: 2,
              borderRadius: 2,
              fontWeight: 600,
            }}
            disableElevation
          >
            {confirmButton}
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}
