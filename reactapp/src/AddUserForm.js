import React, { useState } from 'react';
import ShowErrors from './ShowErrors';

const AddUserForm = ({toggleProp}) => {

    const [inputs, setInputs] = useState(
        [{
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
        }]
    );
    const [errors, setErrors] = useState({});

    console.log(inputs);

    function updateInputsArray(index, evt) {
        const updatedArray = [...inputs];
        updatedArray[0][index] = evt.target.value;
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
    return (
        <div>
            <div className="overlay">
                <div className="popup">
                    <h2>Add user</h2>
                    <div onClick={toggleProp} className="close">&times;</div>  
                    <form className="form-control">
                                <label>Name:</label><input type="text" name="name" defaultValue="" onChange={(evt) => updateInputsArray('name', evt)}/>
                                <label>Username:</label><input type="text" name="username" defaultValue="" onChange={(evt) => updateInputsArray('username', evt)}/>
                                <label>E-Mail:</label><input type="text" name="email" defaultValue="" onChange={(evt) => updateInputsArray('email', evt)}/>
                                <label>Phone:</label><input type="text" name="phone" defaultValue="" onChange={(evt) => updateInputsArray('phone', evt)}/>
                                <label>WebSite:</label><input type="text" name="website" defaultValue="" onChange={(evt) => updateInputsArray('website', evt)}/>
                                <label>City:</label><input type="text" name="city" defaultValue="" onChange={(evt) => updateInputsArraySection('address', 'city', evt)}/>
                                <label>Street:</label><input type="text" name="street" defaultValue="" onChange={(evt) => updateInputsArraySection('address', 'street', evt)}/>
                                <label>Suite:</label><input type="text" name="suite" defaultValue="" onChange={(evt) => updateInputsArraySection('address', 'suite', evt)}/>
                                <label>Zipcode:</label><input type="text" name="zipcode" defaultValue="" onChange={(evt) => updateInputsArraySection('address', 'zipcode',evt)}/>
                                <label>BS:</label><input type="text" name="bs" defaultValue="" onChange={(evt) => updateInputsArraySection('company', 'bs', evt)}/>
                                <label>Catch phrase:</label><input type="text" name="catchPhrase" defaultValue="" onChange={(evt) => updateInputsArraySection('company', 'catchPhrase', evt)}/>
                                <label>Company name:</label><input type="text" name="cname" defaultValue="" onChange={(evt) => updateInputsArraySection('company', 'name', evt)}/>
                                <label>Latitude:</label><input type="text" name="latitude" defaultValue="" onChange={(evt) => updateInputsArraySection2('address', 'geo', 'lat', evt)}/>
                                <label>Longitude:</label><input type="text" name="longitude" defaultValue="" onChange={(evt) => updateInputsArraySection2('address', 'geo', 'lng', evt)}/>
                        <input type="submit" value="Submit" onClick={e => onSubmit(e)} />
                    </form>   
                    {Object.keys(errors).length > 0 ? <ShowErrors valErrors={errors} /> : null }                   
                </div>
            </div>
        </div>
    );
};

export default AddUserForm