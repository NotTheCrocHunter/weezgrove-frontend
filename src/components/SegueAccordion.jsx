import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function SeguesAccordion({ seguesData }) {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the data from your API endpoint
    fetch("http://localhost:8000/api/segues/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API response results", data.results); // Log the data to ensure it's correct
        setData(data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <Box>
      {data.map((segue, index) => (
        <Accordion
          key={segue.id}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Box>
              <Typography>{segue.segue_title}</Typography>
              <Typography variant="body2">
                Segue Count: {segue.segue_count}
              </Typography>
            </Box>
          </AccordionSummary>

          <AccordionDetails>
            {/* Details for each segue */}

            {/* Show data in a table */}
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Show Date</TableCell>
                    <TableCell>{segue.from_song}</TableCell>
                    <TableCell>{segue.to_song}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {segue.tracks.map((track, trackIndex) => (
                    <TableRow key={trackIndex}>
                      <TableCell>{track.show_date}</TableCell>
                      <TableCell>{track.annotations}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
 

            {/* Add details for to_tracks as needed */}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

export default SeguesAccordion;
