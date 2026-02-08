import { useState } from 'react'
import FileUpload from './components/uploadCsv/FileUpload'
import Header from './components/Header'
import { Box, Stack } from '@mui/material'
import PDFDownload from './components/PDFDownload'
import PopupModal from './components/PopupModal'
import { parseCsvFile } from './utils/CsvParser'
import FileDisplay from './components/uploadCsv/FileDisplay'
import AppButton from './components/AppButton'
import AddForm from './components/AddForm'
import { useDispatch } from 'react-redux'
import { type AppDispatch } from './stores/store'
import { addResources } from './stores/slices/resourceSlice'
import DataTable from './components/table/DataTable'

const BarcodeGeneratorApp = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [selectedFile, setSelectedFile] = useState<File | undefined>()
  const [openImportModal, setOpenImportModal] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)

  const handleImport = async () => {
    if (!selectedFile) return

    try {
      const parsedData = await parseCsvFile(selectedFile)
      dispatch(
        addResources(
          parsedData.map((item) => ({
            ...item,
          })),
        ),
      )

      setOpenImportModal(false)
      setSelectedFile(undefined)
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
        <Stack direction="row" spacing={2}>
          <AppButton onClick={() => setOpenImportModal(true)}>Import</AppButton>
          <AppButton onClick={() => setOpenAddModal(true)}>
            Add Resource
          </AppButton>
          <PDFDownload />
          <AppButton color="error">Delete All</AppButton>
        </Stack>

        {openImportModal && (
          <PopupModal
            open={openImportModal}
            onClose={() => setOpenImportModal(false)}
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

        {openAddModal && (
          <PopupModal
            open={openAddModal}
            onClose={() => setOpenAddModal(false)}
            heading="Add Resource"
          >
            <AddForm onCancel={() => setOpenAddModal(false)} />
          </PopupModal>
        )}

        <Box sx={{ flexGrow: 1 }}>
          <DataTable />
        </Box>
      </Box>
    </div>
  )
}

export default BarcodeGeneratorApp
