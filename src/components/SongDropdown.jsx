import { useEffect, useState } from "react";

const SongDropdown = ({ onSelectSong }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/top-songs/") // Fetch all song titles
      .then((response) => response.json())
      .then((data) => setSongs(data));
  }, []);

  return (
    <select onChange={(e) => onSelectSong(e.target.value)}>
      {songs.map((song) => (
        <option key={song.id} value={song.title}>
          {song.title}
        </option>
      ))}
    </select>
  );
};

export default SongDropdown;