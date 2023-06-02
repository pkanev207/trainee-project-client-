import { useNavigate } from "react-router-dom";
import { FaCcDiscover } from "react-icons/fa";
import { IBookModel } from "../../definitions/index";
import { stringShortener } from "../../utils/string-shortener";
import styles from "./Book.module.css";

interface IBookProps {
  book: IBookModel;
  className?: string;
}

function Book({ book }: IBookProps) {
  const navigate = useNavigate();

  const title = stringShortener(book.title);
  // book.title.length > 21 ? book.title.slice(0, 22) + "..." : book.title;

  const author = stringShortener(book.author);
  // book.author.length > 14 ? book.author.slice(0, 14) + "..." : book.author;

  const handleDetails = () => {
    navigate("/details", {
      state: {
        book,
      },
    });
  };

  return (
    <div className="book">
      <h3>{title}</h3>
      <div>{author}</div>
      <div>
        <img
          className={styles.cover}
          src={book.imgUrl}
          alt="front cover of the book"
          // srcSet="book.imgUrl 400w, book.imgUrl 800w, book.imgUrl 1200w"
        />
      </div>
      <button onClick={handleDetails} className="close">
        <FaCcDiscover />
        Details
      </button>
    </div>
  );
}

export default Book;
