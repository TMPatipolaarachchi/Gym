import React,{useState, useEffect} from 'react'
import axios from 'axios'


const Machine = () => {

    const [machine, setmachine] = useState(null);
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/machine/getmachine')
      .then((res) => {
        setmachine(res.data);
      })
      .catch((e) => {
        console.error('Error getting data', e);
      });
  }, []);

  

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

      {Array.isArray(machine) && machine.length > 0 ? (
        machine.map((m, i) => (
          <div key={i}>

            

             <img
                alt={machine.imageAlt}
                src={machine.imageSrc}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
              />

            <p className="mt-4 text-sm text-gray-700" >{m.mtitle}</p>
            <p className="mt-1 text-lg font-medium text-gray-900"> Rs.{m.mprice}.00</p>

         
        
           <br/>
          </div>
        ))
      ) : (
        <p>No machines found.</p>
      )}
    </div>
    </div>
    </div>

  


  )
}

export default Machine
