import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import NotFound from './components/general/NotFound.jsx'
import VehicleCreate from './components/vehicle/VehicleCreate.jsx'


import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import 'font-awesome/css/font-awesome.min.css'
import Login from './components/auth/Login.jsx'
import VehicleTable from './components/vehicle/VehiclesTable.jsx'
import { ToastContainer } from 'react-toastify'
import OrderTable from './components/sales/OrderTable.jsx'
import OrderDetails from './components/sales/OrderDetails.jsx'
import OrderCreate from './components/sales/OrderCreate.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login/>,
    errorElement: <NotFound/>
  },
  {
    path: '/vehicles',
    element: <VehicleTable/>
  },
  {
    path: '/vechicle/create',
    element: <VehicleCreate/>
  },
  {
    path: '/orders',
    element: <OrderTable/>
  },
  {
    path: '/order/details/:id',
    element: <OrderDetails/>
  },
  {
    path: '/order/create/:id',
    element: <OrderCreate/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer/>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
