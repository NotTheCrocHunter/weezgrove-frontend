import React from "react";
import { Box, useTheme, Typography } from "@mui/material";

const SongWithAnnotationsCell = ({ title, annotations }) => {
  // Ensure annotations is an array
  let processedAnnotations = annotations || [];

  if (typeof processedAnnotations === "string") {
    try {
      processedAnnotations = JSON.parse(processedAnnotations);
    } catch (error) {
      console.error("Failed to parse annotations:", error);
      processedAnnotations = [];
    }
  } else if (typeof processedAnnotations === "object") {
    processedAnnotations = Object.values(processedAnnotations);
  }

  // Determine the separator based on segue_to_next
  // Removed - leaving the column, for now
  //const songSuffix = segueToNext ? " > " : ", ";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "normal",
        wordWrap: "break-word",
      }}
    >
      <Box>
        <Typography fontSize="1.2em" fontWeight="bold">
          {title}
        </Typography>
      </Box>
      {processedAnnotations.length > 0 ? (
        <ul style={{ margin: 0, paddingLeft: "5px", fontSize: "1em" }}>
          {processedAnnotations.map((note, index) => (
            <li sx={{paddingLeft:"2px"}} key={index}>{note}</li>
          ))}
        </ul>
      ) : null}
    </Box>
  );
};

export default SongWithAnnotationsCell;
