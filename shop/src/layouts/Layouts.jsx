import Footer from "./footer/Footer";
import Header from "./header/Header";
import { Outlet } from "react-router-dom";


const Layouts = () => {
  return (
    <>
        <div className="page-wrapper">
            <Header />
            <Outlet />
            <Footer />
        </div>        
    </>
  )
}

export default Layouts