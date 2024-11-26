import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from "react"
import axios from "axios"

const Profile = () => {
    const navigate = useNavigate()
    const { userId } = useParams()

    const [deleted, setDeleted] = useState('')
    const [name, setName] = useState('')
    const [sname, setSName] = useState('')
    const [lname, setLName] = useState('')

    function getUser(userId) {

        function userGet(userId) {
            axios
                .get("/sanctum/csrf-cookie")
                .then(function (response) {
                    axios
                        .get("/api/users/" + userId)
                        .then(function (response) {
                            setName(response.data.name)
                            setSName(response.data.second_name)
                            setLName(response.data.last_name)
                            setDeleted(response.data.deleted_at)
                        }).catch(err => {
                            navigate('/login')
                        });

                });
        }
        userGet(userId);
    }

    useEffect(() => {
        getUser(userId)
    }, [])

    return (
        <main className="py-4">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Пользователь: 
                            {!deleted &&
                                    (<span className='text-success'> АКТИВНЫЙ </span>)
                                }
                                {deleted &&
                                    (<span className='text-danger'> УДАЛЕННЫЙ В КОРЗИНУ </span>)
                                }

                            </div>

                            <div className="card-body">
                                <div className="row mb-3">
                                    <label className="col-md-4 col-form-label text-md-end">Имя</label>

                                    <div className="col-md-6">
                                        <input disabled="true" id="name" type="text" className="form-control " name="name" value={name} onChange={(e) => setName(e.target.value)} />

                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-md-4 col-form-label text-md-end">Отчество</label>

                                    <div className="col-md-6">
                                        <input disabled="true" id="second_name" type="text" className="form-control " name="second_name" value={sname} onChange={(e) => setSName(e.target.value)} />

                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-md-4 col-form-label text-md-end">Фамилия</label>

                                    <div className="col-md-6">
                                        <input disabled="true" id="last_name" type="text" className="form-control " name="last_name" value={lname} onChange={(e) => setLName(e.target.value)} />

                                    </div>
                                </div>
                                <div className="row mb-0">
                                    <div className="col-md-6 offset-md-4">
                                    <Link to={'/profile/update/' + userId}>ОБНОВИТЬ</Link>
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

export default Profile