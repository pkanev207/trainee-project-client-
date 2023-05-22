import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout, selectAuth } from "../../features/auth/auth-slice";
import { changePageNumber } from "../../features/books/books-slice";
import { toast } from "react-toastify";
import styles from "./Header.module.css";

function Header() {
  const { name } = useAppSelector(selectAuth);
  //   const { user } = useSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname === "/dashboard";

  const onLogout = () => {
    dispatch(changePageNumber({ pageNumber: 1 }));
    dispatch(logout());
    toast.success("User logout successfully!");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">Home</Link>
      </div>
      {name && !isDashboard && (
        <div className={styles.logo}>
          <Link to="/dashboard">Create Book</Link>
        </div>
      )}
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
