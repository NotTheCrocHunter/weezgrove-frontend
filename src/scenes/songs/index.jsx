import { Box } from "@mui/material";
import Header from "../../components/Header";
import SongDataGrid from "../../components/SongDataGrid";

const Songs = () => {
  return (
    <Box m="20px">
      <Header title="Song Data Grid" subtitle="Simple Song Data Grid" />
      <Box height="75vh">
        <SongDataGrid />
      </Box>
    </Box>
  );
};

export default Songs;
