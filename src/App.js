import React, { Fragment, useCallback, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes/routes'
import Default from './components/Default/Default'
// import { useQuery } from '@tanstack/react-query'
import { jwtDecode } from "jwt-decode";
import { getDetailUser, refreshToken, axiosJWT } from './userService/UserService'
import { updateUser } from './redux/slides/userSlide'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()

  const handleDetailUser = useCallback(async (id, token) => {
    const res = await getDetailUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  }, [dispatch]);

  useEffect(() => {
    const { storageData, decoded } = handleDecoded()
    console.log('decoded', decoded)
    if (decoded?.id) {
      handleDetailUser(decoded?.id, storageData);
    }
  }, [handleDetailUser]); // handleDetailUser is memoized, so safe to include


  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if (storageData) {
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData }
  }

  axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date()
    const { decoded } = handleDecoded()
    if (decoded?.exp < currentTime.getTime() / 1000) {
      const data = await refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


  // console.log('process.env.BE_API', process.env.BE_API)
  // const fetchApi = async () => {
  //   const res = await axios.get(`http://localhost:4000/api/product/all-product`)
  //   return res.data
  // }
  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
  // console.log('query', query)

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route, idx) => {
            const Page = route.page
            const Layout = route.isShowHeader ? Default : Fragment
            return (
              <Route key={idx} path={route.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            )
          })}
        </Routes>
      </Router>
    </div>
  )
}

export default App
