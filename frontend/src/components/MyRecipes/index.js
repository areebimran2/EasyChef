import Created from "./Created";
import Favourites from "./Favourites";
import History from "./History";

const RecipeLists = () => {
    const perPage = 3;

    const token = localStorage.getItem('token')

    return (
        <>
            <Created token={token} perPage={perPage}/>
            <Favourites token={token} perPage={perPage}/>
            <History token={token} perPage={perPage}/>
        </>
    )
}

export default RecipeLists;