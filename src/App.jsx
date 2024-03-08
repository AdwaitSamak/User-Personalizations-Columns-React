import { useEffect, useState } from "react";
import "./App.css";
import Grid from "./comps/Grid/Grid";
import axios from "axios";

function App() {
  const [rowData, setRowData] = useState([]);

  //HRADCODED ENTRIES
  // const columnDefs = [                       //array of objects
  //   { headerName: 'Sr. No.', field: 'col1' },
  //   { headerName: 'First Name', field: 'col2' },
  //   { headerName: 'Last Name', field: 'col3' },
  //   // Add more columns as needed
  // ];

  // const rowData = [
  //   { col1: '1', col2: 'Adwait', col3: 'Samak' },
  //   { col1: '2', col2: 'Ayush', col3: 'Wadalkar' },
  //   // { col1: '2', col2: 'Ayush', col3: 'Wadalkar' },
  //   // Add more rows as needed
  // ];

  // useEffect(() => {     //FETCHING DATA USING FETCH
  //   const url = "http://localhost:4000/users";
  //   const response = async function getresponse() {
  //     try {
  //       const resp = await fetch(url);
  //       const data = await resp.json();
  //       setRowData(data);
  //     } catch (error) {
  //       console.log("Error in fetching data", error);
  //     }
  //   };
  //   response();
  // }, []);

  // const rowData = response.users;   //only this wont work beacause we arwe not waiting for the data to be fetched

  useEffect(() => {     //using axios to get the json data
    const url = "http://localhost:4000/users";
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setRowData(response.data);
      } catch (error) {
        console.log("Error in fetching data", error);
      }
    };
    fetchData();
  }, []);

  const columnDefs = [
    { headerName: "Sr. No.", field: "srno" },
    { headerName: "First Name", field: "fname" },
    { headerName: "Last Name", field: "lname" },
  ];

  return <Grid columnDefs={columnDefs} rowData={rowData} />

}

export default App;
