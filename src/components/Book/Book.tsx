import { useSelector } from "react-redux";
import { selectAuth } from "../../features/auth/auth-slice";
import { useDeleteBookMutation } from "../../features/books/books-api";
import { FaTrash, FaCcDiscover } from "react-icons/fa";

function Book({ book }: any) {
  const { token } = useSelector(selectAuth);
  const [deleteBook, { isLoading, isSuccess }] = useDeleteBookMutation();

  const onClick = async () => {
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
      <button onClick={(e) => console.log(e.target)} className="close">
        <FaCcDiscover />
        Details
      </button>
      <button onClick={onClick} className="close">
        <FaTrash />
        Delete
      </button>
    </div>
  );
}

export default Book;
