import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../features/auth/auth-slice";
import { useDeleteBookMutation } from "../../features/books/books-api";
import { FaTrash, FaCcDiscover, FaFileInvoice } from "react-icons/fa";

function Book({ book }: any) {
  const { token } = useSelector(selectAuth);
  const [deleteBook, rest] = useDeleteBookMutation();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (token) {
      if (window.confirm("Are you sure?")) {
        await deleteBook({ book, token });
      }
    } else {
      navigate("/auth/login");
    }
  };

  const handleEdit = () => {
    navigate("/edit", {
      state: {
        book,
      },
    });
  };

  return (
    <div className="book">
      <h3>{book?.title}</h3>
      <div>{book?.author}</div>
      <div>
        {new Date(book?.createdAt).toLocaleString("en-US").split(",")[0]}
      </div>
      <div>
        <img
          className="bookCover"
          src={book.imgUrl}
          alt="front cover of the book"
        />
      </div>
      <div>{book?.description}</div>
      <button onClick={(e) => console.log(e.target)} className="close">
        <FaCcDiscover />
        Details
      </button>
      <button onClick={handleEdit} className="close">
        <FaFileInvoice />
        Edit
      </button>
      <button onClick={handleDelete} className="close">
        <FaTrash />
        Delete
      </button>
    </div>
  );
}

export default Book;
