import { useNavigate } from "react-router-dom";
import Book from "../Book/Book";
import Spinner from "../Spinner/Spinner";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/auth/auth-slice";
import { useGetAllBooksQuery } from "../../features/books/books-api";

function Home() {
  const { name } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const { data, isFetching } = useGetAllBooksQuery();
  
  let userBooks;
  data ? (userBooks = data.books) : (userBooks = []);

  if (isFetching) {
    return <Spinner />;
  }

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
