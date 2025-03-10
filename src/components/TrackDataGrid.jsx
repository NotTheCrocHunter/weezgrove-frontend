import React from "react";
import { Box  } from "@mui/material";
import { DataGrid  } from "@mui/x-data-grid";
import SongWithAnnotationsCell from "./SongWithAnnotationsCell";
import SegueCell from "./SegueCell";


const columns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "prevSongWithAnnotations",
    headerName: "Prev Track",
    flex: 1,
    minWidth: 180,
    width: 200,
    renderCell: (params) => (
      <SongWithAnnotationsCell
        title={params.row.previous_track_title}
        annotations={params.row.previous_track_annotations}
      />
    ),
  },
  {
    field: "segue_from_previous",
    headerName: ">",
    width: 50,
    filterable: true,
    type: "boolean",
    renderCell: (params) => <SegueCell value={params.value} />,
  },
  {
    field: "songWithAnnotations",
    headerName: "Track",
    minWidth: 180,
    width: 200,
    flex: 1,
    renderCell: (params) => (
      <SongWithAnnotationsCell
        title={params.row.song_title}
        annotations={params.row.annotations}
      />
    ),
  },
  {
    field: "segue_to_next",
    headerName: ">",
    width: 50,
    filterable: true,
    type: "boolean",
    renderCell: (params) => <SegueCell value={params.value} />,
  },
  {
    field: "nextSongWithAnnotations",
    headerName: "Next Track",
    minWidth: 180,
    width: 200,
    flex: 1,
    renderCell: (params) => (
      <SongWithAnnotationsCell
        title={params.row.next_track_title}
        annotations={params.row.next_track_annotations}
      />
    ),
  },

  // SHOW INFO
  { field: "show_date", headerName: "Show Date", width: 100 },
  { field: "shows_ago", headerName: "Shows Ago", width: 75 },
 

  // Segue Info
  { field: "next_song_segue_title", headerName: "Segue", width: 200 },
  { field: "next_song_segue_count", headerName: "Segue Count", width: 100 },

  // Track and Song info
  { field: "previous_track_title", headerName: "Prev Song", width: 120 },

  { field: "song_title", headerName: "Song", width: 120 },

  { field: "next_track_title", headerName: "Next Track", width: 120 },

  {
    field: "previous_song_times_played",
    headerName: "Prev Times Played",
    width: 150,
  },
  { field: "previous_track_annotations", headerName: "Prev Notes", width: 150 },

  { field: "song_times_played", headerName: "Song Times Played", width: 150 },
  { field: "annotations", headerName: "Notes" },

  {
    field: "next_song_times_played",
    headerName: "Next Times Played",
    width: 150,
  },
  { field: "next_track_annotations", headerName: "Next Notes", width: 150 },

  { field: "position_show", headerName: "Show Pos", width: 70 },
  { field: "set", headerName: "Set", width: 50 },
  { field: "position_set", headerName: "Set Pos", width: 60 },
];

const columnGroupingModel = [
  {
    groupId: "Tracks",
    children: [
      { field: "prevSongWithAnnotations" },
      { field: "segue_from_previous" },
      { field: "songWithAnnotations" },
      { field: "segue_to_next" },
      { field: "nextSongWithAnnotations" },
    ],
  },
  {
    groupId: "Song Info",
    children: [
      { field: "previous_track_title", headerName: "Prev Song" },
      { field: "song_title", headerName: "Song" },
      { field: "next_track_title" },
      { field: "previous_song_times_played" },
      { field: "previous_track_annotations" },
      { field: "song_times_played" },
      { field: "annotations" },
      { field: "next_song_times_played" },
      { field: "next_track_annotations" },
    ],
  },

  {
    groupId: "Show Info",
    children: [
      { field: "show_date" },
      { field: "shows_ago" },
      { field: "position_show" },
      { field: "set" },
      { field: "position_set" },
    ],
  },
  {
    groupId: "Segue Info",
    children: [
      { field: "next_song_segue_title" },
      { field: "next_song_segue_count" },
    ],
  },
];

const TrackDataGrid = ({
  tracks,
  loading,
  totalRows,
  sortModel,
  paginationModel,
  onPaginationModelChange,
  onSortModelChange,
  colors,
  gridContainerRef, //receiving the ref here 
}) => {
  return (
    <Box
      ref={gridContainerRef}  // Atach ref to the container
      m="20px 0 0 0"
      height="75vh"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
          whiteSpace: "normal", // ✅ Allows line breaks
          overflow: "hidden", // ✅ Prevents clipping
          display: "block", // ✅ Ensures all content is shown
          textOverflow: "ellipsis", // Ensures text truncation instead of breaking layout
          wordBreak: "break-word",
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
        rows={tracks}
        columns={columns}
        columnGroupingModel={columnGroupingModel}
        loading={loading}
        getRowHeight={() => 'auto'}
        disableRowSelectionOnClick
        paginationMode="server" // Enable server-side pagination
        rowCount={totalRows} // Total count from API
        pageSizeOptions={[10, 25, 50, 100]}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        sortingMode="server"
        onSortModelChange={(sortModel) => onSortModelChange(sortModel)}
        initialState={{
          columns: {
            columnVisibilityModel: {
              // Hide columns for player ID, the other columns will remain visible
              id: false,
              segue_id: false,
              all_timer: false,
              songWithAnnotations: true,
            },
          },
        }}
      />
    </Box>
  );
};

export default TrackDataGrid;
