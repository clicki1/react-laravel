import { Outlet, NavLink } from 'react-router-dom'
import axios from "axios"
import { useNavigate} from "react-router-dom"

function App() {
  const navigate = useNavigate()
  

  function logoutForm(event) {
    event.preventDefault()
    axios.get('/sanctum/csrf-cookie').then(response => {
      axios
        .post("/logout", {})
        .then(function (response) {
          localStorage.removeItem("token");
          navigate('/login')
          console.log(response.data);
        }).catch(err => { console.log(err) });
    });
  }

  return (
    <div className="App">
      <div className="container">
    <header className="d-flex justify-content-center py-3">
      <ul className="nav nav-pills">
      
        <li className="nav-item"><NavLink end to="/" className={ ({isActive}) => {
                return isActive ? 'nav-link underline' : 'nav-link'
              } }>Главная</NavLink></li>
        <li className="nav-item"><NavLink end to="/register" className={ ({isActive}) => {
                return isActive ? 'nav-link underline' : 'nav-link'
              } }>Регистрация</NavLink></li>
        <li className="nav-item"><NavLink end to="/users" className={ ({isActive}) => {
                return isActive ? 'nav-link underline' : 'nav-link'
              } }>Пользователи</NavLink></li>
        <li className="nav-item"><NavLink end to="/login" className={ ({isActive}) => {
                return isActive ? 'nav-link underline' : 'nav-link'
              } }>Войти</NavLink></li>
        <li className="nav-item"><button type="submit" className="btn btn-primary" onClick={logoutForm}>
            Выйти
          </button></li>
      </ul>
    </header>
  </div>
      
      <div  className="container md:px-2 px-4 pt-8 md:pt-16 mx-auto">
        <Outlet/>
      </div>
    </div>
  )
}
 
export default App