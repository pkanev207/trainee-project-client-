import Book from "../Book/Book";
import Spinner from "../Spinner/Spinner";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/auth/auth-slice";
import { selectBooksData } from "../../features/books/books-slice";
import { useGetAllBooksPaginatedQuery } from "../../features/books/books-api";
// import { useDebounce } from "../../app/hooks";
import { IBookModel } from "../../models/book";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../Search-bar/Search-bar";
import styles from "./Home.module.css";

import { useState, useEffect } from "react";

function Home2() {
  const { name } = useAppSelector(selectAuth);
  const searchTerm = useAppSelector((state) => state.books.bookSearch) ?? "";
  // const searchTerm = useDebounce(searchTermInput);
  const { pageNumber } = useAppSelector(selectBooksData);
  // const { pageNumber } = useAppSelector((state) => state?.books);
  const [page, setPage] = useState(Number(pageNumber));
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(3);
  const args = { page, limit, searchTerm };

  const { data: dataPages, isFetching: isFetchingPages } =
    useGetAllBooksPaginatedQuery(args);

  let userBooks: IBookModel[];
  dataPages ? (userBooks = dataPages.data) : (userBooks = []);

  useEffect(() => {
    // console.log(dataPages);
    setPages(dataPages?.numberOfPages);
  }, [dataPages, pages, page, searchTerm]);

  if (isFetchingPages) {
    return <Spinner />;
  }

  return (
    <>
      <section className={styles.heading}>
        <h1>Welcome {name}</h1>
        <p>Books Catalog</p>
      </section>
      {userBooks.length > 0 ? (
        <>
          <SearchBar setPage={setPage} />
          <Pagination page={page} pages={pages} changePage={setPage} />
        </>
      ) : null}
      <section className={styles.content}>
        {userBooks.length > 0 ? (
          <div className={styles.books}>
            {/* <Pagination page={page} pages={pages} changePage={setPage} /> */}
            {userBooks.map((obj: IBookModel) => (
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

export default Home2;
