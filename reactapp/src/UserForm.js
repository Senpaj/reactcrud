import React, { useState } from 'react';
import ShowErrors from './ShowErrors';

const UserForm = ({toggleProp, user, action}) => {
    
    //const [act, setAction] = useState(action);
    const [inputs, setInputs] = useState([user]);
    const [errors, setErrors] = useState({});

    console.log("inputs: ", inputs);
    console.log("action: ", action);

    function updateInputsArray(index, evt) {
        //copy the array first
       const updatedArray = [...inputs];
       //update temp array with new values
       updatedArray[0][index] = evt.target.value;
       // update state var with new values
       setInputs(updatedArray);
    }
    function updateInputsArraySection(section, index, evt) {
        const updatedArray = [...inputs];
        updatedArray[0][section][index] = evt.target.value;
        setInputs(updatedArray);
     }
    function updateInputsArraySection2(level, section, index, evt) {
        const updatedArray = [...inputs];
        updatedArray[0][level][section][index] = evt.target.value;
        setInputs(updatedArray);
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
                        <label>Name:</label><input type="text" name="name" value={user != null && user.name.length > 0 ? user.name : ""} onChange={(evt) => updateInputsArray('name', evt)}/>
                        <label>Username:</label><input type="text" name="username" value={user != null && user.username.length > 0 ? user.username : ""} onChange={(evt) => updateInputsArray('username', evt)}/>
                        <label>E-Mail:</label><input type="text" name="email" value={user != null && user.email.length > 0 ? user.email : ""} onChange={(evt) => updateInputsArray('email', evt)}/>
                        <label>Phone:</label><input type="text" name="phone" value={user != null && user.phone.length > 0 ? user.phone : ""} onChange={(evt) => updateInputsArray('phone', evt)}/>
                        <label>WebSite:</label><input type="text" name="website" value={user != null && user.website.length > 0 ? user.website : ""} onChange={(evt) => updateInputsArray('website', evt)}/>
                        <label>City:</label><input type="text" name="city" value={user != null && user.address.city.length > 0 ? user.address.city : ""} onChange={(evt) => updateInputsArraySection('address', 'city', evt)}/>
                        <label>Street:</label><input type="text" name="street" value={user != null && user.address.street.length > 0 ? user.address.street : ""} onChange={(evt) => updateInputsArraySection('address', 'street', evt)}/>
                        <label>Suite:</label><input type="text" name="suite" value={user != null && user.address.suite.length > 0 ? user.address.suite : ""} onChange={(evt) => updateInputsArraySection('address', 'suite', evt)}/>
                        <label>Zipcode:</label><input type="text" name="zipcode" value={user != null && user.address.zipcode.length > 0 ? user.address.zipcode : ""} onChange={(evt) => updateInputsArraySection('address', 'zipcode',evt)}/>
                        <label>BS:</label><input type="text" name="bs" value={user != null && user.company.bs.length > 0 ? user.company.bs : ""} onChange={(evt) => updateInputsArraySection('company', 'bs', evt)}/>
                        <label>Catch phrase:</label><input type="text" name="catchPhrase" value={user != null && user.company.catchPhrase.length > 0 ? user.company.catchPhrase : ""} onChange={(evt) => updateInputsArraySection('company', 'catchPhrase', evt)}/>
                        <label>Company name:</label><input type="text" name="Cname" value={user != null && user.company.name.length > 0 ? user.company.name : ""} onChange={(evt) => updateInputsArraySection('company', 'name', evt)}/>
                        <label>Latitude:</label><input type="text" name="lat" value={user != null && user.address.geo.lat.length > 0 ? user.address.geo.lat : ""} onChange={(evt) => updateInputsArraySection2('address', 'geo', 'lat', evt)}/>
                        <label>Longitude:</label><input type="text" name="lng" value={user != null && user.address.geo.lng.length > 0 ? user.address.geo.lng : ""} onChange={(evt) => updateInputsArraySection2('address', 'geo', 'lng', evt)}/>
                        <input type="submit" value="Submit" onClick={e => onSubmit(e)} />
                    </form>
                    {Object.keys(errors).length > 0 ? <ShowErrors valErrors={errors} /> : null }                   
                </div>
            </div>
        </div>
    );
};

export default UserForm