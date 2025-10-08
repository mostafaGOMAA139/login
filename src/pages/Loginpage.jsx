import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { RiFacebookBoxFill } from "react-icons/ri";
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";



export default function Loginpage() {
 
   const navigate = useNavigate();
     const validationSchema = Yup.object({
      email: Yup.string().email().required(), 
      password : Yup.string().required(),
     });
    const handleSubmit=(values)=> {
      let domain ='http://82.112.241.233:1993';  
      let endpoint ="/api/auth/local";
      let url = domain + endpoint;
      let data ={
        identifier :values.email ,
        password :values.password ,
      }
      axios.post(url,data)
      .then((res)=>{
        toast.success('success login');
        sessionStorage.setItem('jwt',res.data.jwt);
        navigate('/');
       
      })
      .catch((err)=>{
        toast.error(err.response.data.error.message)
       
      })
     
    };

  return (
    <div className="w-full h-full flex items-center justify-center">

     <Formik initialValues={{email: '' ,password:''}} onSubmit={handleSubmit} validationSchema={validationSchema}>
      <Form className="w-[400px] p-4 rounded-2xl shadow border bg-cyan-950 flex flex-col gap-3">
        <h1 className="text-xl text-white flex items-center justify-center">Sign in</h1>
        <Field  name="email" className="w-full text-black input " placeholder="Enter your email"/>
        <ErrorMessage name="email" component={'p'} className="text-red-500" />


        
       <Field  name="password" className="w-full text-black input" placeholder="Enter your password"/>
        <ErrorMessage name="password" component={'div'} className="text-red-500" />

             <button type="sumbit" className="btn btn-error">Sign in</button>
             <div className="form-check">
              <input id="remember-me" name="remember" className="form-check-input " type="checkbox"></input>
                        
                        <label className="form-check-label text-light text-2 text-white" for="remember-me">Remember Me</label>
                      </div>
                      <div className="flex items-center mt-2 mb-3">
                        <hr class="flex-grow-1 border-light"></hr>
                        <span class="mx-2 text-white-50 text-2">Or Login with</span>
                        <hr class="flex-grow-1 border-light"></hr>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <RiFacebookBoxFill  className="text-4xl text-red-500"/>
                        <FaGithubSquare className="text-4xl border-2 border-black rounded-full" />
                        <FaLinkedin  className="text-4xl text-blue-500"  />
                      </div>
                     <div className="mt-6 text-center text-sm text-gray-500"><p>Don't have an account? <button class="text-blue-400 hover:underline">Sign up</button></p></div>
      </Form>
     </Formik>
    </div>



      
       
            
            
           
           
  )
}
