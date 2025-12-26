import { useEffect, useState } from 'react'
import axios from 'axios'



function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState(null);

  const fetchBlogs=()=>{
    axios.get("/api/blogs")
    .then((response)=>{
      console.log(response.data);
      setData(response.data);
      setCount(Object.keys(response.data).length);
    })
    .catch((err)=>{
      console.error("error in fetching data from backend", err);
    })
  }
  // useEffect(()=>{
  //   fetchBlogs();
  // },[])
  

  return (
   <div>
    <h1>Blog Maker App</h1>
     <h2> Backend Response </h2>
     <p>no. of messages from backend : {count}</p>
     <button onClick={fetchBlogs}>
      refresh data
     </button>
     {data 
  ? <pre>{JSON.stringify(data, null, 2)}</pre>
  : <p>Click "Refresh Data" to load blogs</p>
}
   </div>
  )
}
export default App
