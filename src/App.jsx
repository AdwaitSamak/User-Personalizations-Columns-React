import { useState } from 'react'
import './App.css'
import Grid from './comps/Grid/Grid'
// import Checkbox from './comps/Checkbox'
import AGGridWithCheckbox from './comps/AgGridCheckboxTable'
import AgGridCheckboxTable from './comps/AgGridCheckboxTable';
// import 'ag-grid-enterprise' 

function App() {
  const [count, setCount] = useState(0)
  const columnDefs = [                       //array of objects
    { headerName: 'Sr. No.', field: 'col1' },
    { headerName: 'First Name', field: 'col2' },
    { headerName: 'Last Name', field: 'col3' },
    // Add more columns as needed
  ];

  const rowData = [
    { col1: '1', col2: 'Adwait', col3: 'Samak' },
    { col1: '2', col2: 'Ayush', col3: 'Wadalkar' },
    // { col1: '2', col2: 'Ayush', col3: 'Wadalkar' },
    // Add more rows as needed
  ];

  return (
    <>
      <Grid columnDefs={columnDefs} rowData={rowData}/>
      {/* <AgGridCheckboxTable columnDefs={columnDefs} rowData={rowData}/> */}
    </>
  )
}

export default App
