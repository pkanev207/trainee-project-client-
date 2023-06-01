import styles from "./Pagination.module.css";
import { changePageNumber } from "../../features/books/books-slice";
import { useAppDispatch } from "../../app/hooks";
import { useState, useEffect } from "react";

export interface IPagination {
  page: number;
  pages: number;
  changePage: (num: any) => void;
}

const Pagination = ({ page, pages, changePage }: IPagination) => {
  const dispatch = useAppDispatch();
  const changePageStoreValue = (value: number) =>
    dispatch(changePageNumber({ pageNumber: value }));

  let middlePagination;
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (pages === 6) {
      setIsVisible(false);
    }
  }, []);

  if (pages <= 5) {
    middlePagination = [...Array(pages)].map((_, idx) => (
      <button
        key={idx + 1}
        onClick={() => {
          changePage(idx + 1);
          changePageStoreValue(idx + 1);
        }}
        disabled={page === idx + 1}
      >
        {idx + 1}
      </button>
    ));
  } else {
    const startValue = Math.floor((page - 1) / 5) * 5;

    middlePagination = (
      <>
        {[...Array(5)].map((_, idx) => (
          <button
            key={startValue + idx + 1}
            disabled={page === startValue + idx + 1}
            onClick={(e) => {
              // if (Number(e.currentTarget.textContent) === 5 && pages === 6) {
              //   setIsVisible(false);
              // }
              changePage(startValue + idx + 1);
              changePageStoreValue(startValue + idx + 1);
            }}
          >
            {startValue + idx + 1}
          </button>
        ))}

        {isVisible ? (
          <button
            onClick={(e) => {
              if (pages === 6) {
                console.log("Nasty button");
                changePage(pages);
                changePageStoreValue(pages);
                // setIsVisible(!isVisible);
              } else {
                changePage(pages - 1);
                changePageStoreValue(pages - 1);
              }
            }}
          >
            ...
          </button>
        ) : null}

        <button
          onClick={() => {
            changePage(pages);
            changePageStoreValue(pages);
          }}
        >
          {pages}
        </button>
      </>
    );

    if (page > 5) {
      if (pages - page >= 5) {
        middlePagination = (
          <>
            <button
              onClick={() => {
                changePage(1);
                changePageStoreValue(1);
              }}
            >
              1
            </button>
            <button
              onClick={() => {
                changePage(2);
                changePageStoreValue(2);
              }}
            >
              ...
            </button>
            <button
              onClick={() => {
                changePage(startValue);
                changePageStoreValue(startValue);
              }}
            >
              {startValue}
            </button>
            {[...Array(5)].map((_, idx) => (
              <button
                key={startValue + idx + 1}
                disabled={page === startValue + idx + 1}
                onClick={() => {
                  changePage(startValue + idx + 1);
                  changePageStoreValue(startValue + idx + 1);
                }}
              >
                {startValue + idx + 1}
              </button>
            ))}

            <button
              onClick={() => {
                changePage(pages - 1);
                changePageStoreValue(pages - 1);
              }}
            >
              ...
            </button>
            <button
              onClick={() => {
                changePage(pages);
                changePageStoreValue(pages);
              }}
            >
              {pages}
            </button>
          </>
        );
      } else {
        const amountLeft = pages - page + 5;
        middlePagination = (
          <>
            <button
              onClick={() => {
                changePage(1);
                changePageStoreValue(1);
              }}
            >
              1
            </button>
            <button
              onClick={() => {
                changePage(page >= 1 ? 2 : 1);
                changePageStoreValue(page >= 1 ? 2 : 1);
              }}
            >
              ...
            </button>
            <button
              onClick={() => {
                changePage(startValue);
                changePageStoreValue(startValue);
              }}
            >
              {startValue}
            </button>
            {[...Array(amountLeft)].map((_, idx) => (
              <button
                key={startValue + idx + 1}
                disabled={page === startValue + idx + 1}
                style={
                  pages < startValue + idx + 1 ? { display: "none" } : undefined
                }
                onClick={() => {
                  changePage(startValue + idx + 1);
                  changePageStoreValue(startValue + idx + 1);
                }}
              >
                {startValue + idx + 1}
              </button>
            ))}
          </>
        );
      }
    }
  }

  return pages > 1 ? (
    <div className={styles.pagination}>
      <button
        onClick={() => {
          changePage((page: number) => page - 1);
          changePageStoreValue(page - 1);
        }}
        disabled={page === 1}
      >
        &#171;
      </button>
      {middlePagination}
      <button
        onClick={() => {
          changePage((page: number) => page + 1);
          changePageStoreValue(page + 1);
        }}
        disabled={page === pages}
      >
        &#187;
      </button>
    </div>
  ) : (
    <div className={styles.pagination}>
      <button disabled>1</button>
    </div>
  );
};

export default Pagination;
