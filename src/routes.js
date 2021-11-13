import { BrowserRouter, Routes, Route } from "react-router-dom";
import FavoritePages from "./pages/favorite";
import HomePages from "./pages/home";

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePages />} />
        <Route exact path="/favorite" element={<FavoritePages />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
