import { Outlet } from "react-router";
import Navbar from "../../components/navbar";
import React, { useEffect, useState } from "react";

const Layout = () => {
  const [loggedin, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setLoggedIn(true);
    } 
  }, [loggedin]);

  return (
    <>
      <Navbar setLoggedIn={setLoggedIn} loggedin={loggedin} />
      <Outlet context={[setLoggedIn]} />
      <footer
        className="mt-5 p-2 d-flex flex-column-reverse"
        id="homepageFooter"
      >
        <p className="container m-0">copyrights@ UTM CSC309 Group 196</p>
      </footer>
    </>
  );
};

export default Layout;
