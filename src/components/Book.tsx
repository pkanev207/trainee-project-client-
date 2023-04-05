import { useSelector } from "react-redux";
import { selectAuth } from "../features/auth/auth-slice";
import { useDeleteBookMutation } from "../features/books/books-api";

function Book({ book }: any) {
  const { token } = useSelector(selectAuth);
  const [deleteBook, { isLoading, isSuccess }] = useDeleteBookMutation();

  const onClick = async () => {
    console.log(token);
    console.log(book._id);
    if (token) {
      if (window.confirm("Are you sure?")) {
        await deleteBook({ book, token });
      }
    }
  };
  return (
    <div className="book">
      <h3>{book?.title}</h3>
      <div>
        {new Date(book?.createdAt).toLocaleString("en-US").split(",")[0]}
      </div>
      <button onClick={onClick} className="close">
        Delete
      </button>
    </div>
  );
}

export default Book;
