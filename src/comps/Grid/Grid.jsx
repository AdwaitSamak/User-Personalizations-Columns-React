import React, { useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-enterprise";
import "./Grid.css";

function Grid({ rowData, columnDefs }) {
  // let gridApi = null;
  let gridApi = useRef(null); //stores gridapi reference between re renders
  const [showPreferences, setShowPreferences] = useState(false);
  const [userpreferencemap, setUserpreferencemap] = useState({});

  useEffect(() => {
    // jab component start hoga, apan local storage se userpreferencemap uthayenge
    const storedPreferences = localStorage.getItem("userpreferencemap");
    if (storedPreferences) {
      setUserpreferencemap(JSON.parse(storedPreferences));
    } else {
      // initial case me agar userpreference map nahi mila to apan sare columns ko initially true set kr denge, so that all are visible
      const initialPreferences = {};
      columnDefs.forEach((column) => {
        initialPreferences[column.field] = true;
      });
      setUserpreferencemap(initialPreferences);
    }
  }, [columnDefs]);

  useEffect(() => {
    if (gridApi.current && columnDefs) {         //if both are present 
      const visibleColumns = columnDefs.filter(
        (column) => userpreferencemap[column.field] === true       //filters out those columns which are visible      
      );
      // console.log(visibleColumns);    //returns array of objects

      const gridWidth = document.querySelector(".ag-theme-quartz").clientWidth;    //width of the ag grid
      const columnWidth = gridWidth / visibleColumns.length;    //each column are given equal width according to the number of visible column count

      visibleColumns.forEach((column) => {     //for each column we chnage width
        gridApi.current.setColumnWidth(column.field, columnWidth);
      });
    }
  }, [userpreferencemap, columnDefs]);        //agar visible columns change hue(userpreferencemap) ya phir columns change hue, then this will trigger useeffect hook

  const onGridReady = (params) => {
    gridApi.current = params.api; // Initialize the grid and give access to the grid API
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
    localStorage.setItem(
      "userpreferencemap",
      JSON.stringify(userpreferencemap)
    );
  };

  return (
    <div className="ag-theme-quartz" style={{ height: 500, width: 650 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs.filter(
          (column) => userpreferencemap[column.field]
        )}
        onGridReady={onGridReady}
        suppressHorizontalScroll={true}              //disables horizontal scroll
      />
      <div className="preferences">
        <button onClick={handlePreferences} style={{width:100, height:40}}>Preferences</button>
      </div>
      <div>
        {showPreferences && (
          <div className="preferencesdiv">
            {columnDefs.map((column) => (
              <label key={column.field}>
                <input
                  type="checkbox"
                  checked={userpreferencemap[column.field]}
                  onChange={(e) =>
                    handleOnChangeCheckbox(column.field, e.target.checked)
                  }
                />
                {column.headerName}
              </label>
            ))}
          </div>
        )}
      </div>
      <button onClick={savepreferences} style={{width:100, height:40}}>Save</button>
    </div>
  );
}

export default Grid;
