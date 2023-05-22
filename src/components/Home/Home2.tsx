import Book from "../Book/Book";
import Spinner from "../Spinner/Spinner";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/auth/auth-slice";
import { selectBooksData } from "../../features/books/books-slice";
import { useUseGetAllBooksPaginatedQuery } from "../../features/books/books-api";
import { IBookModel } from "../../models/book";
import Pagination from "../Pagination/Pagination";
import styles from "./Home.module.css";

import { useState, useEffect } from "react";

function Home2() {
  const { name } = useAppSelector(selectAuth);
  // const { pageNumber } = useAppSelector((state) => state?.books);
  const { pageNumber } = useAppSelector(selectBooksData);
  const [page, setPage] = useState(Number(pageNumber));
  const [pages, setPages] = useState(3);
  const [limit, setLimit] = useState(3);
  const args = { page, limit };
  const { data: dataPages, isFetching: isFetchingPages } =
    useUseGetAllBooksPaginatedQuery(args);

  let userBooks: IBookModel[];
  dataPages ? (userBooks = dataPages.data) : (userBooks = []);

  useEffect(() => {
    // console.log(dataPages);
    setPages(dataPages?.numberOfPages);
  }, [dataPages, pages, page]);

  if (isFetchingPages) {
    return <Spinner />;
  }

  return (
    <>
      <section className={styles.heading}>
        <h1>Welcome {name}</h1>
        <p>Books Catalog</p>
      </section>
      <Pagination page={page} pages={pages} changePage={setPage} />
      <section className={styles.content}>
        {userBooks.length > 0 ? (
          <div className={styles.books}>
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

// const content =
//   bookSearch === ""
//     ? books?.map((book) => {
//         return (
//           <>
//             book={book} key={book?._id}
//           </>
//         );
//       })
//     : searchBookResults?.length > 0 &&
//       searchBookResults?.map((book) => {
//         return (
//           <>
//             book={book} key={book?._id}
//           </>
//         );
//       });

export default Home2;
