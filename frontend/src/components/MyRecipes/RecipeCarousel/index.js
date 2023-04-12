import Pagination from "../../pagination";
import Card from "../Card";

const RecipeCarousel = ({ recipes, hasEnded, setPage, page, count, id, deleted, setDeleted }) => {

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
                <Pagination count={count} page={page} setPage={setPage} perPage={3}/>
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