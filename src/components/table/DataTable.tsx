import { useMemo } from 'react'
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table'
import { MenuItem } from '@mui/material'

import { type CsvData } from '../../types/types'
import { getBarcodeUrl } from '../../utils/BarcodeUtils'

interface Props {
  data: CsvData[]
}

const DataTable = ({ data }: Props) => {
  const columns = useMemo<MRT_ColumnDef<CsvData>[]>(
    () => [
      {
        accessorKey: 'no',
        enableColumnPinning: false,
        header: 'No',
        size: 130,
        muiTableBodyCellProps: {
          sx: {
            pl: 4,
            pr: 2,
          },
        },
        muiTableHeadCellProps: {
          sx: {
            pl: 4,
            pr: 2,
          },
        },
      },
      {
        accessorKey: 'organizationName',
        header: 'Organization Name',
      },
      {
        accessorKey: 'staffId',
        header: 'Staff ID',
      },
      {
        accessorKey: 'fullName',
        header: 'Full Name',
      },
      {
        id: 'barcode',
        header: 'Barcode',
        size: 240,
        accessorFn: (row) =>
          `${row.organizationName}|${row.staffId}|${row.fullName}`,
        Cell: ({ cell }) => {
          const value = cell.getValue<string>()
          if (!value) return '-'

          const barcodeUrl = getBarcodeUrl(value)

          return <img src={barcodeUrl} alt={value} style={{ height: 60 }} />
        },
      },
    ],
    [],
  )

  const table = useMaterialReactTable({
    columns,
    data,

    enableColumnPinning: true,
    enableRowActions: true,
    positionActionsColumn: 'last',
    layoutMode: 'semantic',
    muiTableContainerProps: {
      sx: {
        minHeight: 300,
        maxHeight: 500,
      },
    },
    renderRowActionMenuItems: () => [<MenuItem key="action">Action</MenuItem>],
  })

  return <MaterialReactTable table={table} />
}

export default DataTable
