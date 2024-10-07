import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Stallite from "./screens/Satellite";
import Data from "./screens/DataScreen";
import Note from "./screens/Note";
import Profile from "./screens/Profile";
import NotFound from "./screens/NotFound";
import Example from "./screens/Example";
import { MenuProvider } from "./components/utils/Context/MenuContext";
import { AuthProvider } from "./components/utils/Context/AuthContext";
import PrivateRoute from "./components/widgets/PrivateRoute";
import {
  OpacityProvider,
  useOpacityContext,
} from "./components/utils/Context/OpacityContext";
import Header from "./components/utils/Header";
import LogAccess from "./components/utils/LogAccess";
import { useEffect } from "react";

const App = () => {
  const { opacity_dark } = useOpacityContext();
  const location = useLocation(); // useLocation kullanarak mevcut yolu al
  const validPaths = ["/", "/profile", "/data", "/stallite", "/note", "/task"];

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";

    const loadStyles = async () => {
      if (opacity_dark) {
        link.href = "./color.css";
        console.log("a");
      } else {
        link.href = "./color2.css";
        console.log("b");
      }

      document.head.appendChild(link);

      // Temizleme işlemi
      return () => {
        document.head.removeChild(link);
      };
    };

    loadStyles();
  }, [opacity_dark]);

  return (
    <div>
      {/* Eğer yol /login değilse Header bileşenini göster */}
      {validPaths.includes(location.pathname) && <Header />} {/* Koşullu Header gösterimi */}
      <LogAccess />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/stallite" element={<Stallite />} />
          <Route path="/data" element={<Data />} />
          <Route path="/note" element={<Note />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/example" element={<Example />} />
        </Route>
      </Routes>
    </div>
  );
};

function Root() {
  return (
    <Router>
      <AuthProvider>
        <OpacityProvider>
          <MenuProvider>
            <App />
          </MenuProvider>
        </OpacityProvider>
      </AuthProvider>
    </Router>
  );
}

export default Root;
