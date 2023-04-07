import '../../custom.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import SearchComponent from '../../components/search';

function Search(){
    return(
        <>
        <div className="container container-1400 container-min-1000 mt-8">
            <div className="extendheader mb-3">
                <h1>Search Results</h1>
            </div>

            <div className="d-flex flex-row">
                <div className="sidebar card justify-content-center shadow-sm">
                    <form className="form-horizontal">
                        <div className="mt-5 ms-4">
                            <h2><b>Diet Options</b></h2>
                            <input className="form-control" type="text" list="dietOptions" id="diet" placeholder="Find a diet"/>
                            <datalist id="dietOptions">
                                <option>Vegan</option>
                                <option>Vegetarian</option>
                                <option>Gluten-Free</option>
                                <option>Low-Carb</option>
                                <option>Keto</option>
                                <option>Low-Fat</option>
                                <option>Reduced Sugar</option>
                                <option>Lactose-Free</option>
                            </datalist>
                        </div>

                        <div className="mt-3 ms-4">
                            <h2><b>Cuisine Options</b></h2>
                            <input className="form-control" type="text" list="cuisineOptions" id="cuisine"
                                placeholder="Pick a cuisine"/>
                            <datalist id="cuisineOptions">
                                <option>Chinese</option>
                                <option>Creole</option>
                                <option>Filipino</option>
                                <option>French</option>
                                <option>Indian</option>
                                <option>Japanese</option>
                                <option>Korean</option>
                                <option>Thai</option>
                                <option>Viet</option>
                                <option>Western</option>
                            </datalist>
                        </div>

                        <div className="mt-3 ms-4">
                            <h2><b>Cooking Time</b></h2>
                            <select className="form-select-sm">
                                <option selected>Select a cooking time</option>
                                <option>15 minutes or less</option>
                                <option>15-30 minutes</option>
                                <option>30-60 minutes</option>
                                <option>Over 60 minutes</option>
                            </select>
                        </div>

                        <div className="mt-3 ms-4">
                            <h2><b>Search Recipe</b></h2>
                            <input type="text" className="form-control" name="searchBar" id="searchBar" placeholder="Search..."/>
                        </div>

                        <div className="text-center mt-5">
                            <button className="btn btn-blue" formaction="recipeSearch.html">Search</button>
                        </div>


                    </form>
                </div>

                <div className="d-flex flex-row flex-wrap justify-content-start gap-3">
                    <SearchComponent/>
                </div>
                
            </div>

            
        </div>
            

        </>
    );
}

export default Search;