import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [user,setuser] = useState({
        uname:"",uemail:"",uaddress:"",upassword:""
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input type='uname' name='uname' onChange={handleChange} value={user.uname} placeholder='enter the name' required/>
          </div>

          <div>
            <label>Email</label>
            <input type='uemail' name='uemail' onChange={handleChange} value={user.uemail} placeholder='enter the name' required/>
          </div>

          <div>
            <label>Address</label>
            <input type='uaddress' name='uaddress' onChange={handleChange} value={user.uaddress} placeholder='enter the name' required/>
          </div>

          <div>
            <label>Password</label>
            <input type='upassword' name='upassword' onChange={handleChange} value={user.upassword} placeholder='enter the name' required/>
          </div>

          <div>
            <button type='submit'>submit</button>
          </div>
      </form>
    </div>
  )
}

export default Register
