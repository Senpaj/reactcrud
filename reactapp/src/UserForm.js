import React, { useState } from 'react';
import ShowErrors from './ShowErrors';

const UserForm = ({toggleProp, user, action}) => {
    
    const [inputs] = useState([user]);
    const [errors, setErrors] = useState({});


    const handleInput = (evt) => {
        updateInputsArray(inputs[0],evt.target.name,evt.target.value);
    }
    function updateInputsArray(obj, str, value) {
        if (typeof str == 'string')
            return updateInputsArray(obj, str.split('.'), value);
        else if (str.length === 1 && value !== undefined)
            return obj[str[0]] = value;
        else if (str.length === 0)
            return obj;
        else
            return updateInputsArray(obj[str[0]], str.slice(1), value);
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        if(action === "edit"){
            const response = await fetch('http://127.0.0.1:8000/api/users/' + inputs["0"]["user_id"], {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data : inputs["0"]
                })
            }).then(response => response.json());
            console.log("po fetch: ", response.error);
            if(response.errors != null && Object.keys(response.errors).length > 0){
                setErrors(response.errors);
            }
            else
                toggleProp();
        }
        else if (action === "add"){
            const response = await fetch('http://127.0.0.1:8000/api/users/', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data : inputs["0"]
                })
            }).then(response => response.json());
            if(response.errors != null && Object.keys(response.errors).length > 0){
                setErrors(response.errors);
            }
            else{
                toggleProp();
                window.location.reload();
            }
        }
    }
    return (
        <div>
            <div className="overlay">
                <div className="popup">
                    <h2>Edit user</h2>
                    <div onClick={toggleProp} className="close">&times;</div>  
                    
                    <form className="form-control">
                        <label>Name:</label><input type="text" name="name" defaultValue={user != null && user.name.length > 0 ? user.name : ""} onChange={(evt) => handleInput(evt)}/>
                        <label>Username:</label><input type="text" name="username" defaultValue={user != null && user.username.length > 0 ? user.username : ""} onChange={(evt) => handleInput(evt)}/>
                        <label>E-Mail:</label><input type="text" name="email" defaultValue={user != null && user.email.length > 0 ? user.email : ""} onChange={(evt) => handleInput(evt)}/>
                        <label>Phone:</label><input type="text" name="phone" defaultValue={user != null && user.phone.length > 0 ? user.phone : ""} onChange={(evt) => handleInput(evt)}/>
                        <label>WebSite:</label><input type="text" name="website" defaultValue={user != null && user.website.length > 0 ? user.website : ""} onChange={(evt) => handleInput(evt)}/>
                        <label>City:</label><input type="text" name="address.city" defaultValue={user != null && user.address.city.length > 0 ? user.address.city : ""} onChange={(evt) => handleInput(evt)}/>
                        <label>Street:</label><input type="text" name="address.street" defaultValue={user != null && user.address.street.length > 0 ? user.address.street : ""} onChange={(evt) => handleInput(evt)}/>
                        <label>Suite:</label><input type="text" name="address.suite" defaultValue={user != null && user.address.suite.length > 0 ? user.address.suite : ""} onChange={(evt) => handleInput(evt)}/>
                        <label>Zipcode:</label><input type="text" name="address.zipcode" defaultValue={user != null && user.address.zipcode.length > 0 ? user.address.zipcode : ""} onChange={(evt) => handleInput(evt)}/>
                        <label>BS:</label><input type="text" name="company.bs" defaultValue={user != null && user.company.bs.length > 0 ? user.company.bs : ""} onChange={(evt) => handleInput(evt)}/>
                        <label>Catch phrase:</label><input type="text" name="company.catchPhrase" defaultValue={user != null && user.company.catchPhrase.length > 0 ? user.company.catchPhrase : ""} onChange={(evt) => handleInput(evt)}/>
                        <label>Company name:</label><input type="text" name="company.name" defaultValue={user != null && user.company.name.length > 0 ? user.company.name : ""} onChange={(evt) => handleInput(evt)}/>
                        <label>Latitude:</label><input type="text" name="address.geo.lat" defaultValue={user != null && user.address.geo.lat.length > 0 ? user.address.geo.lat : ""} onChange={(evt) => handleInput(evt)}/>
                        <label>Longitude:</label><input type="text" name="address.geo.lng" defaultValue={user != null && user.address.geo.lng.length > 0 ? user.address.geo.lng : ""} onChange={(evt) => handleInput(evt)}/>
                        <input type="submit" value="Submit" onClick={e => onSubmit(e)} />
                    </form>
                    {Object.keys(errors).length > 0 ? <ShowErrors valErrors={errors} /> : null }                   
                </div>
            </div>
        </div>
    );
};

export default UserForm