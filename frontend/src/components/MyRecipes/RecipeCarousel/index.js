import React from "react";
import $ from 'jquery'
import notfound from './local-file-not-found.png'

const RecipeCarousel = ({ recipes, hasEnded, setPage, page, count, id }) => {
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
                            <div class="card infocard bg-white text-black" key={recipe.id}>
                                <img class="card-img" src={recipe.picture !== null ? recipe.picture : notfound} />
                                <div class="card-body hidedetails">
                                    <div class="card-title">{recipe.name}</div>
                                    <div class="d-flex mb-2">
                                        <i class="mt-auto mb-auto fa-solid fa-star"></i>
                                        <i class="mt-auto mb-auto fa-solid fa-star"></i>
                                        <i class="mt-auto mb-auto fa-solid fa-star"></i>
                                        <i class="mt-auto mb-auto fa-solid fa-star"></i>
                                        <i class="mt-auto mb-auto fa-regular fa-star me-1"></i>
                                        <p class="mt-auto mb-auto">4.5</p>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <div>
                                            <a href="recipe.html"><button type="button"
                                                class="btn-sm btn-outline-brown px-3">View</button></a>
                                        </div>
                                        <div>
                                            <button type="button" class="btn-sm btn-outline-brown px-3 mx-2">Edit</button>
                                            <button type="button" class="btn-sm btn-outline-brown">Delete</button>
                                        </div>
                                    </div>
                                    <div class="card recipecard mt-2 p-3 bg-light-brown">
                                        <ul class="list-unstyled mb-0 lh-lg">
                                            <li><span class="fw-bold">Diet:</span> Vegan</li>
                                            <li><span class="fw-bold">Cuisine:</span> Western</li>
                                            <li><span class="fw-bold">Cooking time:</span> {recipe.cooking_time} minutes</li>
                                            <li><span class="fw-bold">Servings: </span>{recipe.serving_size}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
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