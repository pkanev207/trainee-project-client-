import { useLocation } from "react-router-dom";
import BookForm from "../BookForm/BookForm";

export interface IEditProps {}

export default function Edit(props: IEditProps) {
  const { state } = useLocation();

  return (
    <div>
      <h3>This is the Edit Page!</h3>
      <BookForm {...state.book} />
    </div>
  );
}
