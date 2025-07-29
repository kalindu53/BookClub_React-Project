import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ReaderDashboard from "./components/ReaderDashboard";

import BookDashboard from "./pages/BookDashboard";
import LendingPage from "./pages/LendingDashboard"; // Ensure the correct path to LendingPage
import LoginPage from "./pages/LoginPage"; // Ensure the correct path to LoginPage
// import BookDashboard, LendingPage, LoginPage (when ready)

function App() {
  return (
    <BrowserRouter>
      <Routes>

    

      <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/readers" element={<ReaderDashboard />} />
        <Route path="/books" element={<BookDashboard />} />

        {/* Add more routes as needed */}
        {/* <Route path="/lending" element={<LendingPage />} /> */}
        <Route path="/lending" element={<LendingPage />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* Add routes here later */}
      </Routes>
    </BrowserRouter>
  );
}



// function App() {
//   return <BookDashboard />;
// }

export default App;



