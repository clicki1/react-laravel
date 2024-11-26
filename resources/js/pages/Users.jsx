import { useEffect, useState } from "react"
import axios from "axios"
import moment from 'moment';
import { useNavigate, Link } from "react-router-dom"

function Users() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [usersfilter, setUsersfilter] = useState([])
  const [filter, setFilter] = useState('id')
  const [filterBy, setFilterBy] = useState('asc')
  const [pagination, setPagination] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [input, setInput] = useState()


  function filterFn(event, type) {
    const usersf = [];
   setUsersfilter([])
   if (event.target.name === 'id') {
      users.filter(user => user.id.toLowerCase().includes(event.target.value.toLowerCase())).map((user) => {
        usersf.push(user);
        setUsersfilter(usersf)
      })
    }

    if (event.target.name === 'name') {
      users.filter(user => user.name.toLowerCase().includes(event.target.value.toLowerCase())).map((user) => {
        usersf.push(user);
        setUsersfilter(usersf)
      })
    }

    if (event.target.name === 'last_name') {
      users.filter(user => user.last_name.toLowerCase().includes(event.target.value.toLowerCase())).map((user) => {
        usersf.push(user);
        setUsersfilter(usersf)
      })
    }

    if (event.target.name === 'second_name') {
      users.filter(user => user.name.toLowerCase().includes(event.target.value.toLowerCase())).map((user) => {
        usersf.push(user);
        setUsersfilter(usersf)
      })
    }


  }

  function filterForm(event) {
    event.preventDefault()
    var dataFilter = event.target.getAttribute('data-filter')
    if (filter == dataFilter) {
      if (filterBy === "asc") {
        setFilterBy('desc')
      } else {
        setFilterBy('asc')
      }
    }

    if (filter !== dataFilter) {
      setFilter(dataFilter)
      setFilterBy('asc')
    }

    event.preventDefault()
    axios.get('/sanctum/csrf-cookie').then(response => {
      axios
        .get(`/api/users?filer=${filter}&filterBy=${filterBy}&page=${page}`)
        .then(function (response) {
          setUsers(response.data.data)
          setUsersfilter(response.data.data)
        }).catch(err => {
          navigate('/')
        });
    });
  }

  useEffect(() => {
    setLoading(true)
    function usersGet() {
      axios
        .get("/sanctum/csrf-cookie")
        .then(function (response) {
          axios
            .get(`/api/users?filer=${filter}&filterBy=${filterBy}&page=${page}`)
            .then(function (response) {
              setUsers(response.data.data)
              setUsersfilter(response.data.data)
              setPagination(response.data)
              setLoading(false)
              setFilterBy('desc')
            }).catch(err => {
              navigate('/')
            });

        });
    }
    usersGet()
  }
    , [page])

  return (
    <div>


      <table class="table">
        <thead>
          <tr>
            <th scope="col"><button type="submit" data-filter='id' className="btn btn-primary" onClick={filterForm}>
              ID
            </button></th>
            <th scope="col"><button type="submit" data-filter='name' className="btn btn-primary" onClick={filterForm}>
              Имя
            </button></th>
            <th scope="col"><button type="submit" data-filter='second_name' className="btn btn-primary" onClick={filterForm}>
              Отчество
            </button></th>
            <th scope="col"><button type="submit" data-filter='last_name' className="btn btn-primary" onClick={filterForm}>
              Фамилия
            </button></th>
            <th scope="col"><button type="submit" data-filter='created_at' className="btn btn-primary" onClick={filterForm}>
              Дата создания
            </button></th>
          </tr>
        </thead>
        <tbody>
          <tr >
            <th scope="row"> <input name="id" id="input" type="text" className="form-control "
              onChange={filterFn} placeholder="Введите ID" />
            </th>
            <td><input name="name" id="input" type="text" className="form-control"
              onChange={filterFn} placeholder="Введите имя" /></td>
            <td><input name="second_name" id="input" type="text" className="form-control"
              onChange={filterFn} placeholder="Введите отчество" /></td>
            <td><input name="last_name" id="input" type="text" className="form-control"
              onChange={filterFn} placeholder="Введите фамилию" /></td>
            <td></td>
          </tr>
          {usersfilter.map((user) => (
            <tr key={user.id}>
              <th scope="row">{user?.id}</th>
              <td><Link to={'/profile/' + user.id}>{user?.name}</Link></td>
              <td>{user?.last_name}</td>
              <td>{user?.second_name}</td>
              <td>{moment(user?.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
            </tr>

          ))}

        </tbody>
      </table>
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          <nav aria-label="...">
            <ul key={loading} className="pagination">
              {pagination?.current_page !== 1 &&
                (<li className="page-item"><a className="page-link" onClick={() => setPage(page - 1)} href="#">Previous</a></li>)
              }
              {pagination?.links?.filter(link => link.url != null).map((link) => (
                <>
                  {link.active && (
                    <li key={link.label} className="page-item active">
                      <span className="page-link">
                        {link.label}
                        <span className="sr-only"></span>
                      </span>
                    </li>
                  )}
                  {!(link.active || isNaN(link.label)) && (
                    <li key={link.label} className="page-item"><a className="page-link" onClick={() => setPage(link.label)} href='#'> {link.label.replace(/[^a-zA-Z0-9 ]/g, "")}</a></li>
                  )}

                </>
              ))}

              {pagination.current_page !== pagination.last_page &&
                (<li className="page-item">
                  <a className="page-link" href="#" onClick={() => setPage(page + 1)}>Next</a>
                </li>)
              }

            </ul>
          </nav>
        </>
      )}


    </div>
  )
}

export default Users