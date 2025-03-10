import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { ResponsiveCirclePacking } from "@nivo/circle-packing";
import { useEffect, useState } from "react";
//import { mockCircleData as data } from "../data/mockCircleData";
//import axios from 'axios';


const CirclePackingChart = ({
  isCustomLineColors = false,
  isDashboard = false,
}) => {
  const theme = useTheme();
  const [data, setData] = useState(null);
  const colors = tokens(theme.palette.mode);
  const [zoomedId, setZoomedId] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/circle-data/?limit=10");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    
    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  const commonProperties = {
    width: 800, // Adjust width and height as needed
    height: 800,
    margin: { top: 20, right: 20, bottom: 20, left: 20 },
    colors: { scheme: "nivo" },
    data: data, // Or replace with your data
    id: "id", // Replace 'id' with the key that contains the unique identifier in your data
    value: "value", // Replace 'value' with the key that contains the value in your data
  };
  return (
    <ResponsiveCirclePacking
      data={data}
      //{...commonProperties}
      theme={{
        text: {
          fill: colors.grey[500],
        },
        tooltip:{
          container:{
            background: colors.greenAccent[500],
          },
        },
      }}
      leavesOnly="false"
      enableLabels
      labelsSkipRadius={16}
      labelsFilter={(label) => label.node.height === 0}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      zoomedId={zoomedId}
      motionConfig="slow"
      onClick={(node) => {
        setZoomedId(zoomedId === node.id ? null : node.id);
      }}
    />
  );
};

export default CirclePackingChart;
