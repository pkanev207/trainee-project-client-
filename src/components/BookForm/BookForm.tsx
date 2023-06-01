// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect, useState, useRef, SyntheticEvent } from "react";
import { useGetUser } from "../../app/hooks";
import { useCreateBookMutation } from "../../features/books/books-api";
import { useUpdateBookMutation } from "../../features/books/books-api";
import { useUploadImgMutation } from "../../features/books/books-api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUpload } from "react-icons/fa";
import styles from "./BookForm.module.css";

export interface IBookFormProps {
  _id?: string;
  title?: string;
  description?: string;
  imgUrl?: string;
  cloudinaryId?: string;
  userName?: string;
  author?: string;
  user?: { _id?: string; name: string; role: string };
  cover?: HTMLImageElement;
  // handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

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
  const [uploadImg] = useUploadImgMutation();
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
      if (cover === undefined) {
        toast.warning("Upload image");
        return;
      }

      const book = new FormData(e.target);
      book.append("imgUrl", imgUrl);
      book.append("image", cover);

      const res = await createBook({ book, token });
      if (res.error) {
        toast.error(res.error.data.message.toString());
      }
    } else if (action === "Update Book" && isAuthor && isValidInput) {
      // const book = { ...props, title, description, imgUrl, author };
      const book = new FormData(e.target);
      if (cover !== undefined) {
        book.append("image", cover);
      }
      book.append("_id", props._id);
      book.append("imgUrl", imgUrl);
      book.append("cloudinaryId", props.cloudinaryId);

      const res = await updateBook({ book, token });
      console.log(res);
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

  const handleImage = (e: SyntheticEvent) => {
    // console.log(cover);
    const formData = new FormData();
    formData.append("image", cover);

    uploadImg({ formData, token });

    // fetch("http://localhost:5000/api/books/images/upload", {
    //   method: "POST",
    //   // body: JSON.stringify({ message: "cover" }),
    //   body: formData,
    //   headers: {
    //     authorization: `Bearer ${token}`,
    //     // "content-type": cover!.type,
    //     // "content-length": `${cover!.size}`,
    //     "content-type": "multipart/form-data",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.log(error));

    // // Uploading multiple files using FormData in ReactJS.
    //     import { ChangeEvent, useState } from 'react';

    // function FileUploadMultiple() {
    //   const [fileList, setFileList] = useState<FileList | null>(null);

    //   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     setFileList(e.target.files);
    //   };

    //   const handleUploadClick = () => {
    //     if (!fileList) {
    //       return;
    //     }

    //     // 👇 Create new FormData object and append files
    //     const data = new FormData();
    //     files.forEach((file, i) => {
    //       data.append(`file-${i}`, file, file.name);
    //     });

    //     // 👇 Uploading the files using the fetch API to the server
    //     fetch('https://httpbin.org/post', {
    //       method: 'POST',
    //       body: data,
    //     })
    //       .then((res) => res.json())
    //       .then((data) => console.log(data))
    //       .catch((err) => console.error(err));
    //   };

    //   // 👇 files is not an array, but it's iterable, spread to get an array of files
    //   const files = fileList ? [...fileList] : [];
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
                  value={cover}
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
      {/* {coverPreview ? (
        <>
          <img src={coverPreview} alt="" className={styles.previewImg} />
          <button
            onClick={handleImage}
            style={{
              display: "block",
              textAlign: "center",
              margin: " 6px auto",
              padding: "6px",
              borderRadius: "6px",
            }}
          >
            Upload
          </button>
        </>
      ) : (
        <div className="coverImageInput">
          <label htmlFor="image" className={styles.labelCoverBtnUpload}>
            <p>Upload image</p>
            <input
              className={styles.coverBtnUpload}
              type="file"
              accept="image/*"
              name="image"
              id="image"
              onChange={handleCoverChange}
              required={true}
              value={cover}
            />
          </label>
        </div>
      )} */}
    </section>
  );
}

export default BookForm;
