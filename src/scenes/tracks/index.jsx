import React, { useEffect, useState, useCallback, useRef } from "react";
import { Box, useTheme, Grid } from "@mui/material";
import Header from "../../components/Header";
import TrackDataGrid from "../../components/TrackDataGrid";
import SongFilter from "../../components/SongFilter";
import AnnotationFilter from "../../components/AnnotationFilter";
import { tokens } from "../../theme";
import axios from "axios";

const Tracks = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });
  const [rowHeight, setRowHeight] = useState(50); // Default row height
  const [totalRows, setTotalRows] = useState(0); // Total from API
  const [sortModel, setSortModel] = useState([]); // <-- Add this line

  const [trackFilters, setTrackFilters] = useState({
    prevSongs: [],
    currentSongs: [],
    nextSongs: [],
    prevAnnotations: [],
    currentAnnotations: [],
    nextAnnotations: [],
  });

  const [songFilters, setSongFilters] = useState([]);
  const [annotationFilters, setAnnotationFilters] = useState([]);

  const gridContainerRef = useRef(null);
  const [resizeTrigger, setResizeTrigger] = useState(0); // State to force re-render

  const fetchTracks = useCallback(async () => {
    setLoading(true);

    let orderBy = "";
    if (sortModel.length > 0) {
      const sortField = sortModel[0].field;
      const sortDirection = sortModel[0].sort === "desc" ? "-" : "";
      orderBy = `${sortDirection}${sortField}`;
    }

    const queryParams = new URLSearchParams({
      page: paginationModel.page + 1,
      page_size: paginationModel.pageSize,
      ...(orderBy && { order_by: orderBy }),
    });

    const paramKeys = {
      currentSongs: "current_songs[]",
      prevSongs: "prev_songs[]",
      nextSongs: "next_songs[]",
      currentAnnotations: "current_annotations",
      prevAnnotations: "prev_annotations",
      nextAnnotations: "next_annotations",
    };

    console.log("trackFilters", trackFilters);

    // Append Songs Filters
    ["prevSongs", "currentSongs", "nextSongs"].forEach((key) => {
      if (trackFilters[key]?.length) {
        trackFilters[key].forEach((song) => {
          queryParams.append(paramKeys[key], song);
        });
      }
    });

    // Append Annotations Filters
    ["prevAnnotations", "currentAnnotations", "nextAnnotations"].forEach(
      (key) => {
        if (trackFilters[key]?.length) {
          trackFilters[key].forEach((annotation) => {
            if (typeof annotation === "string") {
              queryParams.append(paramKeys[key], annotation); // Free text
            } else {
              annotation.value.forEach((val) => queryParams.append(key, val)); // Predefined values
            }
          });
        }
      }
    );

    try {
      const apiUrl = `http://localhost:8000/api/tracks/?${queryParams.toString()}`;

      // Create a cache key using the query string (so different queries are cached separately)
      const cacheKey = `tracks-${apiUrl}`;
      const cachedData = localStorage.getItem(cacheKey);
      const cachedTimestamp = localStorage.getItem(`${cacheKey}-timestamp`);
      const currentTime = new Date().getTime();

      // Set cache expiration time (e.g., 5 minutes)
      const cacheExpirationTime = 1000 * 60 * 5; // 5 minutes

      // If the cache exists and is not expired, use it
      if (
        cachedData &&
        cachedTimestamp &&
        currentTime - cachedTimestamp < cacheExpirationTime
      ) {
        console.log("Using cached tracks data");
        const parsedData = JSON.parse(cachedData);
        setTracks(parsedData.results);
        setTotalRows(parsedData.count);
        setLoading(false);
        return; // Exit, no need to fetch the API
      }
      console.log("API URL:", apiUrl);

      const response = await axios.get(apiUrl);
      setTracks(response.data.results);
      setTotalRows(response.data.count);

      // Store the fetched data in localStorage for future use
      localStorage.setItem(cacheKey, JSON.stringify(response.data));
      localStorage.setItem(`${cacheKey}-timestamp`, currentTime.toString());
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
    setLoading(false);
  }, [paginationModel, sortModel, trackFilters]);

  // #####FIRE EVERYTHING ABOVE#####
  useEffect(() => {
    fetchTracks();
  }, [fetchTracks]);

  const handleFilterChange = (key, value) => {
    console.log("New value:", value);

    if (key.includes("Annotations")) {
      // Now properly map the selected annotations to their `value` arrays
      setTrackFilters((prevFilters) => ({
        ...prevFilters,
        [key]: value.flatMap((annotation) => annotation.value),
      }));
    } else if (key.includes("Songs")) {
      setTrackFilters((prevFilters) => ({
        ...prevFilters,
        [key]: value,
      }));
    }
  };

  const handlePaginationModelChange = (newModel) => {
    setPaginationModel(newModel);
  };

  // ResizeObserver to trigger re-render on resize
  useEffect(() => {
    if (!gridContainerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      setResizeTrigger((prev) => prev + 1); // Force re-render
    });

    resizeObserver.observe(gridContainerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  // Getting and setting filter options
  useEffect(() => {
    const cacheKey = "filter-options";
    const cacheTimestampKey = "filter-options-timestamp";
    const cacheExpirationTime = 1000 * 60 * 60; // 1 hour

    const cachedFilterOptions = localStorage.getItem(cacheKey);
    const cachedTimestamp = localStorage.getItem(cacheTimestampKey);

    const currentTime = new Date().getTime();

    // If cache exists and it's not expired, use it
    if (
      cachedFilterOptions &&
      cachedTimestamp &&
      currentTime - cachedTimestamp < cacheExpirationTime
    ) {
      const parsedOptions = JSON.parse(cachedFilterOptions);
      setSongFilters(parsedOptions.songs);
      setAnnotationFilters(parsedOptions.annotations);
      console.log("Using cached filter options");
      return; // Exit, no need to fetch the API
    }

    // Otherwise, fetch filter options from the API
    axios
      .get("http://localhost:8000/api/filter-options/")
      .then((response) => {
        // Log the entire response structure for debugging
        console.log("Response Data:", response.data);
        console.log(
          `Response Size: ${JSON.stringify(response.data).length} bytes`
        );
        console.log(
          `Songs Size: ${JSON.stringify(response.data.songs).length} bytes`
        );
        console.log(
          `Annotations Size: ${
            JSON.stringify(response.data.annotations).length
          } bytes`
        );

        // Cache the filter options in localStorage for future use
        const filterOptionsToCache = {
          songs: response.data.songs,
          annotations: response.data.annotations,
        };
        localStorage.setItem(cacheKey, JSON.stringify(filterOptionsToCache));

        // Set the state for song and annotation filters
        setSongFilters(response.data.songs);
        setAnnotationFilters(response.data.annotations);
      })
      .catch((error) => {
        console.error("Error fetching song filter options:", error);
      });
  }, []);

  return (
    <Box m="20px">
      <Header title="DeeperBiscuits" subtitle="All Tracks" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        ref={gridContainerRef}
        id="my-grid-container"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <Box
          display="flex"
          mb={2}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2, // Space between items
            justifyContent: "flex-start", // Align to the left
            width: "100%",
          }}
        >
          <Grid container spacing={2}>
            {/* Previous Songs & Annotations */}
            <Grid
              item
              sx={{ width: { xs: "100%", sm: "auto" }, flexShrink: 0 }}
            >
              <SongFilter
                filterKey="prevSongs"
                songFilters={songFilters}
                selectedSongs={trackFilters.prevSongs}
                onFilterChange={handleFilterChange}
              />
              <AnnotationFilter
                filterKey="prevAnnotations"
                annotationFilters={annotationFilters}
                selectedAnnotations={trackFilters.prevAnnotations}
                onFilterChange={handleFilterChange}
              />
            </Grid>

            {/* Current Songs & Annotations */}
            <Grid
              item
              sx={{ width: { xs: "100%", sm: "auto" }, flexShrink: 0 }}
            >
              <SongFilter
                filterKey="currentSongs"
                songFilters={songFilters}
                selectedSongs={trackFilters.currentSongs}
                onFilterChange={handleFilterChange}
              />
              <AnnotationFilter
                filterKey="currentAnnotations"
                annotationFilters={annotationFilters}
                selectedAnnotations={trackFilters.currentAnnotations}
                onFilterChange={handleFilterChange}
              />
            </Grid>

            {/* Next Songs & Annotations */}
            <Grid
              item
              sx={{ width: { xs: "100%", sm: "auto" }, flexShrink: 0 }}
            >
              <SongFilter
                filterKey="nextSongs"
                songFilters={songFilters}
                selectedSongs={trackFilters.nextSongs}
                onFilterChange={handleFilterChange}
              />
              <AnnotationFilter
                filterKey="nextAnnotations"
                annotationFilters={annotationFilters}
                selectedAnnotations={trackFilters.nextAnnotations}
                onFilterChange={handleFilterChange}
              />
            </Grid>
          </Grid>
        </Box>
        <Box ref={gridContainerRef} id="my-grid-container">
          <TrackDataGrid
            key={resizeTrigger}
            tracks={tracks}
            loading={loading}
            totalRows={totalRows}
            sortModel={sortModel}
            rowHeight={rowHeight}
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationModelChange}
            onSortModelChange={setSortModel}
            colors={colors}
            gridContainerRef={gridContainerRef} // Pass the ref to the TrackDataGrid
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Tracks;
