import { useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import { saveAs } from 'file-saver'
import PDFDocument from './PDFDocument'
import type { CsvData } from '../types/types'
import AppButton from './AppButton'

const PDFDownload = ({ data }: { data: CsvData[] }) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const hasData = data.length > 0

  const handleDownload = async () => {
    setIsGenerating(true)

    setTimeout(async () => {
      try {
        const doc = <PDFDocument data={data} />
        const blob = await pdf(doc).toBlob()
        saveAs(blob, 'generate_barcode.pdf')
      } catch (error) {
        console.error('PDF Error:', error)
      } finally {
        setIsGenerating(false)
      }
    }, 100)
  }

  return (
    <AppButton
      onClick={handleDownload}
      disabled={!hasData}
      loading={isGenerating}
      loadingMessage="Generating PDF..."
    >
      Download PDF
    </AppButton>
  )
}

export default PDFDownload
