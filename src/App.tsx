import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import Read from "./components/Read/Read";
import Archived from "./components/Archived/Archived";
import Wishlist from "./components/Whishlist/Wishlist";
import Details from "./components/Details/Details";
import Edit from "./components/Edit/Edit";
import { useAppDispatch } from "./app/hooks";
import { setUser } from "./features/auth/auth-slice";
import PrivateRoute from "./components/Private-route";

function App() {
  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    dispatch(setUser(user));
  }, [user, dispatch]);

  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/paginated" element={<Home />} /> */}
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />
            <Route
              path="/read"
              element={
                <PrivateRoute>
                  <Read />
                </PrivateRoute>
              }
            />
            <Route
              path="/archived"
              element={
                <PrivateRoute>
                  <Archived />
                </PrivateRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <PrivateRoute>
                  <Wishlist />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/details" element={<Details />} />
            <Route
              path="/edit"
              element={
                <PrivateRoute>
                  <Edit />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
