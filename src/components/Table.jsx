import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import {
 Table,
 TableBody,
 TableContainer,
 TableHead,
 TableRow,
 Paper,
 TablePagination,
} from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.black,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const ReusableTable = ({ columns= [], data=[],   defaultRowsPerPage = 5 , multipleRow=false}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // 👉 slice data based on pagination
  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
 return (
   <TableContainer component={Paper}   sx={{ borderRadius: 3 }}
>
     <Table>
       {/* Render Table Headers */}
       <TableHead>
         <TableRow>
           {columns.map((column) => (
             <StyledTableCell key={column.field}>{column.headerName}</StyledTableCell>
           ))}
         </TableRow>
       </TableHead>
       {/* Render Table Rows */}
       <TableBody>
         {paginatedData.map((row, rowIndex) => (
           <StyledTableRow key={rowIndex}>
             {columns.map((column) => (
               <StyledTableCell key={column.field}>
                 {column.render ? column.render(row[column.field]) : row[column.field]}
               </StyledTableCell>
             ))}
           </StyledTableRow>
         ))}
       </TableBody>
     </Table>
       <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
   </TableContainer>
 );
};
export default ReusableTable;