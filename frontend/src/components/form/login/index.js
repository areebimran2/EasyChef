import FormDiv from "../form input div"
import $ from 'jquery'

const LoginForm = () =>{

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
        console.log(response.status)
        return response.json()
      })
      .then(data => {
        console.log('data: ', data)
        localStorage.setItem('token', data.access)
        
      })
      // re direct to profile page and fetch profile data
  }

  return(
    <>
    <form className='card bg-light-brown px-5 py-4 d-inline-block'>
        <h2 className='text-center mb-4 mt-4'>Log in</h2>
        <div className="d-flex mb-3">
            <label className="form-label mb-auto mt-auto me-2">Username:</label>
            <input className="form-control" type='text' id='username'/>
        </div>
       
        <FormDiv
          label='Password '
          type='password'
          id='pw'
        />
        <div className='d-flex justify-content-center mt-4'>
        <button className='btn btn-brown' onClick={handleLogin}>Log in</button>
        </div>
      </form>
    </>
  )
}
export default LoginForm
