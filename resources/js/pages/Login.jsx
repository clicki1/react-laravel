import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
axios.defaults.withCredentials = true;

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    function loginForm(event) {
        event.preventDefault()
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios
                .post("http://127.0.0.1:8000/login", { email: email, password: password })
                .then(function (res) {
                    navigate('/users')
                }).catch(err => { console.log(err) });
        });
    }

    return (
        <main className="py-4">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Авторизация</div>

                            <div className="card-body">

                                <div className="row mb-3">
                                    <label className="col-md-4 col-form-label text-md-end">Email Address</label>

                                    <div className="col-md-6">
                                        <input id="email" type="email" className="form-control " name="email" autoComplete="false" value={email} onChange={(e) => setEmail(e.target.value)} />

                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label className="col-md-4 col-form-label text-md-end">Password</label>

                                    <div className="col-md-6">
                                        <input id="password" type="password" className="form-control " name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                                    </div>
                                </div>


                                <div className="row mb-0">
                                    <div className="col-md-8 offset-md-4">
                                        <button type="submit" className="btn btn-primary" onClick={loginForm}>
                                            Войти
                                        </button>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login