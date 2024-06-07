import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getLoggedInUser } from './features/auth/authApiSlice';
import { getAllPermission, getAllRoles, getAllUser } from './features/user/userApiSlice';
import './App.css';
import { getAllBrand, getAllProductCategories, getAllProductTag, getAllProducts } from './features/product/productApiSlice';

function App() {

  const dispatch = useDispatch(); 

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(getLoggedInUser());    
    }
  },[dispatch]);

  useEffect(() => {
    dispatch(getAllPermission());
    dispatch(getAllRoles());
    dispatch(getAllUser());
    dispatch(getAllBrand());
    dispatch(getAllProductTag());
    dispatch(getAllProductCategories());
    dispatch(getAllProducts());
  },[dispatch]);
  

  return (
    <>
      <ToastContainer position="top-right" />
      <RouterProvider router={router} />
    </>
  )
}

export default App
