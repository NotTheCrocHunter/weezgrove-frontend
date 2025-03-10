//import { Typography } from "@mui/material";
import { memo } from 'react'
import { animated, to } from '@react-spring/web'
import { InputNode, NodeProps } from './types'


const CustomNodeComponent = ({
  node,
  animated: animatedProps,
  onClick,
  isActive,
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
}) => {
  const padding = 4;
  const charWidth = 6;
  const maxRadius = 75;
  const textLength = node.data.id.length;
  const baseRadius = node.data.size || 12; // Default size from node data
  const activeRadius = isActive ? 36 : baseRadius; // Larger size if the node is active
  const isCenterNode = node.data.height === 2; // Center node logic

  // Determine the size based on whether the node is active, inactive, or the center node
  let circleRadius;
  if (node.data.height === 2) {
    // Center node retains its size
    circleRadius = Math.min((textLength * charWidth) / 2 + padding, maxRadius);
  } else if (isActive) {
    // Active node grows larger
    circleRadius = Math.min((textLength * charWidth) / 2 + padding, maxRadius);
  } else {
    // Inactive nodes shrink
    circleRadius = 6; // Define a small size for inactive nodes
  }

  return (
    <g
      transform={`translate(${node.x}, ${node.y})`}
      onMouseEnter={(event) => onMouseEnter?.(event, node)}
      onMouseMove={(event) => onMouseMove?.(event, node)}
      onMouseLeave={(event) => onMouseLeave?.(event, node)}
    >
      {/* Circle for the node */}
      <animated.circle
        r={isCenterNode ? circleRadius : activeRadius} // Use larger size for center or active node
        fill={node.color || "lightgray"} // Node fill color
        stroke={isActive ? "orange" : "black"} // Highlight active nodes
        strokeWidth={isActive ? 3 : 2} // Thicker outline for active nodes
      />

      {/* Text inside the node */}
      {(isCenterNode || isActive) && (
        <text
          fill="black" // Text color
          textAnchor="middle" // Center-align horizontally
          dominantBaseline="central" // Center-align vertically
          fontSize={isCenterNode ? 14 : 10} // Slightly larger font for center node
        >
          {node.id} {/* Show the title */}
        </text>
      )}
    </g>
  );
};

export default CustomNodeComponent;
