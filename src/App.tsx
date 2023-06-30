import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { json } from "stream/consumers";
type Props = {};
interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

interface User1 {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

interface UserData {
  id: number;
  name: string;
  job: string;
  email: string;
  avatar: string;
}

const App = (props: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User1[]>([]);
  const [data, setData] = useState<UserData[]>([]);
  

 
    //axios.get('https://reqres.in/api/users?page=2')
    //.then(res =>console.log(res))
  //}
  //)
 const getData = async () => {
    try {
      const res1 = await fetch("https://reqres.in/api/users?page=1");
      const json = await res1.json();
      setUser(json.data);
      console.log(json.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch("https://reqres.in/api/users?page=2");
      const json = await res.json();
      setUsers(json.data);
      //console.log("error");
      console.log(json.data);
      
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

 const putData = async (name: string, job: string ,email:string) => {
  try {
    const response = await axios.post('https://reqres.in/api/users/2', {
      name: name,
      job: job,
      email: email
    });
    const responseData = response.data;
    if (responseData && responseData.data && responseData.data.id) {
      setData(responseData.data.data);
      console.log(responseData);
      console.log("error");
    } else {
      console.log('Invalid response data:', responseData);
    }
  } catch (err) {
    console.log(err);
  }
};
const deleteData = async () => {
  try {
    const response = await axios.delete('https://reqres.in/api/users/2', {
     
    });
    //setData(response.data.data);
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};
const[name , setName] =useState('');
const [job , setJob] = useState('');
const [email , setEmail] = useState('');


const handleSubmit = (e:any) => {
  e.preventDefault();
 
  putData(name, job ,email);

};




  useEffect(() => {
    fetchData();
    getData();
    deleteData();
  }, []);

  return (
    <div className="App">
      <h1>Get Data From API</h1>
      <div className="flex">
        {users.length > 0 &&
          users.map((user) => (
            <div key={user.id}>
              <p>
                <strong>{user.first_name}</strong>
                <strong>{user.last_name}</strong>
              </p>
              <p>{user.email}</p>
              <img src={user.avatar} alt={user.first_name} />
            </div>
          ))}
      </div>
      <div>
         <h1>Hello ReqRes users!</h1>
      <div className="flex">
        {user.length > 0 &&
          user.map((user) => (
            <div key={user.id}>
              <p>
                <strong>{user.first_name}</strong>
                <strong>{user.last_name}</strong>
              </p>
              <p>{user.email}</p>
              <img src={user.avatar} alt={user.first_name} />
            </div>
          ))}
      </div>
      </div>
     <div className="App">
    {/* ...other JSX code... */}
    <div>
      <h1>Post Data</h1>
      {/* Input fields */}
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="text" value={job} onChange={(e) => setJob(e.target.value)} placeholder="Job" />
         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
        <button type="submit">Submit</button>
      </form>
      {/* Render data */}
      {data.length > 0 &&
        data.map((item) => (
          <div key={item.id}>
            <p>
              <strong>{item.name}</strong>
              <strong>{item.job}</strong>
              <strong>{item.email}</strong>
            </p>
          </div>
        ))}
    </div>
  </div>
    </div>
  );
};
export default App;