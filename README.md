<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/areebimran2/EasyChef">
    <img src="frontend/src/components/navbar/logo-easy-chef.jpg" alt="Logo" height="80">
  </a>

<h3 align="center">EasyChef</h3>
  <p align="center">
    A recipe-sharing web application
  </p>
</div>



<!-- ABOUT THE PROJECT -->
## About The Project

![Product Name Screen Shot][product-screenshot]

Easy Chef is a web application designed for sharing and discovering recipes. It allows you to explore various recipes from around the world, catering to different diets and ingredients. You can also share your creations with others on the platform and interact with them by liking, favouriting, rating, and commenting on their recipes. As an added feature of convenience, narrow your recipe search by using filters that match your preferences. Easy Chef also helps you manage your shopping list, making meal planning even easier!

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* [![Node][Node.js]][Node-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![JQuery][JQuery.com]][JQuery-url]
* [![Django][Django.com]][Django-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* Node.js and npm is installed.
* Python 3.x is installed.
* virtualenv is installed.
  ```sh
  python3 -m pip install virtualenv
  ```
* Access to some interface for running a shell script.

### Installation/Setup

1. Execute the `startup.sh` bash script in the home directory of the project. This will:
    - create and activate a Python virtual environment
    - install the packages in `requirements.txt`
    - run the Django database migrations
    - run `npm install`
2. Execute the `run.sh` script to start up the Django server and the React server.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- FUNCTIONALITY -->
## Functionality

* Users can only view or search existing recipes if they're not logged in.
* Once logged in, users have access to the following:
    - Creating new recipes. They can start from scratch or use an existing recipe as the base.
    - Liking, favouriting, rating, and commenting on recipes.
    - Adding recipes to their shopping list for a comprehensive list of ingredients to be purchased.
    - Viewing their favourite recipes and recipes they have recently interacted with.
    - Updating their profile.
 



<!-- TEAM MEMBERS -->
## Team Members

The following individuals worked together to develop EasyChef as the final project for the 2023 Winter offering of CSC309 at the University of Toronto Mississauga.

* Areeb Imran (areebimran2/imranar3)
* Jet Xu (xujet123)
* Corinne Lee Slew (CorinneLS)

Any other contributor to this project was either an instructor or TA. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Contributors:

<a href="https://github.com/areebimran2/EasyChef/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=areebimran2/EasyChef" alt="contrib.rocks image" />
</a>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: p1-html/images/homepage-screenshot.jpg
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Node.js]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white
[Node-url]: https://nodejs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[Django.com]: https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green
[Django-url]: https://www.djangoproject.com/
