import { useState } from "react";
import { useGetUser } from "../app/hooks";
import { useCreateBookMutation } from "../features/books/books-api";
import { useNavigate } from "react-router-dom";

function BookForm() {
  const [title, setTitle] = useState("");
  const [createBook, { isLoading, isSuccess }] = useCreateBookMutation();
  const user = useGetUser();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const book = { title };
    const token = user?.token;
    if (token && title !== "") {
      const res = await createBook({ book, token });
      console.log(res);
    }

    setTitle("");
    navigate("/");
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
