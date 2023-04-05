import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Book from "../components/Book";
import Spinner from "../components/Spinner";
import { useAppSelector } from "../app/hooks";
import { selectAuth } from "../features/auth/auth-slice";
import { useGetAllBooksQuery } from "../features/books/books-api";
import { FaTrash, FaUpload } from "react-icons/fa";

function Home() {
  const { name } = useAppSelector(selectAuth);
  // const userBooks: any = [{ title: "Some Book" }, { title: "Another book" }];
  const navigate = useNavigate();
  console.log(useGetAllBooksQuery());
  const { data, isLoading, isSuccess, isError, error } = useGetAllBooksQuery();
  let userBooks;
  if (data) {
    userBooks = data.books;
  } else {
    userBooks = [];
  }

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <>
      <section className="heading">
        <h1>Welcome {name}</h1>
        <p>Books Catalog</p>
      </section>

      <section className="content">
        {userBooks.length > 0 ? (
          <div className="books">
            {userBooks.map((obj: any) => (
              <Book key={obj["_id"]} book={obj} />
            ))}
          </div>
        ) : (
          <h3>No books</h3>
        )}
      </section>
    </>
  );
}

export default Home;
