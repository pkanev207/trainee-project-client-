import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout, selectAuth } from "../features/auth/authSlice";
import { toast } from "react-toastify";
// import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const { name } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  //   const { user } = useSelector((state) => state.auth);
  //   const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    toast.success("User logout successfully!");
    // dispatch(logout());
    // dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Home</Link>
      </div>
      <div className="logo">
        <Link to="/dashboard">Create Book</Link>
      </div>
      <ul>
        {name ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/auth/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/auth/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
