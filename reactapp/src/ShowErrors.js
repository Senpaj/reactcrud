import React from 'react';

const EditUserForm = ({valErrors}) => {

    console.log("errors: ", valErrors);

    return (
        <div>
            <ul className="errorUl">
            {Object.keys(valErrors).map((keyName, i) => (
                <li key={i}>
                    {valErrors[keyName]}
                </li>
            ))}
            </ul>
        </div>
    );
};

export default EditUserForm