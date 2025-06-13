import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bodybuilderImage from '../assets/sudda.png'; 
const Register = () => {

    const [user,setuser] = useState({
        uname:"",uemail:"",uaddress:"",upassword:""
    })
    
   const [isLoading, setIsLoading] = useState(true);

    
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name,value} = e.target;
        setuser({
            ...user,
            [name] : value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formdata = new FormData();
        formdata.append("uname", user.uname);
        formdata.append("uemail", user.uemail);
        formdata.append("uaddress", user.uaddress);
        formdata.append("upassword", user.upassword);

        try{
            await axios.post("http://localhost:3000/api/authuser/register", user, {withCredentials: true});
            alert("successfully registered");
            navigate('/login')
            setuser({
                uname:"",uemail:"",uaddress:"",upassword:""
            })

        }catch(e){
            alert("registered unsuccessfull");
        }

    }

     useEffect(() => {
            const timer = setTimeout(() => setIsLoading(false), 1000);
            return () => clearTimeout(timer);
          }, []);
    
        if (isLoading) {
          return (
            <div className="fixed inset-0 bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center z-50">
              <div className="text-center relative w-full h-full">
                {/* Background Image Layer */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={bodybuilderImage}
                    alt="Bodybuilder loading"
                    className="max-w-[100px] max-h-[100px] object-contain animate-pulse opacity-80"
                  />
                  <div className="absolute inset-0 bg-blue-900/70"></div>
                </div>
        
        
              </div>
            </div>
          );
        }

  return (
   <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
           <div className="sm:mx-auto sm:w-full sm:max-w-sm">
             <img
               alt="Your Company"
               src={bodybuilderImage}
               className="mx-auto h-10 w-auto"
             />
             <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
               Sign up to your account
             </h2>
           </div>
   
           <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
             <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
            
               <div>
                 <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                   Your name 
                 </label>
                 <div className="mt-2">
                   <input
             
                     name="uname"
                     type="uname"
                     required
                     autoComplete="name"
                     onChange={handleChange}
                     value={user.uname}
                     className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                   />
                 </div>
               </div>


                  <div>
                 <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                   Email address
                 </label>
                 <div className="mt-2">
                   <input
             
                     name="uemail"
                     type="uemail"
                     required
                     autoComplete="email"
                     onChange={handleChange}
                     value={user.uemail}
                     className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                   />
                 </div>
               </div>

               <div>
                 <label htmlFor="address" className="block text-sm/6 font-medium text-gray-900">
                   Address
                 </label>
                 <div className="mt-2">
                   <input
             
                     name="uaddress"
                     type="uaddress"
                     required
                     autoComplete="address"
                     onChange={handleChange}
                     value={user.uaddress}
                     className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                   />
                 </div>
               </div>
   
               <div>
                 <div className="flex items-center justify-between">
                   <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                     Password
                   </label>
                  
                 </div>
                 <div className="mt-2">
                   <input
                     
                     name="upassword"
                     type="upassword"
                     required
                     autoComplete="current-password"
                     onChange={handleChange}
                     value={user.upassword}
                     className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                   />
                 </div>
               </div>
   
               <div>
                 <button
                   type="submit"
                   className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                 >
                   Sign in
                 </button>
               </div>
             </form>
   
             <p className="mt-10 text-center text-sm/6 text-gray-500">
               Not a member?{' '}
               <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                 Sign up
               </a>
             </p>
           </div>
         </div>
  )
}

export default Register
