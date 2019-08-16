import React, {useState} from "react";
import UserForm from './UserForm';
import DeleteUserForm from './DeleteUserForm';

const User = ({props}) => {

    const [showEditPopUp, setshowEditPopUp] = useState(false);
    const [showDeletePopUp, setshowDeletePopUp] = useState(false);
    const toggleEditPopUp = () => {
        setshowEditPopUp(!showEditPopUp);
    }
    const toggleDeletePopUp = () => {
        setshowDeletePopUp(!showDeletePopUp);
    }
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.username}</td>
            <td>{props.email}</td>
            <td>{props.user_id}</td>
            <td><button onClick={toggleEditPopUp} className="open">Edit</button>
            <button onClick={toggleDeletePopUp} className="open">Delete</button></td>
            
            {showEditPopUp ? <UserForm toggleProp={toggleEditPopUp.bind(User)} user={props} action={"edit"}/> : null}
            {showDeletePopUp ? <DeleteUserForm toggleProp={toggleDeletePopUp.bind(User)} user={props}/> : null}
        </tr>

    );
};

export default User