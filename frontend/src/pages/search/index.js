import '../../custom.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import SearchPage from '../../components/search/searchPage';

function Search(){
    return(
        <>
        <div className="container container-1400 container-min-1000 mt-8">
            <div className="extendheader mb-3">
                <h1>Search Results</h1>
            </div>

            <div className="d-flex flex-row">
                <SearchPage/>
                
            </div>

            
        </div>
            

        </>
    );
}

export default Search;