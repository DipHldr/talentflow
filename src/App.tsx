// import TestDB from './components/TestDb.tsx';
import { BrowserRouter, Routes, Route } from "react-router";
import JobsPage from "./components/JobsPage.tsx";
import LandingPage from './components/LandingPage.tsx';
import Playground from "./components/PlayGround/Playground.tsx";
import Playground2 from "./components/PlayGround/playground2.tsx";
import CandidateProfile from "./components/CandidateProfile.tsx";
import CandidateProfileCard from "./components/Candidates/CandidateProfileCard.tsx";
import CandidatePage from "./components/Candidates/CandidatePage.tsx";
// import ModalPlayground from "./components/Playground/modalpg.tsx";
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="jobs" element={<JobsPage />} />
      <Route path="playground" element={<Playground />} />
      <Route path="playground2" element={<Playground2 />} />
      <Route path="profile" element={<CandidateProfile />} />
      <Route path="profilecard" element={<CandidateProfileCard />} />
      <Route path="kanban" element={<CandidatePage />} />
      {/* <Route path="jobmodal" element={<ModalPlayground/>} /> */}
      {/* <Route path="job" element={<JobPage/>} /> */}
    </Routes>
  </BrowserRouter>
  )
}

export default App
