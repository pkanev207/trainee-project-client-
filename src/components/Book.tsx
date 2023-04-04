import { useDispatch } from "react-redux";
import { log } from "util";
// import { getUserBooks } from "../features/books/bookSlice";
// import { deleteBook } from "../features/books/bookSlice";

function Book({ book }: any) {
  // console.log("From book component:", book);
  console.log(Book);
  const dispatch = useDispatch();
  const onClick = async () => {
    // await dispatch(deleteBook(book._id));
    // return await dispatch(getUserBooks());
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
