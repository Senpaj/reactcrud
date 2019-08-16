import React, { useEffect, useState } from 'react';
import User from './User';
import UserForm from './UserForm';
const UserInterface = () => {
    
    const [users, setUsers] = useState([]);
    const [showNewUserPopUp, setshowNewUserPopUp] = useState(false);
    const userDataFormat =
        {
            "user_id":'',
            "name":"",
            "username":"",
            "email":"",
            "phone":"",
            "website":"",
            "address":{
                "street":"",
                "suite":"",
                "city":"",
                "zipcode":"",
                "geo":{
                    "lat":"",
                    "lng":""
                },
            },
            "company":{
                "name":"",
                "catchPhrase":"",
                "bs":""
            }
        };
    useEffect(() => {
        getUsers();
    }, []);
    
    const getUsers = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/allusers');
        const data = await response.json();
        setUsers(data.data);
    };
    const addUserFromAPI = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/' +  Math.floor(Math.random() * 10 + 1));
        const values = [await response.json()];
        await fetch('http://127.0.0.1:8000/api/users/', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data : values["0"]
            })
          });
          window.location.reload();
    };
    const toggleNewUserPopUp = () => {
        setshowNewUserPopUp(!showNewUserPopUp);
    }

    return (
        <div>
            <button onClick={toggleNewUserPopUp} className="open">Add</button>
            <button onClick={addUserFromAPI} className="open">Add from API</button>

            {showNewUserPopUp ? <UserForm toggleProp={toggleNewUserPopUp.bind(User)} user={userDataFormat} action="add"/> : null}
            <table className="all-users-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>E-Mail</th>
                        <th>User ID</th>
                        <th colSpan="2"></th>
                    </tr>
                </thead>
                <tbody>
                {users.map(item => (
                            <User key={item.user_id} 
                                props={item} />
                    ))}
                </tbody>
            </table>
        </div>
    ); 
}

export default UserInterface