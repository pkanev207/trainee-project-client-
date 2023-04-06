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
  description?: string;
  imgUrl?: string;
  userName?: string;
  author?: string;
}

function BookForm(props: IBookFormProps) {
  // console.log(props);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [createBook, { isLoading: isCreateLoading }] = useCreateBookMutation();
  const [updateBook, { isLoading: isUpdateLoading }] = useUpdateBookMutation();
  const user = useGetUser();
  const navigate = useNavigate();
  const buttonRef = useRef(null);

  useEffect(() => {
    if (props.title && props.description && props.imgUrl && props.author) {
      setTitle(props.title);
      setDescription(props.description);
      setImgUrl(props.imgUrl);
      setAuthor(props.author);
    }
  }, [props.title, props.description, props.imgUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const element = buttonRef.current as unknown as HTMLButtonElement;
    const action = element.textContent;
    const token = user?.token;
    const isAuthor = props.userName === user?.name;
    const isValidInput =
      title !== "" && description !== "" && imgUrl !== "" && author !== "";
    console.log(isValidInput);

    if (action === "Add Book" && !isAuthor && isValidInput && token) {
      const book = { title, description, imgUrl, author };
      const res = await createBook({ book, token });
      console.log(res);
    } else if (action === "Update Book" && isAuthor && isValidInput) {
      const book = { ...props, title, description, imgUrl, author };
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
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleChange}
          />
          <label htmlFor="description">Description</label>
          <textarea
            // type="text"
            maxLength={500}
            rows={5}
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {/* <input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          /> */}
          <label htmlFor="imgUrl">ImageUrl</label>
          <input
            type="text"
            name="imgUrl"
            id="imgUrl"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
          />
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
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
