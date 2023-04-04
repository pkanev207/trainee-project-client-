import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Book from "../components/Book";
import Spinner from "../components/Spinner";
// import { getUserBooks, reset } from "../features/books/bookSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth);
  // const { books, isLoading, isError, message } = useSelector(
  //   (state) => state.books
  // );
  // console.log(typeof books, books, books.length);
  // console.log(Object.values(books)[0]);
  // const userBooks = Object.values(books)[0] || [];
  const userBooks: any = [];

  // useEffect(() => {
  //   if (isError) {
  //     console.log(message);
  //   }

  //   if (!user) {
  //     navigate("/login");
  //   } else {
  //     dispatch(getUserBooks());
  //   }

  //   return () => {
  //     dispatch(reset());
  //   };
  // }, [user, navigate, isError, message, dispatch]);

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <>
      <section className="heading">
        {/* <h1>Welcome {user && user.name}</h1> */}
        <h1>Welcome</h1>
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

export default Dashboard;
