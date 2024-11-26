import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import FilterData from "./pages/FilterData";
import CafeDetail from "./pages/CafeDetail";
import AddCafe from "./pages/AddCafe";
import AddReviewConfirm from "./pages/AddReviewConfirm";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/add-cafe" element={<AddCafe />}></Route>
          <Route path="/filter-data" element={<FilterData />}></Route>
          <Route path="/item/:id" element={<CafeDetail />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
