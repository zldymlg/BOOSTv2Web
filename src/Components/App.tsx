import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./Profile";
import SettingsTab from "./SettingsTab";
import PersonalSetting from "./PersonalSetting";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<SettingsTab />} />
        <Route path="/settings/personal" element={<PersonalSetting />} />
      </Routes>
    </Router>
  );
}
