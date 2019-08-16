import React, { useState } from 'react';
import './style.css';
import ShowErrors from './ShowErrors';

const EditUserForm = ({toggleProp, user}) => {

    const [inputs, setInputs] = useState([user]);
    const [errors, setErrors] = useState({});
    console.log("inputs: ", inputs);

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
    return (
        <div>
            <div className="overlay">
                <div className="popup">
                    <h2>Edit user</h2>
                    <div onClick={toggleProp} className="close">&times;</div>  
                    
                    <form className="form-control">
                        <label>Name:</label><input type="text" name="name" value={user.name} onChange={(evt) => updateInputsArray('name', evt)}/>
                        <label>Username:</label><input type="text" name="username" value={user.username} onChange={(evt) => updateInputsArray('username', evt)}/>
                        <label>E-Mail:</label><input type="text" name="email" value={user.email} onChange={(evt) => updateInputsArray('email', evt)}/>
                        <label>Phone:</label><input type="text" name="phone" value={user.phone} onChange={(evt) => updateInputsArray('phone', evt)}/>
                        <label>WebSite:</label><input type="text" name="website" value={user.website} onChange={(evt) => updateInputsArray('website', evt)}/>
                        <label>City:</label><input type="text" name="city" value={user.address.city} onChange={(evt) => updateInputsArraySection('address', 'city', evt)}/>
                        <label>Street:</label><input type="text" name="street" value={user.address.street} onChange={(evt) => updateInputsArraySection('address', 'street', evt)}/>
                        <label>Suite:</label><input type="text" name="suite" value={user.address.suite} onChange={(evt) => updateInputsArraySection('address', 'suite', evt)}/>
                        <label>Zipcode:</label><input type="text" name="zipcode" value={user.address.zipcode} onChange={(evt) => updateInputsArraySection('address', 'zipcode',evt)}/>
                        <label>BS:</label><input type="text" name="bs" value={user.company.bs} onChange={(evt) => updateInputsArraySection('company', 'bs', evt)}/>
                        <label>Catch phrase:</label><input type="text" name="catchPhrase" value={user.company.catchPhrase} onChange={(evt) => updateInputsArraySection('company', 'catchPhrase', evt)}/>
                        <label>Company name:</label><input type="text" name="Cname" value={user.company.name} onChange={(evt) => updateInputsArraySection('company', 'name', evt)}/>
                        <label>Latitude:</label><input type="text" name="lat" value={user.address.geo.lat} onChange={(evt) => updateInputsArraySection2('address', 'geo', 'lat', evt)}/>
                        <label>Longitude:</label><input type="text" name="lng" value={user.address.geo.lng} onChange={(evt) => updateInputsArraySection2('address', 'geo', 'lng', evt)}/>
                        <input type="submit" value="Edit" onClick={e => onSubmit(e)} />
                    </form>
                    {Object.keys(errors).length > 0 ? <ShowErrors valErrors={errors} /> : null }                   
                </div>
            </div>
        </div>
    );
};

export default EditUserForm