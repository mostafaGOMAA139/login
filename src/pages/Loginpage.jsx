import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";



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
      <Form className="w-[400px] p-4 rounded shadow border bg-white flex flex-col gap-3">
        <h1 className="text-xl text-black">login form</h1>
        <Field  name="email" className="w-full text-black input" placeholder="Enter your email"/>
        <ErrorMessage name="email" component={'p'} className="text-red-500" />


        
       <Field  name="password" className="w-full text-black input" placeholder="Enter your password"/>
        <ErrorMessage name="password" component={'div'} className="text-red-500" />

             <button type="sumbit" className="btn btn-primary">login</button>
      </Form>
     </Formik>
    </div>



      
       
            
            
           
           
  )
}
