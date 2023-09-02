const Pagination = ({ pageArray, page, setPage }) => {
  return (
    <div className="page-char">
      {pageArray.length > 0 && (
        <h3>
          {page > 1 && (
            <span className="page-text" onClick={() => setPage(page - 1)}>
              {"<< previous"}
            </span>
          )}{" "}
          {/* Pages{" "} */}
          <select
            className="page-select"
            value={page}
            onChange={(event) => {
              setPage(parseInt(event.target.value));
            }}
          >
            {pageArray.length > 0 &&
              pageArray.map((pageIndex, index) => (
                <option key={index} value={pageIndex + 1}>
                  Page {pageIndex + 1}
                </option>
              ))}
          </select>
          {pageArray.length >= 2 && page < pageArray.length && (
            <span className="page-text" onClick={() => setPage(page + 1)}>
              next {">>"}
            </span>
          )}
        </h3>
      )}
    </div>
  );
};

export default Pagination;

{
  /* {pageArray.length > 0 &&
        pageArray.map((pageIndex, index) => (
          <span
            key={index}
            onClick={() => {
              setPage(index + 1);
              setPageArray(pageArray);
            }}
          >
            {pageIndex + 1}
          </span>
        ))} */
}

{
  /* <h3>
{page > 1 && <span>{"<< previous"}</span>} Pages{" "}
{pageArray.length >= 2 && <span>next {">>"}</span>}
</h3> */
}
