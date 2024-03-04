import React, { useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-enterprise";
import "./Grid.css";

function Grid({ rowData, columnDefs }) {
  let gridApi = null
  const [showPreferences, setShowPreferences] = useState(false);
  const [userpreferencemap, setUserpreferencemap] = useState({});

  useEffect(() => {
    // Load user preferences from local storage when component starts
    const storedPreferences = localStorage.getItem("userpreferencemap");
    if (storedPreferences) {
      setUserpreferencemap(JSON.parse(storedPreferences));
    } else {
      // If no preferences found, set all columns to be visible by default
      const initialPreferences = {};
      columnDefs.forEach((column) => {
        initialPreferences[column.field] = true;
      });
      setUserpreferencemap(initialPreferences);
    }
  }, [columnDefs]);

  useEffect(() => {
    if (gridApi && columnDefs) {
      columnDefs.forEach((column) => {
        gridApi.setColumnVisible(column.field, userpreferencemap[column.field]);
      });
    }
  }, [userpreferencemap]);

  const onGridReady = (params) => {
    gridApi=params.api // Initialize the grid and give access to the grid API
  };

  const handleOnChangeCheckbox = (field, checked) => {
    setUserpreferencemap((prevPreferences) => ({
      ...prevPreferences,
      [field]: checked,
    }));
  };

  const handlePreferences = (e) => {
    e.preventDefault();
    setShowPreferences((prev) => !prev);
    if (!showPreferences) alert("Deselect the columns you want to hide");
  };

  const savepreferences = (e) => {
    e.preventDefault();
    localStorage.setItem("userpreferencemap", JSON.stringify(userpreferencemap));
  };

  return (
    <div className="ag-theme-quartz" style={{ height: 500, width: 610 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs.filter((column) => userpreferencemap[column.field])}
        onGridReady={onGridReady}
      />
      <div className="preferences">
        <button onClick={handlePreferences}>Preferences</button>
      </div>
      <div>
        {showPreferences && (
          <div className="preferencesdiv">
            {columnDefs.map((column) => (
              <label key={column.field}>
                <input
                  type="checkbox"
                  checked={userpreferencemap[column.field]}
                  onChange={(e) => handleOnChangeCheckbox(column.field, e.target.checked)}
                />
                {column.headerName}
              </label>
            ))}
          </div>
        )}
      </div>
      <button onClick={savepreferences}>Save</button>
    </div>
  );
}

export default Grid;
