import '../../custom.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import homeslide1 from '../../images/homeslide1.jpg'
import homeslide2 from '../../images/homeslide2.jpg'
import homeslide3 from '../../images/homeslide3.jpg'

import HomeComponent from '../../components/home'

function Home() {
    return (
      <>
        <div id="homeSlides" className="carousel slide" data-bs-ride="carousel">
          <ol className="carousel-indicators">
            <li data-bs-target="#homeSlides" data-bs-slide-to="0" className="active"></li>
            <li data-bs-target="#homeSlides" data-bs-slide-to="1"></li>
            <li data-bs-target="#homeSlides" data-bs-slide-to="2"></li>
          </ol>
          <div className="carousel-inner" id="hs">
            <div className="carousel-item active">
              <div className="overlay-image" style={{backgroundImage: `url(${homeslide1})`}}></div>
              <div className="container" id="homeSlide1">
                <h1>Welcome to Easy Chef.</h1>
                <p>A platform that allows creators from all over the world to share their recipes and spread their love of food to others. 
                  From professional chefs to amateur home cooks, our extensive collection of recipes will have everything you need to make 
                a wonderful meal for yourself, your friends, and family.</p>
        
              </div>
            </div>
            <div className="carousel-item">
              <div className="overlay-image" style={{backgroundImage: `url(${homeslide2})`}}></div>
              <div className="container" id="homeSlide2">
                <h1>Enjoy recipes from thousands of creators.</h1>
                <p>Browse through a variety of unique and tasty dishes from various cuisines found across the globe. Experience the many exciting 
                  recipes that Easy Chef has to offer through the support of our creators.
                </p>
                <a href="recipeSearch.html" className="btn btn-brown">Search recipes now</a>
                </div>
            </div>
            <div className="carousel-item">
              <div className="overlay-image" style={{backgroundImage: `url(${homeslide3})`}}></div>
              <div className="container" id="homeSlide3">
                <h1>Create your own recipe today.</h1>
                <p>Sharing your own recipe with others is just a few clicks away. Create an account, sign in, and add a delicious recipe for 
                  other food lovers to try.
                </p>
              </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#homeSlides" data-bs-slide="prev">
              <span className="carousel-control-prev-icon"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#homeSlides" data-bs-slide="next">
              <span className="carousel-control-next-icon"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
          <HomeComponent/>
      </>   
    );
  }
  
  export default Home;