import { useNavigate } from "react-router-dom";
import { FaCcDiscover } from "react-icons/fa";

function Book({ book }: any) {
  const navigate = useNavigate();

  const handleDetails = () => {
    navigate("/details", {
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
        <img
          className="bookCover"
          src={book.imgUrl}
          alt="front cover of the book"
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
