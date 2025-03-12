
import Header from "../../component/Header"
import Footer from '@/component/Footer'
import { Outlet } from 'react-router-dom'
import ScrollToTop from "@/scroll/ScrollToTop"


function AppLayout() {

  return (
    <>
    <Header/>
    <ScrollToTop/>
   <Outlet/>
   <Footer/>
 
    </>
  )
}

export default AppLayout