import { Outlet } from "react-router"
import Navbar from "../../components/navbar"

const Layout = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
            <footer class="mt-5 p-2 d-flex flex-column-reverse" id="homepageFooter">
                <p class="container m-0">copyrights@ UTM CSC309 Group 196</p>
            </footer>
        </>
    )
}

export default Layout;