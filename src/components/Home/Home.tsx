import Book from "../Book/Book";
import Spinner from "../Spinner/Spinner";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/auth/auth-slice";
import { useGetAllBooksQuery } from "../../features/books/books-api";
import { IBookModel } from "../../models/book";
import styles from "./Home.module.css";

function Home() {
  const { name } = useAppSelector(selectAuth);
  const { data, isFetching } = useGetAllBooksQuery();

  let userBooks: IBookModel[];
  data ? (userBooks = data.books) : (userBooks = []);

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <>
      <section className={styles.heading}>
        <h1>Welcome {name}</h1>
        <p>Books Catalog</p>
      </section>

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

export default Home;
