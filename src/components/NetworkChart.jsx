import { useTheme, Box, Typography } from "@mui/material";
import { tokens } from "../theme";
import { ResponsiveNetwork } from "@nivo/network";
import { useEffect, useState } from "react";
import CustomNodeComponent from "./CustomNodeComponent";
import SongDropdown from "./SongDropdown";
import CustomLinkComponent from "./CustomLinkComponent";
import CustomNodeTooltip from "./CustomNodeTooltip";

const NetworkChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState(null);
  const [selectedSong, setSelectedSong] = useState("Basis For A Day");
  const [initialNode, setInitialNode] = useState(null); // To store the central node
  console.log('inital node 1', initialNode)
  useEffect(() => {
    fetch(`http://localhost:8000/api/network-data/?song_title=${selectedSong}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        // Find the central node after fetching the data
        const foundNode = data.nodes.find((node) => node.id === selectedSong);
        setInitialNode(foundNode); // Update the initialNode state
      });
  }, [selectedSong]);

  if (!data || !initialNode) return <div>Loading...</div>;
  console.log("log outside of useEffect", data);
  console.log('inital node 2', initialNode)

  return (
    <ResponsiveNetwork
      data={data}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      theme={{
        text: {
          fill: colors.grey[500],
        },
        tooltip: {
          container: {
            background: colors.greenAccent[500],
          },
        },
      }}
      centeringStrength={0.3}
      nodeColor={(node) => colors.blueAccent[400]} // Use your theme for node colors
      nodeSize={(node) => node.size || 12} // Default size or size from the data
      activeNodeSize={(n) => 36}
      inactiveNodeSize={(n) => 12}
      linkComponent={CustomLinkComponent}
      linkColor={(link) => colors.greenAccent[800]} // Link color based on theme
      motionConfig="wobbly"
      nodeTooltip={(node) => (
        <CustomNodeTooltip 
          node={node.node} 
          initialNode={initialNode} 
          />
      )}
      //nodeComponent={CustomNodeComponent}
      repulsivity={400} // Increases the space between nodes
      layers={[ "links", "nodes", "annotations",]} //optional - default:['links', 'nodes', 'annotations']
      //annotations={[
      //  {
      //    type: "circle",
      //    match: {
      //      id: "Basis For A Day",
      //    },
      //    note: "Basis For A Day",
      //    noteX: 0,
      //    noteY: 0,
      //    //offset: 3,
      //    //noteTextOffset: 3
      //  },
      //]}
      // iterations={120} // Higher iterations for better node placement
    />
  );
};
export default NetworkChart;
