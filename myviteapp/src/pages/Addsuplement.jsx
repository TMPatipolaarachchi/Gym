import React,{useState} from 'react';
import axios from 'axios';

const Addsuplement = () => {

    const [suplement,setsuplement] = useState({
        stitle:"",
        sprice:"",
        sdescription:"",
        sstatus:""
    });

    const handleChange = (e) => {
        const {name,value} = e.target;
        setsuplement({
            ...suplement,
            [name] : value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formdata = new FormData();
        formdata.append("stitle", suplement.stitle);
        formdata.append("sprice", suplement.sprice);
        formdata.append("sdescription", suplement.sdescription);
        formdata.append("sstatus", suplement.sstatus);

        try{
            await axios.post("http://localhost:3000/api/suplement/addsuplement", suplement,{ withCredentials: true });
            alert("suplemet added successfully");

            setsuplement({
                stitle:"",
                sprice:"",
                sdescription:"",
                sstatus:"" 
            })
        }catch(e){
            alert("suplement added failed")
        }
      
    }

  return (
    <div>

        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input type='stitle' name='stitle' value={suplement.stitle} onChange={handleChange} placeholder='Enter the title' required />
            </div>
            <div>
                <label>Price</label>
                <input type='sprice' name='sprice' value={suplement.sprice} onChange={handleChange} placeholder='Enter the price' required />
            </div>
            <div>
                <label>Description</label>
                <input type='sdescription' name='sdescription' value={suplement.sdescription} onChange={handleChange} placeholder='Enter the description' required />
            </div>
            <div>
                <label>Status</label>
                <input type='sstatus' name='sstatus' value={suplement.sstatus} onChange={handleChange} placeholder='Enter the title' required />
            </div>

            <div>
                <button type='Submit'>Submit</button>
            </div>
           
        </form>
      
    </div>
  )
}

export default Addsuplement
