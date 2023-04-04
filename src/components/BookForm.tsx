import { useState } from "react";
import { useDispatch } from "react-redux";
// import { createBook } from "../features/books/bookSlice";
// import { getUserBooks } from "../features/books/bookSlice";

function BookForm() {
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // await dispatch(createBook({ title }));
    setTitle("");

    // return await dispatch(getUserBooks());
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Book</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Book
          </button>
        </div>
      </form>
    </section>
  );
}

export default BookForm;
