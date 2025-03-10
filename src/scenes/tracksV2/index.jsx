import { Box } from "@mui/material";
import Header from "../../components/Header";
import Tracks from "../../components/Tracks";

const TracksMRT = () => {
  return (
    <Box m="20px">
      <Header title="DeeperBiscuits" subtitle="Tracks" />
      <Box height="75vh">
        <Tracks />
      </Box>
    </Box>
  );
};

export default TracksMRT;
