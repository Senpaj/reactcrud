import React, { useState } from 'react';

const DeleteUserForm = ({toggleProp, user}) => {

    const [inputs] = useState([user]);
    
    const onSubmit = async (e) => {
        e.preventDefault();
        await fetch('http://127.0.0.1:8000/api/users/' + inputs["0"]["user_id"], {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: {
            }
        });
        toggleProp();
        window.location.reload();
    }
    return (
        <div>
            <div className="overlay">
                <div className="popup">
                    <h2>Delete user</h2>
                    <div onClick={toggleProp} className="close">&times;</div>  
                    
                    <form className="form-control">
                        <label>Name:</label><input type="text" name="name" defaultValue={user.name} readonly/>
                        <label>Username:</label><input type="text" name="username" defaultValue={user.username} readonly/>
                        <label>E-Mail:</label><input type="text" name="email" defaultValue={user.email} readonly/>
                        <label>Phone:</label><input type="text" name="phone" defaultValue={user.phone} readonly/>
                        <input type="submit" value="Confirm deletion" onClick={e => onSubmit(e)} />
                    </form>                    
                </div>
            </div>
        </div>
    );
};

export default DeleteUserForm