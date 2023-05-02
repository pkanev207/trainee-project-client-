import BookForm from "../BookForm/BookForm";
import styles from "./Dashboard.module.css";

// export interface IDashboardProps {}
export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <h3 id={styles.dashHeader}>This is the Dashboard</h3>
      <BookForm />
    </div>
  );
}
