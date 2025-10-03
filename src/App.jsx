import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Loginpage from "./pages/Loginpage";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";


export default function App() {
  return (
    <div className="w-full h-dvh bg-gray-950 text-white">
      <Toaster/>
      <BrowserRouter>
      
      <Routes>
        <Route path="/">
        <Route index element={<HomePage />}/> 
        <Route  path="login" element={<Loginpage/>}/>
        <Route  path="register" element={<h1>Register page</h1>}/>
        </Route>
        <Route path="*" element={<h1>page not found | error 404</h1>}> /</Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}




