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
            <td>
                <button onClick={toggleEditPopUp} className="open">Edit</button>
                {showEditPopUp ? <UserForm toggleProp={toggleEditPopUp} user={props} action={"edit"}/> : null}
            
                <button onClick={toggleDeletePopUp} className="open">Delete</button>
                {showDeletePopUp ? <DeleteUserForm toggleProp={toggleDeletePopUp} user={props}/> : null}
            </td>
            
        </tr>

    );
};

export default User