import { Box } from "@mui/material";
import Header from "../../components/Header";
import NetworkChart from "../../components/NetworkChart";

const Network = () => {
  return (
    <Box m="20px">
      <Header title="Network Chart" subtitle="Simple Network Chart" />
      <Box height="75vh">
        <NetworkChart />
      </Box>
    </Box>
  );
};

export default Network;
