import { Box } from "@mui/material";
import Header from "../../components/Header";
import SegueDataGrid from "../../components/SegueDataGrid";

const Songs = () => {
  return (
    <Box m="20px">
      <Header title="Segue Data Grid" subtitle="Simple Segue Data Grid" />
      <Box height="75vh">
        <SegueDataGrid />
      </Box>
    </Box>
  );
};

export default Songs;
