import React, { useState } from "react"
import DataTable from "./DataTable"
import PopupModal from "../PopupModal"
import { type CsvData } from "../../types/types"

interface Props {
  data: CsvData[]
  setData: React.Dispatch<React.SetStateAction<CsvData[]>>
}

const TableSection = ({ data, setData }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState<CsvData | null>(null)

  const handleDeleteClick = (row: CsvData) => {
    setSelectedRow(row)
    setIsModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (selectedRow) {
      const updatedData = data.filter(
        (item) => item["Staff ID"] !== selectedRow["Staff ID"],
      )
      setData(updatedData)
    }
  }

  return (
    <>
      <DataTable data={data} onDelete={handleDeleteClick} />

      <PopupModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        heading="Confirm Deletion"
        message={`Are you sure you want to delete ${selectedRow?.["Full Name"]}?`}
        confirmButton="Delete"
      />
    </>
  )
}

export default TableSection
