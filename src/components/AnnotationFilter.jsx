import {
  Autocomplete,
  Box,
  TextField,
  Checkbox,
  ListItemText,
} from "@mui/material";

const AnnotationFilter = ({
  filterKey,
  selectedAnnotations,
  onFilterChange,
  annotationFilters,
}) => {

  const handleChange = (event, value) => {
    console.log("Selected annotations:", value);

    // Send the full objects to the parent (index.jsx)
    onFilterChange(filterKey, value);
  };

  // Convert selectedAnnotations to the expected structure for Autocomplete
  const selectedAnnotationsObjects = annotationFilters.filter(annotation =>
    selectedAnnotations.some(selected =>
      annotation.value.includes(selected)
    )
  );

  return (
    <Box>
      <Autocomplete
        sx={{ width: "100%", m: 1, minWidth: 150, maxWidth: 280 }}
        multiple
        options={annotationFilters || []}
        getOptionLabel={(option) => option?.label || ""}
        onChange={handleChange}
        value={selectedAnnotationsObjects}
        isOptionEqualToValue={(option, value) => option.label === value.label}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField {...params} label="Select Annotations" />
        )}
        renderOption={(props, option) => (
          <li {...props} key={option.label}>
            <Checkbox
              checked={selectedAnnotationsObjects.some(selected => selected.label === option.label)}
            />
            <ListItemText primary={option.label} />
          </li>
        )}
      />
    </Box>
  );
};

export default AnnotationFilter;
