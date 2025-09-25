// import TestDB from './components/TestDb.tsx';
import { BrowserRouter, Routes, Route } from "react-router";
import LandingPage from './components/LandingPage.tsx';
import CandidateProfile from "./components/CandidateProfile.tsx";
import CandidatePage from "./components/Candidates/CandidatePage.tsx";
import CandidateProfilePage from './components/CandidatesProfile/CandidateProfilePage.tsx';
import HRProfilePage from "./components/HR_Profile/HR_ProfilePage.tsx";
// import ModalPlayground from "./components/Playground/modalpg.tsx";
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="profile" element={<CandidateProfile />} />
      <Route path="kanban" element={<CandidatePage />} />
      <Route path="/candidate/profile/:candidateId" element={<CandidateProfilePage />} />
      <Route path="hrprofile" element={<HRProfilePage/>} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
