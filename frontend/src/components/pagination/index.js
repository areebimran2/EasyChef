const Pagination = ({ count, page, setPage, perPage }) => {
    if (Math.ceil(page / 5) === 1 && (page < 5 || Math.ceil(count / perPage) <= 5)) {
        return (
            <>
                {[...Array(5).keys()]
                    .filter((item) => item > 1)
                    .filter((item) => item <= Math.min(4, Math.ceil(count / perPage) - 1))
                    .map((item) => (
                        <button
                            key={item}
                            disabled={item === page}
                            onClick={() => setPage(item)}
                            class="btn rounded-pill btn-outline-brown"
                            type="button"
                        >
                            <span>{item}</span>
                        </button>
                    ))}
            </>
        );
    } else if (page === Math.ceil(count / perPage)) {
        return (
            <>
                <span>. . .</span>
                {[...Array(page).keys()]
                    .filter((item) =>
                        (page + 1) % 3 === 0
                            ? item >= page - 3
                            : (page - 1) % 3 === 0
                                ? item >= page - 2
                                : item >= page - 1
                    )
                    .map((item) => (
                        <button
                            key={item}
                            disabled={item === page}
                            onClick={() => setPage(item)}
                            class="btn rounded-pill btn-outline-brown"
                            type="button"
                        >
                            <span>{item}</span>
                        </button>
                    ))}
            </>
        );
    } else if ((page + 1) % 3 === 0) {
        return (
            <>
                <span>. . .</span>
                {[...Array(page + 3).keys()]
                    .filter((item) => item >= page)
                    .filter(
                        (item) => item <= Math.min(page + 2, Math.ceil(count / perPage) - 1)
                    )
                    .map((item) => (
                        <button
                            key={item}
                            disabled={item === page}
                            onClick={() => setPage(item)}
                            class="btn rounded-pill btn-outline-brown"
                            type="button"
                        >
                            <span>{item}</span>
                        </button>
                    ))}
            </>
        );
    } else if ((page - 1) % 3 === 0) {
        return (
            <>
                <span>. . .</span>
                {[...Array(page + 1).keys()]
                    .filter((item) => item >= page - 2)
                    .map((item) => (
                        <button
                            key={item}
                            disabled={item === page}
                            onClick={() => setPage(item)}
                            class="btn rounded-pill btn-outline-brown"
                            type="button"
                        >
                            <span>{item}</span>
                        </button>
                    ))}
            </>
        );
    } else {
        return (
            <>
                <span>. . .</span>
                {[...Array(page + 2).keys()]
                    .filter((item) => item >= page - 1)
                    .filter(
                        (item) => item <= Math.min(page + 1, Math.ceil(count / perPage) - 1)
                    )
                    .map((item) => (
                        <button
                            key={item}
                            disabled={item === page}
                            onClick={() => setPage(item)}
                            class="btn rounded-pill btn-outline-brown"
                            type="button"
                        >
                            <span>{item}</span>
                        </button>
                    ))}
            </>
        );
    }
}

export default Pagination;
