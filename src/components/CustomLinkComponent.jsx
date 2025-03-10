const CustomLinkComponent = ({ link }) => {
  return (
    <line
      x1={link.source.x}
      y1={link.source.y}
      x2={link.target.x}
      y2={link.target.y}
      stroke={link.color || "black"}
      strokeWidth={link.thickness || 1}
      strokeDasharray={link.style === "dashed" ? "4 2" : "none"} // Dashed or solid
    />
  );
};

export default CustomLinkComponent;