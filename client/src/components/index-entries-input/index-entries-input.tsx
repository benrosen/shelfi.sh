import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

// TODO remember page size
export const IndexEntriesInput = () => {
  const [rowsPerPageOptions, setRowsPerPageOptions] = useState([5, 25, 100]);

  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const [rows, setRows] = useState([]);

  return (
    <DataGrid
      autoHeight
      columns={[
        {
          field: "label",
          headerName: "Topic",
          editable: true,
          type: "string",
          flex: 1,
        },
        {
          field: "pages",
          headerName: "Locations",
          editable: true,
          type: "string",
          flex: 1,
        },
      ]}
      rows={rows}
      pageSize={rowsPerPage}
      rowsPerPageOptions={rowsPerPageOptions}
      onPageSizeChange={setRowsPerPage}
    />
  );
};
