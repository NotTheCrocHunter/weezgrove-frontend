import { Autocomplete, Box, TextField, } from "@mui/material";

const SongFilter = ({ filterKey, songFilters, selectedSongs, onFilterChange }) => {

  const handleSongChange = (event, value) => {
    const slugs = value
      .filter((song) => song && song.slug)
      .map((song) => song.slug);

    onFilterChange(filterKey, slugs); // Update parent filter with selected song slugs
  };

  const filterLabels = {
    currentSongs: "Select Current Songs",
    nextSongs: "Select Next Songs",
    prevSongs: "Select Previous Songs",
  };

  // Retrieve the label based on the filterKey
  const label = filterLabels[filterKey] || "Select Songs";

  return (
    <Box>
      {/* Song Filter */}
      <Autocomplete
        sx={{ width: "100%", m: 1, minWidth: 150, maxWidth: 280,  }}
        multiple
        options={songFilters}
        getOptionLabel={(option) => option.title}
        isOptionEqualToValue={(option, value) => option.slug === value.slug}
        onChange={handleSongChange}
        renderInput={(params) => <TextField {...params} label={label} />}
        renderOption={(props, option) => (
          <li {...props} key={option.slug}>
            {option.title}
          </li>
        )}
      />

    </Box>
  );
};

export default SongFilter;
