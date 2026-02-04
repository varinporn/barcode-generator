import Papa, { type ParseResult } from "papaparse"
import { Box, Typography, Paper, Stack, Divider } from "@mui/material"
import { CloudUpload } from "@mui/icons-material"
import type { CsvData } from "../types/types"
import FileDisplay from "./FileDisplay"
import { useRef } from "react"

interface Props {
  file: File | undefined
  onUpload: (data: CsvData[], file: File) => void
  onDelete: () => void
}

const FileUpload = ({ file, onUpload, onDelete }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const isFileAdded = !!file

  const boxBgColor = isFileAdded ? "white" : "#EFF6FF"
  const borderColor = isFileAdded ? "#94A3B8" : "#2463EB"

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]

    if (selectedFile) {
      Papa.parse(selectedFile, {
        header: true,
        skipEmptyLines: true,
        complete: (result: ParseResult<CsvData>) => {
          onUpload(result.data, selectedFile)
        },
      })
    }
  }

  const handleDelete = () => {
    if (inputRef.current) {
      inputRef.current.value = ""
    }
    onDelete()
  }

  return (
    <Box
      sx={{
        paddingX: 2,
        paddingTop: 2,
        paddingBottom: 4,
        bgcolor: "#FFFFFF",
        borderRadius: 2,
        boxShadow: 1
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, color: "#000000" }}
          >
            Import the barcode data
          </Typography>
          <Typography variant="body2" color="text.disabled">
            Upload your CSV file
          </Typography>
        </Box>
      </Stack>

      <Divider />

      <Paper
        variant="outlined"
        sx={{
          border: "2px dashed",
          borderColor: borderColor,
          borderRadius: 2,
          bgcolor: "white",
          ":hover": { bgcolor: boxBgColor },
          cursor: isFileAdded ? "default" : "pointer",
          transition: "all 0.2s",
          marginTop: 2,
          height: "150px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isFileAdded ? (
          <FileDisplay file={file} onDelete={handleDelete} />
        ) : (
          <label
            className={`${isFileAdded ? "cursor-default" : "cursor-pointer"} block p-5`}
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
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "white",
                  color: "#4F67FF",
                }}
              >
                <CloudUpload fontSize="medium" />
              </Box>

              <Box sx={{ textAlign: "center" }}>
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
        )}
      </Paper>
    </Box>
  )
}

export default FileUpload
