import { useEffect, useState, useRef } from "react";
import { useGetUser } from "../../app/hooks";
import { useCreateBookMutation } from "../../features/books/books-api";
import { useUpdateBookMutation } from "../../features/books/books-api";
// import { useGetBookByIdQuery } from "../../features/books/books-api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUpload } from "react-icons/fa";

export interface IBookFormProps {
  title?: string;
  userName?: string;
}

function BookForm(props: IBookFormProps) {
  // console.log(props);
  const [title, setTitle] = useState("");
  const [createBook, { isLoading: isCreateLoading }] = useCreateBookMutation();
  const [updateBook, { isLoading: isUpdateLoading }] = useUpdateBookMutation();
  const user = useGetUser();
  const navigate = useNavigate();
  const buttonRef = useRef(null);

  useEffect(() => {
    if (props.title) {
      setTitle(props.title);
    }
  }, [props.title]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const element = buttonRef.current as unknown as HTMLButtonElement;
    const action = element.textContent;
    const token = user?.token;
    const isAuthor = props.userName === user?.name;

    if (action === "Add Book" && !isAuthor && title !== "" && token) {
      const book = { title };
      const res = await createBook({ book, token });
      console.log(res);
    } else if (action === "Update Book" && isAuthor && title !== "") {
      const book = { ...props, title };
      const res = await updateBook({ book, token });
      console.log(res);
    } else {
      return toast.error(
        "Please make sure you are the author of the book and check all the input fields"
      );
    }

    setTitle("");
    navigate("/");
  };

  return (
    <section className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Book</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit" ref={buttonRef}>
            <FaUpload />
            {props.title ? "Update Book" : "Add Book"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default BookForm;
