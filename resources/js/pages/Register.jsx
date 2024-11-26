import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Register() {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [sname, setSName] = useState('')
    const [lname, setLName] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConf] = useState('')

    function registerForm(event) {
        event.preventDefault()
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios
                .post("/register", { name: name, second_name: sname, last_name: lname, email: email, password: password, password_confirmation: password_confirmation })
                .then(function (response) {
                    navigate('/users')
                }).catch(err => err.response);
        });
    }

     return (
        <main className="py-4">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Регистрация</div>

                            <div className="card-body">
                                <div className="row mb-3">
                                    <label className="col-md-4 col-form-label text-md-end">Имя</label>

                                    <div className="col-md-6">
                                        <input id="name" type="text" className="form-control " name="name" value={name} onChange={(e) => setName(e.target.value)} />

                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-md-4 col-form-label text-md-end">Отчество</label>

                                    <div className="col-md-6">
                                        <input id="second_name" type="text" className="form-control " name="second_name" value={sname} onChange={(e) => setSName(e.target.value)} />

                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-md-4 col-form-label text-md-end">Фамилия</label>

                                    <div className="col-md-6">
                                        <input id="last_name" type="text" className="form-control " name="last_name" value={lname} onChange={(e) => setLName(e.target.value)} />

                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label className="col-md-4 col-form-label text-md-end">Email Address</label>

                                    <div className="col-md-6">
                                        <input id="email" type="email" className="form-control " name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label className="col-md-4 col-form-label text-md-end">Password</label>

                                    <div className="col-md-6">
                                        <input id="password" type="password" className="form-control " name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label className="col-md-4 col-form-label text-md-end">Confirm Password</label>

                                    <div className="col-md-6">
                                        <input id="password-confirm" type="password" className="form-control" name="password_confirmation" value={password_confirmation} onChange={(e) => setPasswordConf(e.target.value)} />
                                    </div>
                                </div>

                                <div className="row mb-0">
                                    <div className="col-md-6 offset-md-4">
                                        <button type="submit" className="btn btn-primary" onClick={registerForm}>
                                            Зарегистрироваться
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

export default Register