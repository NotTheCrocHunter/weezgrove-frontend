import { Box } from "@mui/material";
import Header from "../../components/Header";
import CirclePackingChart from "../../components/CirclePackingChart";


const Circle = () => {
  return (
    <Box m="20px">
      <Header title="Circle Packing" subtitle="Circle Packing Chart" />
      <Box height="75vh">
        <CirclePackingChart />
      </Box>
    </Box>
  );
};

export default Circle;
