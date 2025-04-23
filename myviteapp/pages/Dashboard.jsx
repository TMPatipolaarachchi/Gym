import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [data,setdata] = useState(null);

     const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/api/authuser/profile",{ withCredentials: true }).then((res) => {
            setdata(res.data)
        }).catch((e) => {
            console.error("error gettin data", e);
        })
    }, []);

    const handleLogout = async () => {
        try {
          await axios.post("http://localhost:3000/api/authuser/logout", {}, { withCredentials: true });
          navigate('/login')
        } catch (e) {
          console.error("Logout failed:", e);
        }
      };

      const handlesuplement = async () => {
        try {
          navigate('/addsuplement');
        } catch (e) {
          console.error("Logout failed:", e);
        }
      };


  return (
    <div>

        <h2>Dashboard</h2>

        {data ? (
                <div >
                  <p>{data.uname}</p>
                  <p>{data.uemail}</p>
                  <p>{data.uaddress}</p>
                 
                </div>
              ) : (
                <div>
                  Failed to load profile information
                </div>
              )}

              <div>
                <button onClick={handleLogout}>Logout</button>
              </div>

              <div>
                <button onClick={handlesuplement}>Add Suplement</button>
              </div>

      
    </div>
  )
}

export default Dashboard
