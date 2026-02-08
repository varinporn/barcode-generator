import { useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import { saveAs } from 'file-saver'
import PDFDocument from './PDFDocument'
import AppButton from './AppButton'
import { useSelector } from 'react-redux'
import type { RootState } from '../stores/store'

const PDFDownload = () => {
  const data = useSelector((state: RootState) => state.resource.resources)
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
