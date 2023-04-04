import LoginForm from '../../../components/form/login';
import UserAPIContext, { useUserAPIContext } from '../../../contexts/userAPIcontext';

function Login() {

  return (
    <>
    
    <div className="container-1000 ms-auto me-auto mt-8 justify-content-center d-flex">
      <UserAPIContext.Provider value={useUserAPIContext()}>
        <LoginForm/>
      </UserAPIContext.Provider>
      
    </div>
    </>   
  );
}

export default Login;