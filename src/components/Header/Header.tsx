import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout, selectAuth } from "../../features/auth/auth-slice";
// import { useGetUserQuery } from "../../features/auth/auth-api";
import {
  changePageNumber,
  clearSearchBook,
} from "../../features/books/books-slice";
import { toast } from "react-toastify";
import styles from "./Header.module.css";

function Header() {
  const { name, role } = useAppSelector(selectAuth);
  //   const { user } = useSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isDashboard = location.pathname === "/dashboard";
  const isReading = location.pathname === "/read";
  const isWishlist = location.pathname === "/wishlist";
  const isArchived = location.pathname === "/archived";

  const onLogout = () => {
    dispatch(changePageNumber({ pageNumber: 1 }));
    dispatch(clearSearchBook());
    dispatch(logout());
    toast.success("User logout successfully!");
    navigate("/");
    // window.location.reload();
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/" style={isHome ? { color: "red" } : { color: "lime" }}>
          Home
        </Link>
      </div>
      {name && (
        <>
          <div className={styles.logo}>
            <Link
              to="/read"
              style={isReading ? { color: "red" } : { color: "lime" }}
            >
              Read
            </Link>
          </div>
          <div className={styles.logo}>
            <Link
              to="/wishlist"
              style={isWishlist ? { color: "red" } : { color: "lime" }}
            >
              WishList
            </Link>
          </div>
          <div className={styles.logo}>
            <Link
              to="/archived"
              style={isArchived ? { color: "red" } : { color: "lime" }}
            >
              Archived
            </Link>
          </div>
        </>
      )}
      {!isDashboard && role === "admin" && (
        <div className={styles.logo}>
          <Link to="/dashboard" style={{ color: "olivedrab" }}>
            Create Book
          </Link>
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
