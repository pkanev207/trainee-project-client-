import { useLocation, useNavigate } from "react-router-dom";
import BookForm from "../Book-form/Book-form";
import styles from "./Edit.module.css";

export default function Edit() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate("/auth/login");
  }

  return (
    <div className={styles.edit}>
      <h3 id={styles.editHeader}>This is the Edit Page!</h3>
      <BookForm {...state?.book} />
    </div>
  );
}
