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
const [name, setName] = useState<string>('');
  const [job, setJob] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [avtar, setAvtar] = useState<string>('');
    const [deletedData, setDeletedData] = useState<UserData[]>([]);

  

  //useEffect(() => {
    //axios.get('https://reqres.in/api/users?page=2')
    //.then(res =>console.log(res))
    //.catch(err => console.error(err));
  //},[]
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

const putData = async (name: string, job: string, email: string , avatar:string) => {
    try {
      const response = await axios.post('https://reqres.in/api/users/2', {
        name: name,
        job: job,
        email: email
      });

      if (response.status === 201) {
        if (response.data && response.data.id) {
          const newData: UserData = {
            id: response.data.id,
            name: name,
            job: job,
            email: email,
            avatar: avtar
          };
          setData([...data, newData]);
          console.log(response.data);
        } else {
          console.log('Invalid response data:', response.data);
        }
      } else {
        console.log('Request failed with status:', response.status);
      }
    } catch (err) {
      console.log(err);
    }
  };


const deleteData = async (id: number) => {
  try {
    const response = await axios.delete(`https://reqres.in/api/users/${id}`);
    if (response.status === 204) {
      setData((prevData) => prevData.filter((user) => user.id !== id));
      console.log('Data deleted successfully');
    } else {
      console.log('Failed to delete data');
    }
  } catch (err) {
    console.log(err);
  }
};





const handleSubmit = (e:any) => {
  e.preventDefault();
 
  putData(name, job ,email,avtar);

};




  useEffect(() => {
    fetchData();
    getData();
    //deleteData();
    //putData(name, job ,email);
  }, []);

  return (
    <div className="App">
      <h1 className="text-xl font-semibold text-center">Get Data From API Render </h1>
      <div className="flex">
        {users.length > 0 &&
          users.map((user) => (
            <div key={user.id}>
              <p className="space-x-1 ">
                <strong>{user.first_name}</strong>
               
             
                <strong>{user.last_name}</strong>
               
              </p>
              <p>{user.email}</p>
              <img src={user.avatar} alt={user.first_name} />
            </div>
          ))}
      </div>
      <div>
         <h1></h1>
      <div className="flex">
        {user.length > 0 &&
          user.map((user) => (
            <div key={user.id}>
              <p className="space-x-1 ">
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
      <h1 className="text-xl font-semibold text-center">Want to add new Data or Update data </h1>
      {/* Input fields */}
     <div className=" flex flex-col relative text-center  max-w-7xl px-10 justify-evenly mx-auto items-center">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-fit mx-auto  ">
  <div className="flex flex-col gap-4 bg-slate-300 justify-center items-center space-y-2 mr-8 p-4">
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Name"
      className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500 " required
    />
    <input
      type="text"
      value={job}
      onChange={(e) => setJob(e.target.value)}
      placeholder="Job"
      className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500" required
    />
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email"
      className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500" required
    />
    <input
      type="avtar"
      value={avtar}
      onChange={(e) => setAvtar(e.target.value)}
      placeholder="Avtar"
      className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500" required
    />
    <button
      type="submit"
      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
    >
      Submit
    </button>
  </div>
</form>
     </div>

      {/* Render data */}
      
    </div>
    <div className="grid grid-cols sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4">
  {data.length > 0 &&
    data.map((user) => (
      <div key={user.id} className="bg-slate-400 p-4">
        <div className="flex flex-col">
          <p className="text-white font-bold">ID:</p>
          <p>{user.id}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-white font-bold">Updated Data:</p>
          <p>
            <strong>Name: </strong> {user.name}
          </p>
          <p>
            <strong>Job: </strong> {user.job}
          </p>
          <p>
            <strong>Email: </strong> {user.email}
          </p>
        </div>
      </div>
    ))}
</div>
<div>
  {data.length > 0 &&
    data.map((user) => (
      <div key={user.id}>
        
        
        <div>
          <button
            className="bg-red-500 text-white px-2 py-1 mt-2"
            onClick={() => deleteData(user.id)}
          >
            Delete
          </button>
        </div>
      </div>
    ))}
</div>

 


        
  

  </div>
    </div>
  );
};
export default App;