import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router";
import {
  Dashboard,
  Destination,
  DestinationDetails,
  Home,
  Login,
  Planner,
  Register,
  CreatePlanner,
} from "./pages";
import { Footer, Header } from "./components";
import { useContext, useEffect } from "react";
import { CurrentUserContext } from "./context/CurrentUser";
import Cookies from "js-cookie";
import { PlannerIDsContext } from "./context/plannerContext";
import axios from "axios";

function App() {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const [plannerIDsData, setPlannerIDsData] = useContext(PlannerIDsContext);

  function refreshUser() {
    const userDetails = {
      userID: Cookies.get("useID"),
      username: Cookies.get("username"),
    };
    setCurrentUser(userDetails);
  }
  function refreshPlanner() {
    const uuid = Cookies.get("useID");
    axios({
      url: "/api/planner",
      method: "get",
    }).then((res) => {
      setPlannerIDsData(
        res.data.map((planner) => {
          return {
            name: planner.name,
            uuid: planner.uuid,
            destination: planner.destination,
          };
        })
      );
    });
  }

  useEffect(() => {
    refreshUser();
    refreshPlanner();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/destinations" element={<Destination />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/destination/:slug" element={<DestinationDetails />} />
        <Route path="/planner/create" element={<CreatePlanner />} />
        <Route path="/planner/:uuid" element={<Planner />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
