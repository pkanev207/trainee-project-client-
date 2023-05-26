import { useState } from "react";
import { FaSistrix } from "react-icons/fa";
import { useAppDispatch } from "../../app/hooks";
import { searchBook, changePageNumber } from "../../features/books/books-slice";

import styles from "./SearchBar.module.css";

export interface ISearchBarProps {
  setPage: (str: any) => void;
}

const SearchBar = (props: ISearchBarProps) => {
  const { setPage } = props;
  const dispatch = useAppDispatch();
  const [searchTermInput, setSearchTermInput] = useState("");
  //   evt: React.MouseEvent<HTMLElement>;
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(searchBook(searchTermInput));
    dispatch(changePageNumber({ pageNumber: 1 }));
    setSearchTermInput("");
    setPage(1);
  };

  return (
    <form onSubmit={handleSearch} className={styles["search-form"]}>
      <input
        type="search"
        id="search"
        placeholder="Search title"
        value={searchTermInput}
        onChange={(e) => setSearchTermInput(e.target.value)}
      />
      <button>
        <FaSistrix />
      </button>
    </form>
  );
};

export default SearchBar;

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
