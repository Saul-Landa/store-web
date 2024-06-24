import { useState } from 'react'

import { ToastContainer } from 'react-toastify';
import Login from './components/auth/Login';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [ user, setUser ] = useState(null)

  return (
    <div>
      <ToastContainer/>
      <Login/>
    </div>
  )
}

export default App
