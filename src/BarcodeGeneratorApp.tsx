import { useState } from 'react'
import TableSection from './components/table/TableSection'
import FileUpload from './components/FileUpload'
import Header from './components/Header'
import { Box, Stack } from '@mui/material'
import { type CsvData } from './types/types'
import PDFDownload from './components/PDFDownload'
import PopupModal from './components/PopupModal'
import { parseCsvFile } from './utils/CsvParser'
import FileDisplay from './components/FileDisplay'
import AppButton from './components/AppButton'

const BarcodeGeneratorApp = () => {
  const [data, setData] = useState<CsvData[]>([])
  const [selectedFile, setSelectedFile] = useState<File | undefined>()
  const [openModal, setOpenModal] = useState(false)

  const handleImport = async () => {
    if (!selectedFile) return

    try {
      const parsedData = await parseCsvFile(selectedFile)
      setData(parsedData)
      setOpenModal(false)
    } catch (error) {
      console.error('CSV parse error', error)
    }
  }

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
          px: 8,
          py: 4,
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Stack direction="row" spacing={4}>
          <AppButton onClick={() => setOpenModal(true)}>Import</AppButton>
          <PDFDownload data={data} />
        </Stack>

        {openModal && (
          <PopupModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            heading="Import CSV File"
            confirmButton="Import"
            onConfirm={handleImport}
          >
            <FileUpload
              file={selectedFile}
              onSelectFile={(file) => setSelectedFile(file)}
            />
            <Box sx={{ minHeight: 120 }}>
              {selectedFile && (
                <FileDisplay file={selectedFile} onDelete={handleClearFile} />
              )}
            </Box>
          </PopupModal>
        )}

        <Box sx={{ flexGrow: 1 }}>
          <TableSection data={data} />
        </Box>
      </Box>
    </div>
  )
}

export default BarcodeGeneratorApp
