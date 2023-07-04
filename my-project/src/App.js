import React, { useEffect, useState } from "react";
import UserData from "./UserData.js";
// Fetched API
const API = "https://jsonplaceholder.typicode.com/users";

function App () {
  // These All below are useState hooks and intial states were set accordingly and were assigned that values
    const [users, setUsers] = useState([]);
    const [sorted, setSorted] = useState({ sorted: "id", reversed: false });
    const [searchPhrase, setSearchPhrase] = useState("");
    const [data,setData] = useState(null);
    
    const fetchUsers = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.length > 0) {
                setUsers(data);
            }
        } catch (e) {
            console.error(e)
        }
    }
// This function is used for sorting Based on ID
    const sortById = () => {
      const usersCopy = [...users];
      usersCopy.sort((userA, userB) => {
        if (sorted.reversed) {
          return userA.id - userB.id;
        }
        return userB.id - userA.id;
      });
      setUsers(usersCopy);
      setSorted({ sorted: "id", reversed: !sorted.reversed });
    };
// This function is used for sorting Based on Name
    const sortByName = () => {
      const usersCopy = [...users];
      usersCopy.sort((userA, userB) => {
        if (sorted.reversed) {
          return userA.name.localeCompare(userB.name);
        }
        return userB.name.localeCompare(userA.name);
      });
      setUsers(usersCopy);
      setSorted({ sorted: "name", reversed: !sorted.reversed });
    };
    // This function is used for sorting Based on City
    const sortByCity = () => {
      const usersCopy = [...users];
      usersCopy.sort((userA, userB) => {
        if (sorted.reversed) {
          return userA.address.city.localeCompare(userB.address.city);
        }
        return userB.address.city.localeCompare(userA.address.city);
      });
      setUsers(usersCopy);
      setSorted({ sorted: "address", reversed: !sorted.reversed });
    };
  // searching is basically done by matching each table entry with the input entry in the search bar so first we will convert it in lowercase
  // so that it wouldn't become case sensitive and then matching happens  
    const search = (event) => {
      const matchedUsers = users.filter((user) => {
        return user.name.toLowerCase().includes(event.target.value.toLowerCase());
      });

      setUsers(matchedUsers);
      setSearchPhrase(event.target.value);
    };
    // This is basically the function which gives you the count of the total number of user or id's present in the API data Fetched
    const totalval = () =>{
      let count = [...users].length;
      setData(count);
    };
    useEffect(() => {
        fetchUsers(API);
    }, [])

  
  //  This is all the visible part of the website which is offcourse linked with the Above function and were called accordingly 
    return <>
    <div className="search-container">
				<input
					type="text"
					placeholder="Search"
					value={searchPhrase}
					onChange={search}
				/>
			</div>
      <div className = "table-container">
      <table className="table">
            <thead>
            <tr>
                <th onClick={sortById} className="heading"><a className="arrow-icon"><span class="left-bar"></span>
  <span class="right-bar"></span>
</a>ID</th>
                <th onClick={sortByName} className="heading">Name</th>
                <th className="heading">UserName</th>
                <th className="heading">Email</th>
                <th onClick={sortByCity} className="heading">City</th>
                <th className="heading">Company</th>
            </tr>
            </thead>
            <tbody>
            <UserData users={users}/>
            </tbody>
        </table>
      </div>

        <div className="result">
          <button id = "btn" onClick={totalval}>Get Number of users</button>
        </div>
        <div className="getVal"><h1>Total No. of Users = {data}</h1></div>
        
    </>
}


export default App;