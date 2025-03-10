import { useTheme, Box, Typography } from "@mui/material";
import { tokens } from "../theme";

const CustomNodeTooltip = ({ node, initialNode }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // Log the full node data for inspection
  console.log("Tooltip node:", node);

  // Log the initial node if needed for comparisons
  console.log("Initial node:", initialNode);

  // Safely access node properties, with fallback values
  const songTitle = node.data?.id || node.id || "Unknown Song"; // Prefer node.data.id, fallback to node.id
  const toSegues = node.data?.to_song_segue_count || 0; // Default to 0 if not available
  const fromSegues = node.data?.from_song_segue_count || 0; // Default to 0 if not available

  console.log("Song Title:", songTitle);
  console.log("To Segues:", toSegues);
  console.log("From Segues:", fromSegues);

  return (
    <Box
      style={{
        background: colors.greenAccent[500],
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "8px",
        fontSize: "14px",
        color: colors.grey[900],
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      }}
    >
      {/* Display song title */}
      <Box style={{ fontWeight: "bold", marginBottom: "4px" }}>
        {songTitle}
      </Box>

      {/* Display segue counts */}
      <Box>
      {songTitle} {'>'} {initialNode.id}: <strong>{toSegues}</strong> 
      </Box>
      <Box>
      {initialNode.id} {'>'} {songTitle}: <strong>{fromSegues}</strong> 
      </Box>
    </Box>
  );
};

export default CustomNodeTooltip;
