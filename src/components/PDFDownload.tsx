import { useState } from "react"
import { pdf } from "@react-pdf/renderer"
import { saveAs } from "file-saver"
import PDFDocument from "./PDFDocument"

const PDFDownload = ({ data }: { data: any[] }) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const hasData = data.length > 0

  const handleDownload = async () => {
    setIsGenerating(true)

    setTimeout(async () => {
      try {
        const doc = <PDFDocument data={data} />
        const blob = await pdf(doc).toBlob()
        saveAs(blob, "generate_barcode.pdf")
      } catch (error) {
        console.error("PDF Error:", error)
      } finally {
        setIsGenerating(false)
      }
    }, 100)
  }

  return (
    <div className="flex justify-end mb-4">
      <button
        onClick={handleDownload}
        disabled={!hasData || isGenerating}
        className={`${
          !hasData
            ? "bg-gray-300 cursor-not-allowed"
            : isGenerating
              ? "bg-gray-400 animate-pulse cursor-wait"
              : "bg-blue-600 hover:bg-blue-700 shadow-sm cursor-pointer"
        } text-white px-6 py-2.5 rounded-lg font-semibold transition`}
      >
        {isGenerating ? `Generating PDF...` : "Download PDF"}
      </button>
    </div>
  )
}

export default PDFDownload
