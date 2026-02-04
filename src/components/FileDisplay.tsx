import { InsertDriveFile, Delete } from "@mui/icons-material"
import { Box, Typography, Stack, IconButton } from "@mui/material"

interface Props {
  file: File
  onDelete: () => void
}

const FileDisplay = ({ file, onDelete }: Props) => {
  return (
    <Box sx={{width: "100%", pt: 1, pb: 4}}>
        <Stack
          spacing={2}
          alignItems="center"
          justifyContent="center"
          direction="row"
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 1,
              bgcolor: "#E0E7FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#4F46E5",
            }}
          >
            <InsertDriveFile />
          </Box>

          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography variant="body2" fontWeight={600} noWrap>
              {file.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {(file.size / 1024).toFixed(2)} KB
            </Typography>
          </Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton
              size="small"
              onClick={onDelete}
              sx={{ "&:hover": { color: "#EF4444" } }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
    </Box>
  )
}

export default FileDisplay
