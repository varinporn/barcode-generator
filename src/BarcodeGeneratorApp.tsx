import { useState } from "react"
import TableSection from "./components/table/TableSection"
import FileUpload from "./components/FileUpload"
import Header from "./components/Header"
import { Box, Grid, Stack } from "@mui/material"
import { type CsvData } from "./types/types"
import PDFDownload from "./components/PDFDownload"

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
          bgcolor: "#F6F8FB",
          paddingX: 8,
          paddingY: 4,
          minHeight: "100%",
        }}
      >
        <Grid container spacing={2}>
          <Grid size={10}>
            <Stack spacing={2}>
              <FileUpload
                file={selectedFile}
                onUpload={(parsedData, file) => {
                  setData(parsedData)
                  setSelectedFile(file)
                }}
                onDelete={handleClearFile}
              />
              <TableSection data={data} setData={setData} />{" "}
            </Stack>
          </Grid>
          <Grid size={2}>
            <div>
              <PDFDownload data={data} />
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default BarcodeGeneratorApp
