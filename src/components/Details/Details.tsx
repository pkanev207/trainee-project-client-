import { useLocation, useNavigate } from "react-router-dom";
import { useGetUser } from "../../app/hooks";
import { useDeleteBookMutation } from "../../features/books/books-api";
import { FaTrash, FaFileInvoice } from "react-icons/fa";
import { BookModel } from "../../models/book";
import styles from "./Details.module.css";
import { formatDate } from "../../utils/format-date";
// import { UserModel } from "../../models/user";

function Details() {
  const user = useGetUser();
  const token: string = user?.token || "";
  const [deleteBook] = useDeleteBookMutation();
  const { state } = useLocation();
  const book: BookModel = state.book;
  const isAuthor: boolean = user?.name === book.user.name;
  const navigate = useNavigate();

  let createdUpdatedText: string;
  if (book.updatedAt > book.createdAt) {
    createdUpdatedText = "Updated: " + formatDate(book.updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(book.createdAt);
  }

  const handleEdit = () => {
    navigate("/edit", {
      state: {
        book,
      },
    });
  };

  const handleDelete = async () => {
    if (token) {
      if (window.confirm("Are you sure?")) {
        await deleteBook({ book, token });
        navigate("/");
      }
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <div className="book">
      <h3>{book.title}</h3>
      <div>author: {book.author}</div>
      <div>{createdUpdatedText}</div>
      <div>
        <img
          className="bookCover"
          src={book.imgUrl}
          alt="front cover of the book"
        />
      </div>
      <div className={styles.description}>{book.description}</div>

      {user?.name && isAuthor && (
        <>
          <button onClick={handleEdit} className="close">
            <FaFileInvoice />
            Edit
          </button>
          <button onClick={handleDelete} className="close">
            <FaTrash />
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default Details;
