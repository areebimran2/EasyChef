import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import RecipeCarousel from "../RecipeCarousel";

const Favourites = ({ token, perPage, setDeleted, deleted }) => {
    let navigate = useNavigate()

    const props = useSpring({
        config: { duration: 500 },
        to: {opacity: 1},
        from: {opacity: 0},
        reset: true,
        delay: 0,
    })

    const [favourites, setFavourites] = useState([])
    const [fhasEnded, fsetHasEnded] = useState(true)
    const [fpage, fsetPage] = useState(1)
    const [fcount, fsetCount] = useState(0)

    useEffect(() => {
        fetch(`http://localhost:8000/accounts/my-recipes/favourites?p=${fpage}&page_size=${perPage}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        navigate('/login')
                    }
                } else {
                    return response.json()
                }
            })
            .then(json => {
                fsetCount(json.count)
                setFavourites(json.results)
                fsetHasEnded(json.next === null)
            })
    }, [fpage, deleted])

    if (favourites.length !== 0) {
        return (
            <>
                <div class="d-flex justify-content-between mt-5 mb-2">
                    <h1>My Favorites</h1>
                    <div>
                        <button type="button" class="btn btn-outline-brown" onClick={() => navigate('/my-recipes/favourites')}>Extend View</button>
                    </div>
                </div>
                <animated.div style={props}>
                    <RecipeCarousel recipes={favourites} hasEnded={fhasEnded} setPage={fsetPage} page={fpage} count={fcount} id={"myfavourites"}/>
                </animated.div>
            </>
        )
    } else {
        return (
            <>
                <div class="d-flex justify-content-between mt-5 mb-2">
                    <h1>My Favorites</h1>
                    <div>
                        <button type="button" class="btn btn-outline-brown" onClick={() => navigate('/my-recipes/favourites')}>Extend View</button>
                    </div>
                </div>
                <div class="list-not-found row align-items-center justify-content-center">
                    No recipes to display
                </div>      
            </>
        )
    }
}

export default Favourites;