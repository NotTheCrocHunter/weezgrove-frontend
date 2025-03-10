import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar, } from "@mui/x-data-grid";
import { tokens } from "../theme";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "title", headerName: "Song Title", width: 200 },
  { field: "times_played", headerName: "Total Times Played", width: 150 },
  {
    field: "shows_since_last_played",
    headerName: "Shows Since Last Played",
    width: 100,
  },
  { field: "previous_gap", headerName: "Previous Gap" },
  { field: "longest_gaps_data", headerName: "Longest Gaps" },
  { field: "yearly_play_chart_data", headerName: "Yearly Plays" },
  { field: "date_last_played", headerName: "Date Last Played", width: 100 },
  // Add more fields as needed
];


function SongDataGrid() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch the data from your API endpoint
    fetch("http://localhost:8000/api/songs/")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Log the data to ensure it's correct
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
        "& .MuiDataGrid-root": {
            border: "none",
        },
        "& .MuiDataGrid-cell": {
            borderBottom: "none",
        },
        "& .name-column--cell": {
            color: colors.greenAccent[300],
        },
        "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
        },
        "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
        },
        }}
    >
      <DataGrid
        rows={data}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }} // Enables export, filtering, and column selection
        slotProps={{
          color: colors.blueAccent[100],
          button: { variant: "contained" },
          toolbar: {
            sx: {
                color: colors.blueAccent[100],
                button: { variant: "contained" },
                backgroundColor: colors.primary[100],
            }
          }
        }}
        initialState={{
          columns: {
            columnVisibilityModel: {
              // Hide columns for player ID, the other columns will remain visible
              id: false,
            },
          },
        }}
      />
    </Box>
  );
}

export default SongDataGrid;
