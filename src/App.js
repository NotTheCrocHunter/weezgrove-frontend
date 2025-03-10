import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Network from "./scenes/network";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import Songs from "./scenes/songs";
import Segues from "./scenes/segues";
import TracksMRT from "./scenes/tracksV2";
import TracksV2 from "./scenes/tracks";
import Circle from "./scenes/circle";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import SeguesAccordion from "./components/SegueAccordion";
import Tracks from "./scenes/tracks";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/*<Sidebar isSidebar={isSidebar} />*/}
          <main className="content">
            {/*<Topbar setIsSidebar={setIsSidebar} />*/}
            <Routes>
              <Route path="/" element={<Tracks />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tracks" element={<Tracks />} />
              <Route path="/songs" element={<Songs />} />
              <Route path="/segues" element={<Segues />} />
              <Route path="/tracksV2" element={<TracksV2 />} />
              <Route path="/segues_accordion" element={<SeguesAccordion />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/network" element={<Network />} />
              <Route path="/circle" element={<Circle />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
