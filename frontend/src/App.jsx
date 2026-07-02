import { Routes, Route, Navigate } from "react-router-dom";
import RegistrationForm from "./pages/RegistrationForm";
import Success from "./pages/Success";
import AdminResponses from "./pages/AdminResponses";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegistrationForm />} />
      <Route path="/success" element={<Success />} />
      <Route path="/admin" element={<AdminResponses />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;