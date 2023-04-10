import { useLocation, useNavigate } from "react-router-dom";
import BookForm from "../BookForm/BookForm";

export default function Edit() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate("/auth/login");
  }

  return (
    <div>
      <h3>This is the Edit Page!</h3>
      <BookForm {...state?.book} />
    </div>
  );
}
