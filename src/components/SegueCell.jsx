import { Box } from "@mui/material";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

const SegueCell = ({ value }) => {
  return (
    <Box display="flex" alignItems="flex-start" height="100%">
      {value ? <ChevronRightOutlinedIcon /> : ""}
    </Box>
  );
};

export default SegueCell;
