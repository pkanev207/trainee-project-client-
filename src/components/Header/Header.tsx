import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout, selectAuth } from "../../features/auth/auth-slice";
import { toast } from "react-toastify";
import styles from "./Header.module.css";

function Header() {
  const { name } = useAppSelector(selectAuth);
  //   const { user } = useSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    toast.success("User logout successfully!");
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">Home</Link>
      </div>
      {name && (
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
