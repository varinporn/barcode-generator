import { useState } from 'react'
import TableSection from './components/table/TableSection'
import FileUpload from './components/FileUpload'
import Header from './components/Header'
import { Box, Stack } from '@mui/material'
import { type CsvData } from './types/types'
import PDFDownload from './components/PDFDownload'

const BarcodeGeneratorApp = () => {
  const [data, setData] = useState<CsvData[]>([])
  const [selectedFile, setSelectedFile] = useState<File | undefined>()

  const handleClearFile = () => {
    setSelectedFile(undefined)
  }

  return (
    <div className="h-screen">
      <Header />

      <Box
        sx={{
          flexGrow: 1,
          bgcolor: '#F6F8FB',
          paddingX: 8,
          paddingY: 4,
          minHeight: '100%',
        }}
      >
        <div>
          <PDFDownload data={data} />
        </div>
        <Stack spacing={2}>
          <FileUpload
            file={selectedFile}
            onUpload={(parsedData, file) => {
              setData(parsedData)
              setSelectedFile(file)
            }}
            onDelete={handleClearFile}
          />
          <TableSection data={data} />
        </Stack>
      </Box>
    </div>
  )
}

export default BarcodeGeneratorApp
