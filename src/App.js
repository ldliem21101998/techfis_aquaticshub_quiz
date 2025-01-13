//router
import {
  Routes,
  Route,
  useNavigate,
  Outlet,
} from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";

//css
import "./css/resonsive.css";
import "./css/animation.css";
import "./css/main.css";

function App() {

  return (
    <Routes>
      <Route path="/*" element={<DefaultLayout />} />
    </Routes>
  );
}

export default App;
