import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


export default function HomePage() {
    const navigate =useNavigate();
    const [userInfo,setuserInfo]= useState({});
    useEffect(()=>{
        let jwt =sessionStorage.getItem('jwt');
        if(!jwt){
         navigate('/login');
        }else{
            let domain ='http://82.112.241.233:1993'; 
            let endpoint="/api/users/me";
            let url = domain +endpoint
            axios.get(url,{
                headers:{
                  Authorization:'Bearer ${jwt}',
                },
            }).then((res)=>{
              setuserInfo(res.data);
              console.log(res);
            }).catch((err)=>{
              sessionStorage.clear();
              navigate('/login');
              console.log(err);
            })
        }
    },[]);
    const logout = ()=>{
       sessionStorage.clear();
              navigate('/login'); 
    }
  return (
    <div>
      <h1>welcome {userInfo.username } to the Home page</h1>
      <button className="btn btn-error" onClick={logout} >logOut</button>
      </div>
  );
}
