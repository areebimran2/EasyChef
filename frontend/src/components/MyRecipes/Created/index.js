import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import RecipeCarousel from "../RecipeCarousel";

const Created = ({ token, perPage, setDeleted, deleted }) => {
    let navigate = useNavigate()

    const props = useSpring({
        config: { duration: 500 },
        to: {opacity: 1},
        from: {opacity: 0},
        reset: true,
        delay: 0,
    })

    const [created, setCreated] = useState([])
    const [hasEnded, setHasEnded] = useState(true)
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(0)

    useEffect(() => {
        fetch(`http://localhost:8000/accounts/my-recipes/created?p=${page}&page_size=${perPage}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status)
                } else {
                    return response.json()
                }
            })
            .then(json => {
                if (json === undefined) {
                    setPage(page - 1)
                } else {
                    setCount(json.count)
                    setCreated(json.results)
                    setHasEnded(json.next === null)
                }
            })
            .catch(error => {
                if (error.message === "401") {
                    navigate('/login')
                }
            })
    }, [page, deleted])

    if (created.length !== 0) {
        return (
            <>
                <div class="d-flex justify-content-between mb-2">
                    <h1>My Recipes</h1>
                    <div>
                        <button type="button" class="btn btn-outline-brown" onClick={() => navigate('/my-recipes/created')}>Extend View</button>
                    </div>
                </div>
                <animated.div style={props}>
                    <RecipeCarousel recipes={created} hasEnded={hasEnded} setPage={setPage} page={page} count={count} id={"mycreated"} deleted={deleted} setDeleted={setDeleted}/>
                </animated.div>
            </>
        )
    } else {
        return (
            <>
                <div class="d-flex justify-content-between mb-2">
                    <h1>My Recipes</h1>
                    <div>
                        <button type="button" class="btn btn-outline-brown" onClick={() => {navigate('/my-recipes/created')}}>Extend View</button>
                    </div>
                </div>
                <div class="list-not-found row align-items-center justify-content-center">
                    No recipes to display
                </div>      
            </>
        )
    }
}

export default Created;