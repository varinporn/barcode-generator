import { Box, Typography, Paper, Stack, Divider } from '@mui/material'
import { CloudUpload } from '@mui/icons-material'
import { useRef } from 'react'

interface Props {
  file: File | undefined
  onSelectFile: (file: File) => void
}

const FileUpload = ({ file, onSelectFile }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const isFileAdded = !!file

  const boxBgColor = isFileAdded ? '#F0F0F0' : 'white'
  const boxBgHoverColor = isFileAdded ? '#F0F0F0' : '#EFF7FF'
  const borderColor = '#D3D3D3'
  const borderHoverColor = isFileAdded ? '#D3D3D3' : '#0171E3'

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      onSelectFile(selectedFile)
    }
  }

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.disabled">
          Upload your CSV file
        </Typography>
      </Box>

      <Divider />

      <Paper
        variant="outlined"
        sx={{
          border: '2px dashed',
          bgcolor: boxBgColor,
          borderColor: borderColor,
          ':hover': { borderColor: borderHoverColor, bgcolor: boxBgHoverColor },
          borderRadius: 2,
          cursor: isFileAdded ? 'default' : 'pointer',
          transition: 'all 0.2s',
          height: '180px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          my: 2,
        }}
      >
        <label
          className={`${isFileAdded ? 'cursor-default' : 'cursor-pointer'} block p-5`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileUpload}
            disabled={isFileAdded}
          />
          <Stack spacing={2} alignItems="center" justifyContent="center">
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'white',
                color: '#4F67FF',
              }}
            >
              <CloudUpload fontSize="medium" />
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                Click to upload or drag or drop
              </Typography>
              <Typography
                variant="body2"
                color="#A2A2A2"
                sx={{ fontWeight: 600 }}
              >
                CSV file only
              </Typography>
            </Box>
          </Stack>
        </label>
      </Paper>
    </Box>
  )
}

export default FileUpload
