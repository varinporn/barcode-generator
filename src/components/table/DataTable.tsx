import { useMemo } from 'react'
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table'
import { MenuItem } from '@mui/material'

import { type CsvData } from '../../types/types'

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
        size: 240,
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
        accessorKey: 'barcode',
        header: 'Barcode',
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
    renderRowActionMenuItems: () => [<MenuItem key="action">Action</MenuItem>],
  })

  return <MaterialReactTable table={table} />
}

export default DataTable
