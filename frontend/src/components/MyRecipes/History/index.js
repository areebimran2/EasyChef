import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import RecipeCarousel from "../RecipeCarousel";

const History = ({ token, perPage }) => {
    let navigate = useNavigate()

    const props = useSpring({
        config: { duration: 500 },
        to: {opacity: 1},
        from: {opacity: 0},
        reset: true,
        delay: 0,
    })

    const [history, setHistory] = useState([])
    const [hhasEnded, hsetHasEnded] = useState(true)
    const [hpage, hsetPage] = useState(1)
    const [hcount, hsetCount] = useState(0)

    useEffect(() => {
        fetch(`http://localhost:8000/accounts/my-recipes/history?p=${hpage}&page_size=${perPage}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        navigate('/profile')
                    }
                } else {
                    return response.json()
                }
            })
            .then(json => {
                hsetCount(json.count)
                setHistory(json.results)
                hsetHasEnded(json.next === null)
            })
    }, [hpage])

    if (history.length !== 0) {
        return (
            <>
                <div class="d-flex justify-content-between mt-5 mb-2">
                    <h1>My Recipe History</h1>
                    <div>
                        <button type="button" class="btn btn-outline-brown" onclick={() => navigate('/created')}>Extend View</button>
                    </div>
                </div>
                <animated.div style={props}>
                    <RecipeCarousel recipes={history} hasEnded={hhasEnded} setPage={hsetPage} page={hpage} count={hcount} id={"myhistory"}/>
                </animated.div>
            </>
        )
    } else {
        return (
            <>
                <div class="d-flex justify-content-between mt-5 mb-2">
                    <h1>My Recipe History</h1>
                    <div>
                        <button type="button" class="btn btn-outline-brown" onclick={() => navigate('/created')}>Extend View</button>
                    </div>
                </div>
                <div class="list-not-found row align-items-center justify-content-center">
                    No recipes to display
                </div>      
            </>
        )
    }
}

export default History;
