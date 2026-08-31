import {
  Box,
  TablePagination,
} from "@mui/material";

export default function ReportPagination({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [10, 25, 50],
}) {
  return (
    <Box
      sx={{
        borderTop: "1px solid #E5EAF1",
      }}
    >
      <TablePagination
        component="div"
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        onPageChange={(_, newPage) =>
          onPageChange(newPage)
        }
        onRowsPerPageChange={(e) =>
          onRowsPerPageChange(
            Number(e.target.value)
          )
        }
        labelDisplayedRows={({ from, to, count }) =>
          `Showing ${from}–${to} of ${count} entries`
        }
      />
    </Box>
  );
}