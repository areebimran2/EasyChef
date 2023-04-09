import Card from "../Card";

const RecipeCarousel = ({ recipes, hasEnded, setPage, page, count, id, deleted, setDeleted }) => {
    const Pagination = () => {
        if (Math.ceil(page / 5) === 1 && (page < 5 || Math.ceil(count / 3) <= 5)) {
            return (
                <>
                    {[...Array(5).keys()]
                        .filter((item) => (item > 1))
                        .filter((item) => (item <= Math.min(4, Math.ceil(count / 3) - 1)))
                        .map((item) => (
                            <button key={item} disabled={item === page} onClick={() => setPage(item)} class="btn rounded-pill btn-outline-brown" type="button">
                                <span>{item}</span>
                            </button>
                        ))}
                </>
            )
        }
        else if (page === Math.ceil(count / 3)) {
            return (
                <>
                    <span>. . .</span>
                    {[...Array(page).keys()]
                        .filter((item) => ((page + 1) % 3 === 0 ? item >= page - 3 : (page - 1) % 3 === 0 ? item >= page - 2 : item >= page - 1))
                        .map((item) => (
                            <button key={item} disabled={item === page} onClick={() => setPage(item)} class="btn rounded-pill btn-outline-brown" type="button">
                                <span>{item}</span>
                            </button>
                        ))}
                </>
            )
        }
        else if ((page + 1) % 3 === 0) {
            return (
                <>
                    <span>. . .</span>
                    {[...Array(page + 3).keys()]
                        .filter((item) => (item >= page))
                        .filter((item) => (item <= Math.min(page + 2, Math.ceil(count / 3) - 1)))
                        .map((item) => (
                            <button key={item} disabled={item === page} onClick={() => setPage(item)} class="btn rounded-pill btn-outline-brown" type="button">
                                <span>{item}</span>
                            </button>
                        ))}
                </>
            )
        } else if ((page - 1) % 3 === 0) {
            return (
                <>
                    <span>. . .</span>
                    {[...Array(page + 1).keys()]
                        .filter((item) => (item >= page - 2))
                        .map((item) => (
                            <button key={item} disabled={item === page} onClick={() => setPage(item)} class="btn rounded-pill btn-outline-brown" type="button">
                                <span>{item}</span>
                            </button>
                        ))}
                </>
            )
        } else {
            return (
                <>
                    <span>. . .</span>
                    {[...Array(page + 2).keys()]
                        .filter((item) => (item >= page - 1))
                        .filter((item) => (item <= Math.min(page + 1, Math.ceil(count / 3) - 1)))
                        .map((item) => (
                            <button key={item} disabled={item === page} onClick={() => setPage(item)} class="btn rounded-pill btn-outline-brown" type="button">
                                <span>{item}</span>
                            </button>
                        ))}
                </>
            )
        }
    }

    return (
        <div id={id} class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <div class="d-flex flex-row flex-nowrap justify-content-start gap-3">
                        {recipes.map((recipe) => (
                            <Card recipe={recipe} id={id} deleted={deleted} setDeleted={setDeleted}/>
                        ))}
                    </div>
                </div>
            </div>

            <div class="d-flex justify-content-center mt-3 gap-2">
                <button disabled={page === 1} onClick={() => setPage(page - 1)} class="btn btn btn-outline-brown mx-3" type="button">
                    <span>PREV</span>
                </button>
                <button disabled={page === 1} onClick={() => setPage(1)} class="btn rounded-pill btn-outline-brown" type="button">
                    <span>1</span>
                </button>
                <Pagination />
                {Math.ceil(count / 3) <= 5 ?
                    Math.ceil(count / 3) !== 1 ?
                        <button disabled={page === Math.ceil(count / 3)} onClick={() => setPage(Math.ceil(count / 3))} class="btn rounded-pill btn-outline-brown" type="button">
                            <span>{Math.ceil(count / 3)}</span>
                        </button>
                        :
                        undefined
                    :
                    ((Math.ceil(count / 3) + 1) % 3 === 0 ? page >= Math.ceil(count / 3) - 3 : (Math.ceil(count / 3) - 1) % 3 === 0 ? page >= Math.ceil(count / 3) - 2 : page >= Math.ceil(count / 3) - 1) ?
                        <>
                            <button disabled={page === Math.ceil(count / 3)} onClick={() => setPage(Math.ceil(count / 3))} class="btn rounded-pill btn-outline-brown" type="button">
                                <span>{Math.ceil(count / 3)}</span>
                            </button>
                        </> :
                        <>
                            <span>. . .</span>
                            <button disabled={page === Math.ceil(count / 3)} onClick={() => setPage(Math.ceil(count / 3))} class="btn rounded-pill btn-outline-brown" type="button">
                                <span>{Math.ceil(count / 3)}</span>
                            </button>
                        </>}
                <button disabled={hasEnded} onClick={() => setPage(page + 1)} class="btn btn-outline-brown mx-3" type="button">
                    <span>NEXT</span>
                </button>
            </div>
        </div>
    )
}

export default RecipeCarousel;