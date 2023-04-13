import { useEffect, useState } from "react"
import FormDiv from "../form input div"
import $ from 'jquery'
import { Link, useNavigate, useOutletContext } from "react-router-dom"

const LoginForm = () =>{
  let navigate = useNavigate()
  const [setLoggedIn] = useOutletContext()

  const setFalse = () => {
    $('#login-error').html('')
  }

  if (localStorage.getItem('token') !== null) {
    navigate('/profile')
  }

  const handleLogin = (event) =>{
    event.preventDefault()
    let user = $('#username').val()
    let pw = $('#pw').val()
    fetch('http://localhost:8000/accounts/login/',
      {
          method: 'POST', 
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: user,
            password: pw
          })
      })
      .then(response => {
        if (response.status === 401 || response.status === 400){ // unauthorize
            $('#login-error').html('Username or password is invalid')
            $('#login-error').css('color','red')
        } else {
          setLoggedIn(true)
        }
        return response.json()
      })
      .then(data => {
        console.log('data: ', data)
        localStorage.setItem('token', data.access)
        if (data.access !== undefined) {
          navigate('/profile');
        }
      })
      // re direct to profile page and fetch profile data
  }

  return(
    <>
    <form className='card bg-light-brown px-5 py-4 d-inline-block'>
        <h2 className='text-center mb-4 mt-4'>Log in</h2>
        <div className="d-flex mb-3">
            <label className="form-label mb-auto mt-auto me-2">Username:</label>
            <input className="form-control" type='text' id='username' onChange={setFalse}/>
        </div>
       
        <FormDiv
          label='Password '
          type='password'
          id='pw'
          onChange={setFalse}
        />
        <div className='d-flex justify-content-center mt-4'>
        <button className='btn btn-brown' onClick={handleLogin}>Log in</button>
        </div>
        <div id="login-error" className="text-center mt-2"></div>
        <Link to="/register" className='d-flex justify-content-center mt-4'>CREATE ACCOUNT</Link>
      </form>
    </>
  )
}
export default LoginForm
