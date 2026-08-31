import React from "react";

import { Box, Paper, Stack } from "@mui/material";

import ReportSearch from "../../components/report/ReportSearch";
import ReportFilters from "../../components/report/ReportFilters";
import ReportColumnSelector from "../../components/report/ReportColumnSelector";
import ReportExportButton from "../../components/report/ReportExportButton";
import ReportTable from "../../components/report/ReportTable";
import ReportPagination from "../../components/report/ReportPagination";

import { businessTravelColumns } from "./businessTravelColumns";

import { businessTravelRows } from "./businessTravelRows";
import BusinessTravelDetailsDialog from "./BusinessTravelDetailsDialog";

export default function BusinessTravelReport() {
  const [search, setSearch] = React.useState("");

  const [filters, setFilters] = React.useState([]);

  const [page, setPage] = React.useState(0);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const [detailsOpen, setDetailsOpen] = React.useState(false);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [visibleColumns, setVisibleColumns] = React.useState(() =>
    businessTravelColumns.reduce((acc, column) => {
      acc[column.field] = true;
      return acc;
    }, {}),
  );

  /*
   * Visible columns
   */

  const displayedColumns = React.useMemo(
    () =>
      businessTravelColumns.filter(
        (column) => visibleColumns[column.field] !== false,
      ),
    [visibleColumns],
  );

  /*
   * API
   */

  // const {
  //   data,
  //   isLoading,
  //   isFetching,
  // } =
  //   useGetBusinessTravelReportQuery({
  //     page: page + 1,
  //     pageSize: rowsPerPage,
  //     search,
  //     filters,
  //   });

  /*
   * API response
   *
   * {
   *   data: [],
   *   totalCount: 100
   * }
   */

  const rows = businessTravelRows ?? [];

  const totalCount = businessTravelRows?.totalCount ?? 0;

  /*
   * Search
   */

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(0);
  };

  /*
   * Filters
   */

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);

    // Always go back to first page
    // when filtering changes.
    setPage(0);
  };

  /*
   * Pagination
   */

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(value);
    setPage(0);
  };
  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setDetailsOpen(true);
  };
  const handleDetailsClose = () => {
    setDetailsOpen(false);
    setSelectedRow(null);
  };
  return (
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 3,
          minWidth: 0,
          backgroundColor: "#F8FAFC",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            border: "1px solid #E5EAF1",
            borderRadius: 3,
            overflow: "hidden",
            width: "100%",
          }}
        >
          {/* Toolbar */}
          <Box sx={{ p: 2.5 }}>
            <Stack
              direction="row"
              spacing={1.25}
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <ReportSearch
                value={search}
                onChange={handleSearchChange}
                placeholder="Search by Request ID, Name, POC, etc."
              />

              <Box sx={{ flexGrow: 1 }} />

              <ReportFilters
                columns={businessTravelColumns}
                value={filters}
                onChange={handleFiltersChange}
              />

              <ReportColumnSelector
                columns={businessTravelColumns}
                visibleColumns={visibleColumns}
                onChange={setVisibleColumns}
              />

              <ReportExportButton
                rows={rows}
                columns={displayedColumns}
                fileName="business-travel-report"
              />
            </Stack>
          </Box>

          {/* Table */}
          <ReportTable
            columns={displayedColumns}
            rows={rows}
            onRowClick={handleRowClick}
          />

          {/* Pagination */}
          <ReportPagination
            count={totalCount}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
          <BusinessTravelDetailsDialog
            open={detailsOpen}
            row={selectedRow}
            onClose={handleDetailsClose}
          />
        </Paper>
      </Box>
  );
}
