import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [user,setuser] = useState({
        uemail:"",
        upassword:""
    })

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
        formdata.append("uemail", user.uemail);
        formdata.append("upassword", user.upassword);

        try{
            await axios.post("http://localhost:3000/api/authuser/login", user, {withCredentials: true});
            alert("login successfully");
            navigate('/dashboard')
            setuser({
                 uemail:"",
                 upassword:""
            })
        }catch(e){
            alert("login unsuccessfully")
        }
        

    }
  return (
    <div>
      <form onSubmit={handleSubmit}>

          <div>
            <label>Email</label>
            <input type='uemail' name='uemail' onChange={handleChange} value={user.uemail} placeholder='enter the name' required/>
          </div>

          <div>
            <label>Password</label>
            <input type='upassword' name='upassword' onChange={handleChange} value={user.upassword} placeholder='enter the name' required/>
          </div>

          <div>
            <button type='submit'>Sign in</button>
          </div>
      </form>
    </div>
  )
}

export default Login
