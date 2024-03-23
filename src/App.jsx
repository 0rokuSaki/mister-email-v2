import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { EmailIndex } from "./pages/EmailIndex";

export function App() {
  return (
    <Router>
      <section className="app">
        <Routes>
          <Route path="/" element={<Navigate to="/email/inbox" replace />} />
          <Route path="/email" element={<Navigate to="/email/inbox" replace />} />
          <Route path="/email/:folderName" element={<EmailIndex />} />
          {/* Other routes */}
        </Routes>
      </section>
    </Router>
  );
}
