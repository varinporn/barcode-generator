import React from "react"
import {
  Box,
  Typography,
  Stack,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined"

import DeleteIcon from "@mui/icons-material/Delete"
import type { CsvData } from "../../types/types"

interface Props {
  data: CsvData[]
  onEdit?: (row: CsvData) => void
  onDelete?: (row: CsvData) => void
}

interface Column {
  id: "No" | "Organization Name" | "Staff ID" | "Full Name" | "Actions"
  label: string
  minWidth?: number
  align?: "left" | "center"
}

const columns: readonly Column[] = [
  { id: "No", label: "No", minWidth: 80 },
  { id: "Organization Name", label: "Organization Name", minWidth: 140 },
  { id: "Staff ID", label: "Staff ID", minWidth: 140 },
  { id: "Full Name", label: "Full Name", minWidth: 140 },
  { id: "Actions", label: "Actions", minWidth: 100, align: "center" },
]

const DataTable = ({ data, onEdit, onDelete }: Props) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Box
      sx={{
        paddingX: 2,
        paddingTop: 2,
        paddingBottom: 4,
        bgcolor: "#FFFFFF",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, color: "#000000" }}
          >
            Imported Data
          </Typography>
          <Typography variant="body2" color="text.disabled">
            Data from your csv file
          </Typography>
        </Box>
      </Stack>

      <Divider />

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 320 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        if (column.id === "Actions") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Stack
                                direction="row"
                                spacing={1.5}
                                justifyContent="center"
                              >
                                {/* <Tooltip title="Edit">
                                  <IconButton
                                    size="small"
                                    onClick={() => onEdit?.(row)}
                                    sx={{
                                      color: "text.secondary",
                                      border: "1px solid",
                                      borderColor: "divider",
                                      borderRadius: "8px",
                                    }}
                                  >
                                    <ModeEditOutlineOutlinedIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip> */}

                                <Tooltip title="Delete">
                                  <IconButton
                                    size="small"
                                    onClick={() => onDelete?.(row)}
                                    sx={{
                                      color: "text.secondary",
                                      border: "1px solid",
                                      borderColor: "divider",
                                      borderRadius: "8px",
                                    }}
                                  >
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            </TableCell>
                          )
                        }

                        const value = row[column.id as keyof CsvData]
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 20]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}

export default DataTable
