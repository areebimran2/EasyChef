import { Outlet } from "react-router"
import Navbar from "../../components/navbar"

const Layout = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
            <footer className="mt-5 p-2 d-flex flex-column-reverse" id="homepageFooter">
                <p className="container m-0">copyrights@ UTM CSC309 Group 196</p>
            </footer>
        </>
    )
}

export default Layout;