import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";

function AgGridCheckboxTable({ rowData, columnDefs }) {
  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    console.log(params);
    setGridApi(params.api);     //stores reference to the grid 
  };

  const handleCheckboxChange = (field, event) => {
    if (event.target.checked===true) {
      gridApi.setColumnVisible(field, false);       
    } else {
      gridApi.setColumnVisible(field, true);
    }
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
      />
      <div>
        {columnDefs.map((column) => (
          <div key={column.field}>
            <input
              type="checkbox"
              checked={column.visible}
              onChange={(e) => handleCheckboxChange(column.field, e)}
            />
            {column.headerName}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AgGridCheckboxTable;