import { useLocation, useNavigate } from "react-router-dom";
import { useGetUser } from "../../app/hooks";
import { useDeleteBookMutation } from "../../features/books/books-api";
import {
  FaTrash,
  FaFileInvoice,
  FaThumbsUp,
  FaBookOpen,
  FaStar,
} from "react-icons/fa";
import { IBookModel } from "../../models/book";
import styles from "./Details.module.css";
import { formatDate } from "../../utils/format-date";
// import { UserModel } from "../../models/user";

function Details() {
  const user = useGetUser();
  const token: string = user?.token || "";
  const [deleteBook] = useDeleteBookMutation();
  const { state } = useLocation();
  const book: IBookModel = state.book;
  const isAuthor: boolean = user?.name === book.user.name;
  const hasLiked = false;
  const isFavorite = false;
  const isReading = false;
  const navigate = useNavigate();

  let createdUpdatedText: string;
  if (book.updatedAt > book.createdAt) {
    createdUpdatedText = "Updated: " + formatDate(book.updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(book.createdAt);
  }

  const handleLike = () => {
    console.log("Like!");
  };

  const handleRead = () => {
    console.log("Read!");
  };

  const handleAddToFavorites = () => {
    console.log("Add to Wishlist!");
  };

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
        window.location.reload();
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
          className={styles.bookCover}
          src={book.imgUrl}
          alt="front cover of the book"
        />
      </div>
      <div className={styles.description}>{book.description}</div>
      <div className={styles.bookOptions}>
        <p>Likes: {book?.likes?.length}</p>
        {user?.name && !isReading && (
          <button onClick={handleRead} className="close">
            <FaBookOpen />
            Read
          </button>
        )}

        {user?.name && !isFavorite && (
          <button onClick={handleAddToFavorites} className="close">
            <FaStar />
            Add to Wishlist
          </button>
        )}

        {user?.name && !hasLiked && (
          <button onClick={handleLike} className="close">
            <FaThumbsUp />
            Like
          </button>
        )}

        {user?.role === "admin" && (
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
    </div>
  );
}

export default Details;
