import { useState } from "react";
import Created from "./Created";
import Favourites from "./Favourites";
import History from "./History";

const RecipeLists = () => {
    const perPage = 3;

    const [deleted, setDeleted] = useState(false)

    const token = localStorage.getItem('token')

    return (
        <>
            <Created token={token} perPage={perPage} setDeleted={setDeleted} deleted={deleted}/>
            <Favourites token={token} perPage={perPage} setDeleted={setDeleted} deleted={deleted}/>
            <History token={token} perPage={perPage} setDeleted={setDeleted} deleted={deleted}/>
        </>
    )
}

export default RecipeLists;