import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table'
import type { RootState } from '../../stores/store'
import { type Resource } from '../../types/types'
import { getBarcodeUrl } from '../../utils/BarcodeUtils'

const DataTable = () => {
  const data = useSelector((state: RootState) => state.resource.resources)
  const columns = useMemo<MRT_ColumnDef<Resource>[]>(
    () => [
      {
        enableColumnPinning: false,
        header: 'No',
        Cell: ({ row }) => row.index + 1,
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
        filterVariant: 'select',
        filterSelectOptions: ['TTB'],
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
    initialState: {
      columnFilters: [],
    },
    enableColumnPinning: true,
    layoutMode: 'semantic',
    muiTableContainerProps: {
      sx: {
        minHeight: 300,
        maxHeight: 500,
      },
    },
  })

  return <MaterialReactTable table={table} />
}

export default DataTable
