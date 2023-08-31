import { useEffect, useState, useRef, SyntheticEvent } from "react";
import { useGetUser } from "../../app/hooks";
import { useCreateBookMutation } from "../../features/books/books-api";
import { useUpdateBookMutation } from "../../features/books/books-api";
// import { useUploadImgMutation } from "../../features/books/books-api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUpload } from "react-icons/fa";
import { IBookFormProps } from "../../definitions";
import { IDataError } from "../../definitions";
import styles from "./Book-form.module.css";

function BookForm(props: IBookFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState<File | null>();
  const [coverPreview, setCoverPreview] = useState("");
  const [imgUrl, setImgUrl] = useState(
    "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1576599519i/49078674.jpg"
  );
  const [author, setAuthor] = useState("");
  const [createBook, { isLoading: isCreateLoading }] = useCreateBookMutation();
  const [updateBook, { isLoading: isUpdateLoading }] = useUpdateBookMutation();
  const user = useGetUser();
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const token: string = user?.token ?? "";

  useEffect(() => {
    if (props.title && props.description && props.imgUrl && props.author) {
      setTitle(props.title);
      setDescription(props.description);
      setImgUrl(props.imgUrl);
      setAuthor(props.author);
    }
  }, [props.title, props.description, props.imgUrl, props.author]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const element = buttonRef.current as unknown as HTMLButtonElement;
    const action: string = element.textContent ?? "";
    const isAuthor: boolean = props?.user?.name === user?.name;
    const isValidInput: boolean =
      title !== "" && description !== "" && author !== "";

    if (action === "Add Book" && !isAuthor && isValidInput && token) {
      if (cover === undefined || cover === null) {
        toast.warning("Upload image");
        return;
      }

      const book = new FormData(e.target as HTMLFormElement);
      book.append("imgUrl", imgUrl);
      book.append("image", cover);

      try {
        await createBook({ book, token }).unwrap();
      } catch (error) {
        toast.error((error as IDataError).data.message);
        return;
      }
    } else if (action === "Update Book" && isAuthor && isValidInput) {
      // const book = { ...props, title, description, imgUrl, author };
      const book = new FormData(e.target as HTMLFormElement);
      if (cover !== undefined && cover !== null) {
        book.append("image", cover);
      }
      book.append("_id", props._id || "");
      book.append("imgUrl", imgUrl);
      book.append("cloudinaryId", props.cloudinaryId ?? "");
      try {
        await updateBook({ book, token }).unwrap();
      } catch (error) {
        toast.error((error as IDataError).data.message);
        return;
      }
    } else {
      return toast.error(
        "Please make sure you are the creator of the record and check all the input fields"
      );
    }

    navigate("/");
    window.location.reload();
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setCover(e.target.files[0]);
    setCoverPreview(URL.createObjectURL(e.target.files[0]));
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
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="description">Description</label>
          <textarea
            maxLength={500}
            rows={5}
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {coverPreview ? (
            <img src={coverPreview} alt="" className={styles.previewImg} />
          ) : (
            <div className="coverImageInput">
              <img src={imgUrl} alt="" className={styles.previewImg} />
              <label htmlFor="image" className={styles.labelCoverBtnUpload}>
                <p>Upload image</p>
                <input
                  className={styles.coverBtnUpload}
                  type="file"
                  // accept="image/*"
                  accept="image/png, image/jpg, image/jpeg"
                  name="image"
                  id="image"
                  onChange={handleCoverChange}
                  // required={true}
                  value={cover as any}
                />
              </label>
            </div>
          )}
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
