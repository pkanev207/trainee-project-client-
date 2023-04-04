import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Book from "../components/Book";
import Spinner from "../components/Spinner";
import { useAppSelector } from "../app/hooks";
import { selectAuth } from "../features/auth/authSlice";
// import { getUserBooks, reset } from "../features/books/bookSlice";

function Home() {
  const { name } = useAppSelector(selectAuth);
  const userBooks: any = [];
  const navigate = useNavigate();

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <>
      <section className="heading">
        {/* <h1>Welcome {user && user.name}</h1> */}
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
